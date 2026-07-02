-- ============================================================================
-- FOUNDRY KILN — Migration 002: Branch Tables
-- The Booth (time-slot bookings), The Line (quantity/tier orders),
-- The Roast (recurring subscriptions)
-- ============================================================================

-- ============================================================================
-- BRANCH: THE BOOTH — TIME-SLOT BOOKING MODEL
-- ============================================================================

CREATE TABLE studio_spaces (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  capacity            INT NOT NULL DEFAULT 1,
  hourly_rate         NUMERIC(10, 2) NOT NULL,
  day_rate            NUMERIC(10, 2),
  equipment_included  JSONB DEFAULT '[]'::jsonb,
  image_url           TEXT,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE studio_packages (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  base_hours          INT NOT NULL DEFAULT 1,
  price_from          NUMERIC(10, 2) NOT NULL,
  inclusions          JSONB DEFAULT '[]'::jsonb,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE studio_bookings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  studio_space_id     UUID NOT NULL REFERENCES studio_spaces(id) ON DELETE CASCADE,
  client_name         TEXT NOT NULL,
  client_email        TEXT,
  client_phone        TEXT NOT NULL,
  booking_date        DATE NOT NULL,
  start_time          TIME NOT NULL,
  end_time            TIME NOT NULL,
  package_id          UUID REFERENCES studio_packages(id),
  addons              JSONB DEFAULT '[]'::jsonb, -- [{name: "engineer", price: 15000}, ...]
  deposit_amount      NUMERIC(10, 2) DEFAULT 0,
  total_quoted        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  amount_paid         NUMERIC(10, 2) DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'inquiry'
                      CHECK (status IN ('inquiry', 'confirmed', 'completed', 'cancelled')),
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

CREATE INDEX idx_studio_bookings_date ON studio_bookings(booking_date, studio_space_id);
CREATE INDEX idx_studio_bookings_status ON studio_bookings(status);

-- ============================================================================
-- BRANCH: THE LINE — QUANTITY/TIER PRICING MODEL
-- ============================================================================

CREATE TABLE merch_products (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  category            TEXT NOT NULL CHECK (category IN ('tshirt', 'hoodie', 'sticker', 'business_card', 'poster')),
  base_price          NUMERIC(10, 2) NOT NULL,
  price_breaks        JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Example: [{"min_qty": 10, "price": 4500}, {"min_qty": 25, "price": 4000}, {"min_qty": 50, "price": 3500}, {"min_qty": 100, "price": 3000}]
  image_url           TEXT,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE merch_orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  product_id          UUID NOT NULL REFERENCES merch_products(id) ON DELETE CASCADE,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT,
  customer_phone      TEXT NOT NULL,
  quantity            INT NOT NULL CHECK (quantity > 0),
  design_file_url     TEXT,
  notes               TEXT,
  unit_price          NUMERIC(10, 2) NOT NULL, -- resolved price per unit at time of order
  amount_charged      NUMERIC(10, 2) NOT NULL,
  amount_paid         NUMERIC(10, 2) DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'quote_requested'
                      CHECK (status IN ('quote_requested', 'in_production', 'ready', 'delivered')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_merch_orders_status ON merch_orders(status);

-- ============================================================================
-- BRANCH: THE ROAST — RECURRING SUBSCRIPTION MODEL
-- ============================================================================

CREATE TABLE roast_menu_items (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  origin              TEXT, -- e.g., 'Ethiopian Yirgacheffe', 'Colombian Huila'
  roast_level         TEXT CHECK (roast_level IN ('light', 'medium', 'dark', 'espresso')),
  price               NUMERIC(10, 2) NOT NULL,
  category            TEXT NOT NULL CHECK (category IN ('bag', 'espresso_drink', 'pour_over', 'cold_brew')),
  image_url           TEXT,
  is_featured         BOOLEAN NOT NULL DEFAULT FALSE,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE coffee_subscriptions (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id              UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  business_unit_id    UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT,
  customer_phone      TEXT NOT NULL,
  plan                TEXT NOT NULL CHECK (plan IN ('weekly', 'biweekly', 'monthly')),
  bag_size            TEXT NOT NULL DEFAULT '250g' CHECK (bag_size IN ('250g', '500g', '1kg')),
  grind_type          TEXT NOT NULL DEFAULT 'whole_bean'
                      CHECK (grind_type IN ('whole_bean', 'french_press', 'filter', 'espresso', 'moka_pot')),
  preferred_roast     TEXT CHECK (preferred_roast IN ('light', 'medium', 'dark', 'espresso', 'surprise_me')),
  price_per_cycle     NUMERIC(10, 2) NOT NULL,
  next_delivery_date  DATE,
  status              TEXT NOT NULL DEFAULT 'active'
                      CHECK (status IN ('active', 'paused', 'cancelled')),
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coffee_subs_status ON coffee_subscriptions(status);
CREATE INDEX idx_coffee_subs_delivery ON coffee_subscriptions(next_delivery_date) WHERE status = 'active';

-- Apply updated_at triggers to branch tables
CREATE TRIGGER trg_studio_spaces_updated_at BEFORE UPDATE ON studio_spaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_studio_bookings_updated_at BEFORE UPDATE ON studio_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_merch_products_updated_at BEFORE UPDATE ON merch_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_merch_orders_updated_at BEFORE UPDATE ON merch_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_roast_menu_items_updated_at BEFORE UPDATE ON roast_menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_coffee_subs_updated_at BEFORE UPDATE ON coffee_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
