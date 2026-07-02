-- ============================================================================
-- FOUNDRY KILN — Migration 004: RLS Policies
-- Every table gets RLS, no exceptions.
-- ============================================================================

-- Enable RLS on ALL tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE merch_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE merch_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE roast_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffee_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coming_soon_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_enquiries ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Check if user has a specific permission (org-wide or for a specific business_unit_id)
CREATE OR REPLACE FUNCTION user_has_permission(p_user_id UUID, p_permission_key TEXT, p_business_unit_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE ur.user_id = p_user_id
      AND p.key = p_permission_key
      AND (ur.business_unit_id IS NULL OR ur.business_unit_id = p_business_unit_id)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if user can access a specific business unit
CREATE OR REPLACE FUNCTION user_can_access_unit(p_user_id UUID, p_business_unit_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE ur.user_id = p_user_id
      AND (
        p.key = 'view_all_units'
        OR ur.business_unit_id IS NULL  -- org-wide role
        OR ur.business_unit_id = p_business_unit_id
      )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Get user's org_id
CREATE OR REPLACE FUNCTION user_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================================
-- PUBLIC CONTENT: Anonymous SELECT on active rows only
-- ============================================================================

-- Public services
CREATE POLICY "anon_read_public_services" ON public_services
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_public_services" ON public_services
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Testimonials
CREATE POLICY "anon_read_testimonials" ON testimonials
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_testimonials" ON testimonials
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Gallery images
CREATE POLICY "anon_read_gallery" ON gallery_images
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_gallery" ON gallery_images
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Deals & promotions
CREATE POLICY "anon_read_deals" ON deals_promotions
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_deals" ON deals_promotions
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Coming soon units
CREATE POLICY "anon_read_coming_soon" ON coming_soon_units
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_coming_soon" ON coming_soon_units
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Studio spaces (public can view active)
CREATE POLICY "anon_read_studio_spaces" ON studio_spaces
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_studio_spaces" ON studio_spaces
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Studio packages (public can view active)
CREATE POLICY "anon_read_studio_packages" ON studio_packages
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_studio_packages" ON studio_packages
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Merch products (public can view active)
CREATE POLICY "anon_read_merch_products" ON merch_products
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_merch_products" ON merch_products
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Roast menu items (public can view active)
CREATE POLICY "anon_read_roast_menu" ON roast_menu_items
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_roast_menu" ON roast_menu_items
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Business units (public can see active units)
CREATE POLICY "anon_read_business_units" ON business_units
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "auth_manage_business_units" ON business_units
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Organizations (public can read basic info)
CREATE POLICY "anon_read_organizations" ON organizations
  FOR SELECT USING (TRUE);
CREATE POLICY "auth_manage_organizations" ON organizations
  FOR ALL USING (id = user_org_id()) WITH CHECK (id = user_org_id());

-- ============================================================================
-- PUBLIC ENQUIRIES: Anonymous INSERT only, authenticated manage
-- ============================================================================
CREATE POLICY "anon_insert_enquiries" ON public_enquiries
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "auth_read_enquiries" ON public_enquiries
  FOR SELECT USING (org_id = user_org_id());
CREATE POLICY "auth_update_enquiries" ON public_enquiries
  FOR UPDATE USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- ============================================================================
-- FINANCIAL/OPERATIONAL: Zero anonymous access, scoped by unit
-- ============================================================================

-- Transactions
CREATE POLICY "auth_read_transactions" ON transactions
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_insert_transactions" ON transactions
  FOR INSERT WITH CHECK (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'manage_financial_data', business_unit_id)
  );
CREATE POLICY "auth_update_transactions" ON transactions
  FOR UPDATE USING (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'manage_financial_data', business_unit_id)
  );

-- Studio bookings (operational)
CREATE POLICY "auth_read_studio_bookings" ON studio_bookings
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_manage_studio_bookings" ON studio_bookings
  FOR ALL USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  ) WITH CHECK (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );

-- Merch orders (operational)
CREATE POLICY "auth_read_merch_orders" ON merch_orders
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_manage_merch_orders" ON merch_orders
  FOR ALL USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  ) WITH CHECK (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );

-- Coffee subscriptions (operational)
CREATE POLICY "auth_read_coffee_subs" ON coffee_subscriptions
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_manage_coffee_subs" ON coffee_subscriptions
  FOR ALL USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  ) WITH CHECK (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );

-- Budgets
CREATE POLICY "auth_read_budgets" ON budgets
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_manage_budgets" ON budgets
  FOR ALL USING (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'set_budgets', business_unit_id)
  ) WITH CHECK (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'set_budgets', business_unit_id)
  );

-- Budget line items
CREATE POLICY "auth_read_budget_items" ON budget_line_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM budgets b
      WHERE b.id = budget_line_items.budget_id
        AND b.org_id = user_org_id()
    )
  );
CREATE POLICY "auth_manage_budget_items" ON budget_line_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM budgets b
      WHERE b.id = budget_line_items.budget_id
        AND b.org_id = user_org_id()
        AND user_has_permission(auth.uid(), 'set_budgets', b.business_unit_id)
    )
  );

-- Daily summaries
CREATE POLICY "auth_read_daily_summaries" ON daily_summaries
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_can_access_unit(auth.uid(), business_unit_id)
  );
CREATE POLICY "auth_manage_daily_summaries" ON daily_summaries
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Audit logs (admin-only read, system write)
CREATE POLICY "auth_read_audit_logs" ON audit_logs
  FOR SELECT USING (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'manage_users')
  );

-- User profiles
CREATE POLICY "auth_read_profiles" ON user_profiles
  FOR SELECT USING (org_id = user_org_id() OR id = auth.uid());
CREATE POLICY "auth_update_own_profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "auth_insert_profile" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- Roles
CREATE POLICY "auth_read_roles" ON roles
  FOR SELECT USING (org_id = user_org_id());
CREATE POLICY "auth_manage_roles" ON roles
  FOR ALL USING (
    org_id = user_org_id()
    AND user_has_permission(auth.uid(), 'manage_users')
  );

-- Permissions (read-only for all authenticated users)
CREATE POLICY "auth_read_permissions" ON permissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Role permissions
CREATE POLICY "auth_read_role_perms" ON role_permissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM roles r WHERE r.id = role_permissions.role_id AND r.org_id = user_org_id())
  );

-- User roles
CREATE POLICY "auth_read_user_roles" ON user_roles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = user_roles.user_id AND up.org_id = user_org_id())
  );
CREATE POLICY "auth_manage_user_roles" ON user_roles
  FOR ALL USING (
    user_has_permission(auth.uid(), 'manage_users')
  );

-- Categories
CREATE POLICY "auth_read_categories" ON categories
  FOR SELECT USING (org_id = user_org_id());
CREATE POLICY "auth_manage_categories" ON categories
  FOR ALL USING (org_id = user_org_id()) WITH CHECK (org_id = user_org_id());

-- Subcategories
CREATE POLICY "auth_read_subcategories" ON subcategories
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM categories c WHERE c.id = subcategories.category_id AND c.org_id = user_org_id())
  );
CREATE POLICY "auth_manage_subcategories" ON subcategories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM categories c WHERE c.id = subcategories.category_id AND c.org_id = user_org_id())
  );

-- Notification preferences
CREATE POLICY "auth_own_notif_prefs" ON notification_preferences
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Device tokens
CREATE POLICY "auth_own_device_tokens" ON device_tokens
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
