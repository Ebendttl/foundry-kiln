-- ============================================================================
-- FOUNDRY KILN — Migration 001: Core Trunk Tables
-- Organizations, Users, Roles, Permissions, Business Units
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ORGANIZATIONS
-- ============================================================================
CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  logo_url    TEXT,
  branding_color TEXT DEFAULT '#FF4B12',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- BUSINESS UNITS
-- ============================================================================
CREATE TABLE business_units (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id        UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  key           TEXT NOT NULL, -- 'the_booth', 'the_line', 'the_roast', or custom
  display_name  TEXT NOT NULL,
  slug          TEXT NOT NULL,
  icon          TEXT,
  color         TEXT NOT NULL DEFAULT '#FF4B12',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, key),
  UNIQUE(org_id, slug)
);

-- ============================================================================
-- USER PROFILES (linked to Supabase Auth)
-- ============================================================================
CREATE TABLE user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id      UUID REFERENCES organizations(id) ON DELETE SET NULL,
  full_name   TEXT NOT NULL,
  avatar_url  TEXT,
  phone       TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROLES & PERMISSIONS
-- ============================================================================
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id      UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name        TEXT NOT NULL, -- 'owner_admin', 'unit_manager', 'finance_viewer', 'report_generator', 'staff'
  display_name TEXT NOT NULL,
  description TEXT,
  is_system   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, name)
);

CREATE TABLE permissions (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key   TEXT NOT NULL UNIQUE, -- 'view_financial_data', 'manage_financial_data', etc.
  label TEXT NOT NULL,
  description TEXT
);

CREATE TABLE role_permissions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE(role_id, permission_id)
);

CREATE TABLE user_roles (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role_id          UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE, -- NULL = org-wide
  assigned_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by      UUID REFERENCES user_profiles(id),
  UNIQUE(user_id, role_id, business_unit_id)
);

-- ============================================================================
-- CATEGORIES & SUBCATEGORIES
-- ============================================================================
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE subcategories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- UNIFIED TRANSACTIONS LEDGER
-- ============================================================================
CREATE TABLE transactions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  type              TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category_id       UUID REFERENCES categories(id),
  subcategory_id    UUID REFERENCES subcategories(id),
  amount            NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  currency          TEXT NOT NULL DEFAULT 'NGN',
  description       TEXT,
  transaction_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  recorded_by       UUID REFERENCES user_profiles(id),
  source            TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'booking', 'order', 'subscription')),
  source_ref_id     UUID, -- polymorphic reference to studio_bookings, merch_orders, or coffee_subscriptions
  attachment_url    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transactions_org_date ON transactions(org_id, transaction_date);
CREATE INDEX idx_transactions_unit_date ON transactions(business_unit_id, transaction_date);
CREATE INDEX idx_transactions_source ON transactions(source, source_ref_id);

-- ============================================================================
-- BUDGETS & LINE ITEMS
-- ============================================================================
CREATE TABLE budgets (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,
  total_amount      NUMERIC(12, 2) NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  revision_number   INT NOT NULL DEFAULT 1,
  parent_budget_id  UUID REFERENCES budgets(id), -- for mid-cycle revisions
  created_by        UUID REFERENCES user_profiles(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE budget_line_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id     UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  category_id   UUID NOT NULL REFERENCES categories(id),
  planned_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  actual_amount  NUMERIC(12, 2) NOT NULL DEFAULT 0,
  variance       NUMERIC(12, 2) GENERATED ALWAYS AS (planned_amount - actual_amount) STORED,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- DAILY SUMMARIES (materialized rollup cache)
-- ============================================================================
CREATE TABLE daily_summaries (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id  UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  summary_date      DATE NOT NULL,
  total_income      NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_expense     NUMERIC(12, 2) NOT NULL DEFAULT 0,
  net_profit        NUMERIC(12, 2) GENERATED ALWAYS AS (total_income - total_expense) STORED,
  transaction_count INT NOT NULL DEFAULT 0,
  computed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, business_unit_id, summary_date)
);

CREATE INDEX idx_daily_summaries_date ON daily_summaries(org_id, summary_date);

-- ============================================================================
-- AUDIT LOGS
-- ============================================================================
CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES user_profiles(id),
  action          TEXT NOT NULL, -- 'create', 'update', 'delete'
  table_name      TEXT NOT NULL,
  record_id       UUID NOT NULL,
  old_values      JSONB,
  new_values      JSONB,
  ip_address      INET,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_org ON audit_logs(org_id, created_at DESC);

-- ============================================================================
-- NOTIFICATION PREFERENCES & DEVICE TOKENS
-- ============================================================================
CREATE TABLE notification_preferences (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  daily_digest BOOLEAN NOT NULL DEFAULT TRUE,
  budget_alerts BOOLEAN NOT NULL DEFAULT TRUE,
  new_leads    BOOLEAN NOT NULL DEFAULT TRUE,
  push_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  email_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE device_tokens (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  token       TEXT NOT NULL,
  platform    TEXT NOT NULL DEFAULT 'web', -- 'web', 'ios', 'android'
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, token)
);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER trg_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_business_units_updated_at BEFORE UPDATE ON business_units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_budgets_updated_at BEFORE UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_budget_line_items_updated_at BEFORE UPDATE ON budget_line_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_notification_prefs_updated_at BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
