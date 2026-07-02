-- ============================================================================
-- FOUNDRY KILN — Migration 003: Leaf Tables (Public Content) + Bridge
-- Public services, testimonials, gallery, deals, coming-soon, enquiries
-- ============================================================================

-- ============================================================================
-- LEAVES: PUBLIC STOREFRONT CONTENT
-- ============================================================================

CREATE TABLE public_services (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  description       TEXT NOT NULL,
  icon              TEXT,
  image_url         TEXT,
  cta_label         TEXT,
  cta_url           TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order        INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE testimonials (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID REFERENCES business_units(id) ON DELETE SET NULL,
  author_name       TEXT NOT NULL,
  author_role       TEXT, -- e.g., 'Podcast Host', 'Brand Owner', 'Coffee Enthusiast'
  content           TEXT NOT NULL,
  rating            INT CHECK (rating >= 1 AND rating <= 5),
  image_url         TEXT,
  is_featured       BOOLEAN NOT NULL DEFAULT FALSE,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE gallery_images (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID REFERENCES business_units(id) ON DELETE SET NULL,
  title             TEXT,
  description       TEXT,
  image_url         TEXT NOT NULL,
  category          TEXT, -- 'session', 'print_run', 'roast', 'space', 'event'
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order        INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deals_promotions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID REFERENCES business_units(id) ON DELETE SET NULL,
  title             TEXT NOT NULL,
  description       TEXT NOT NULL,
  badge_text        TEXT, -- e.g., 'LIMITED', 'NEW', '20% OFF'
  valid_from        DATE,
  valid_until       DATE,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE coming_soon_units (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL,
  description         TEXT NOT NULL,
  icon                TEXT,
  expected_launch_label TEXT, -- e.g., 'Q1 2027', 'Coming Soon'
  color               TEXT,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- THE BRIDGE: PUBLIC ENQUIRIES
-- ============================================================================

CREATE TABLE public_enquiries (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID REFERENCES business_units(id) ON DELETE SET NULL,
  type              TEXT NOT NULL CHECK (type IN (
    'studio_booking', 'merch_quote', 'coffee_subscription',
    'wholesale_coffee', 'contact', 'notify_me'
  )),
  full_name         TEXT NOT NULL,
  phone             TEXT,
  email             TEXT,
  message           TEXT,
  metadata          JSONB DEFAULT '{}'::jsonb,
  -- metadata examples:
  -- studio_booking: {studio_space_id, date, start_time, end_time, package, addons, total}
  -- merch_quote: {product_id, quantity, design_file_url, unit_price, total}
  -- coffee_subscription: {plan, bag_size, grind_type, price}
  status            TEXT NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  assigned_to       UUID REFERENCES user_profiles(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_public_enquiries_status ON public_enquiries(status);
CREATE INDEX idx_public_enquiries_type ON public_enquiries(type);
CREATE INDEX idx_public_enquiries_unit ON public_enquiries(business_unit_id);

-- Apply updated_at triggers to leaf tables
CREATE TRIGGER trg_public_services_updated_at BEFORE UPDATE ON public_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_deals_updated_at BEFORE UPDATE ON deals_promotions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_enquiries_updated_at BEFORE UPDATE ON public_enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
