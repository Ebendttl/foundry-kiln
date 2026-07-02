-- ============================================================================
-- FOUNDRY KILN — Seed Data
-- Organization, business units, roles, permissions, and realistic content
-- ============================================================================

-- ============================================================================
-- ORGANIZATION
-- ============================================================================
INSERT INTO organizations (id, name, logo_url, branding_color)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Foundry Collective Limited',
  NULL,
  '#FF4B12'
);

-- ============================================================================
-- BUSINESS UNITS
-- ============================================================================
INSERT INTO business_units (id, org_id, key, display_name, slug, icon, color) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'the_booth', 'The Booth', 'the-booth', 'mic', '#7B2FF7'),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'the_line', 'The Line', 'the-line', 'printer', '#E4002B'),
  ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000001', 'the_roast', 'The Roast', 'the-roast', 'coffee', '#C08A3E');

-- ============================================================================
-- PERMISSIONS
-- ============================================================================
INSERT INTO permissions (id, key, label, description) VALUES
  ('00000000-0000-0000-0001-000000000001', 'view_financial_data', 'View Financial Data', 'Can view income, expenses, and financial reports'),
  ('00000000-0000-0000-0001-000000000002', 'manage_financial_data', 'Manage Financial Data', 'Can create, edit, and delete financial entries'),
  ('00000000-0000-0000-0001-000000000003', 'export_reports', 'Export Reports', 'Can export financial data as PDF, CSV, or Excel'),
  ('00000000-0000-0000-0001-000000000004', 'manage_users', 'Manage Users', 'Can invite, edit roles, and deactivate users'),
  ('00000000-0000-0000-0001-000000000005', 'manage_business_units', 'Manage Business Units', 'Can create and configure business units'),
  ('00000000-0000-0000-0001-000000000006', 'set_budgets', 'Set Budgets', 'Can create and modify budget allocations'),
  ('00000000-0000-0000-0001-000000000007', 'approve_expenses', 'Approve Expenses', 'Can approve or reject expense entries'),
  ('00000000-0000-0000-0001-000000000008', 'view_all_units', 'View All Units', 'Can see data across all business units');

-- ============================================================================
-- ROLES
-- ============================================================================
INSERT INTO roles (id, org_id, name, display_name, description, is_system) VALUES
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000001', 'owner_admin', 'Owner / Admin', 'Full access to all features and data', TRUE),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000001', 'unit_manager', 'Unit Manager', 'Manages operations for assigned business unit(s)', TRUE),
  ('00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0000-000000000001', 'finance_viewer', 'Finance Viewer', 'Read-only access to financial data for permitted units', TRUE),
  ('00000000-0000-0000-0002-000000000004', '00000000-0000-0000-0000-000000000001', 'report_generator', 'Report Generator', 'Can view and export reports, but cannot edit data', TRUE),
  ('00000000-0000-0000-0002-000000000005', '00000000-0000-0000-0000-000000000001', 'staff', 'Staff', 'Data entry only, no financial visibility (Phase 2)', TRUE);

-- ============================================================================
-- ROLE-PERMISSION ASSIGNMENTS
-- ============================================================================
-- Owner/Admin: ALL permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000002'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000004'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000005'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000006'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000007'),
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000008');

-- Unit Manager: view + manage financial, export, set budgets, approve expenses
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000002'),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000003'),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000006'),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000007');

-- Finance Viewer: view financial data only
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0001-000000000001');

-- Report Generator: view + export
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('00000000-0000-0000-0002-000000000004', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0002-000000000004', '00000000-0000-0000-0001-000000000003');

-- ============================================================================
-- CATEGORIES (income & expense per unit)
-- ============================================================================
-- The Booth categories
INSERT INTO categories (id, org_id, business_unit_id, name, type) VALUES
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Studio Rental Income', 'income'),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Equipment Rental', 'income'),
  ('00000000-0000-0000-0003-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Equipment Maintenance', 'expense'),
  ('00000000-0000-0000-0003-000000000004', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Utilities', 'expense');

-- The Line categories
INSERT INTO categories (id, org_id, business_unit_id, name, type) VALUES
  ('00000000-0000-0000-0003-000000000011', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Print Sales', 'income'),
  ('00000000-0000-0000-0003-000000000012', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Custom Merch Orders', 'income'),
  ('00000000-0000-0000-0003-000000000013', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Raw Materials', 'expense'),
  ('00000000-0000-0000-0003-000000000014', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'Machine Maintenance', 'expense');

-- The Roast categories
INSERT INTO categories (id, org_id, business_unit_id, name, type) VALUES
  ('00000000-0000-0000-0003-000000000021', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030', 'Café Sales', 'income'),
  ('00000000-0000-0000-0003-000000000022', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030', 'Subscription Revenue', 'income'),
  ('00000000-0000-0000-0003-000000000023', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030', 'Green Beans Procurement', 'expense'),
  ('00000000-0000-0000-0003-000000000024', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030', 'Packaging & Shipping', 'expense');

-- ============================================================================
-- STUDIO SPACES (The Booth)
-- ============================================================================
INSERT INTO studio_spaces (id, org_id, business_unit_id, name, description, capacity, hourly_rate, day_rate, equipment_included, image_url) VALUES
  ('00000000-0000-0000-0004-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Podcast Room', 'Acoustically treated intimate room for 2–4 person podcasts, interviews, and voice-overs. Sound-dampened walls, built-in desk, and overhead boom arms.',
   4, 15000.00, 90000.00,
   '["2x Shure SM7B microphones", "Focusrite Scarlett 4i4 interface", "Boom arms & pop filters", "Headphone amp + 4 headphones", "Acoustic treatment"]',
   NULL),
  ('00000000-0000-0000-0004-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Music Suite', 'Full production suite for recording, mixing, and mastering. Features a vocal booth, control room, and live room area.',
   6, 25000.00, 150000.00,
   '["Neumann U87 condenser mic", "Universal Audio Apollo Twin X", "MIDI keyboard (61 key)", "KRK Rokit 8 monitors (pair)", "Vocal booth", "Pro Tools / Logic Pro"]',
   NULL),
  ('00000000-0000-0000-0004-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Photo/Video Cyc Wall', 'White infinity cyclorama wall studio for photography, video content, product shoots, and interviews. 5m x 4m shooting area with 3.5m ceiling.',
   8, 20000.00, 120000.00,
   '["3-point LED lighting kit", "Background paper rolls (white, black, grey)", "C-stands & clamps", "Tether table", "Monitor for review"]',
   NULL);

-- ============================================================================
-- STUDIO PACKAGES (The Booth)
-- ============================================================================
INSERT INTO studio_packages (id, org_id, business_unit_id, name, description, base_hours, price_from, inclusions) VALUES
  ('00000000-0000-0000-0005-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Quick Session', 'Perfect for a single podcast episode, a quick interview, or a short recording session.',
   2, 25000.00,
   '["2-hour studio access", "Basic equipment included", "Raw audio/files delivered via WeTransfer"]'),
  ('00000000-0000-0000-0005-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Half Day', 'Room to breathe — record multiple takes, set up properly, and get the job done without rushing.',
   4, 45000.00,
   '["4-hour studio access", "All equipment included", "1 re-take slot", "Basic editing included", "Files delivered same day"]'),
  ('00000000-0000-0000-0005-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Full Day', 'The whole floor is yours. Ideal for album sessions, video shoots, and multi-episode podcast blocks.',
   8, 80000.00,
   '["8-hour studio access", "All equipment included", "Sound engineer on standby", "Unlimited takes", "Professional mixing included", "Priority delivery"]');

-- ============================================================================
-- MERCH PRODUCTS (The Line)
-- ============================================================================
INSERT INTO merch_products (id, org_id, business_unit_id, name, description, category, base_price, price_breaks, image_url) VALUES
  ('00000000-0000-0000-0006-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Custom T-Shirt', 'DTG (Direct to Garment) printed t-shirts. 100% ring-spun cotton, available in S–3XL. Full-color prints front and/or back.',
   'tshirt', 5500.00,
   '[{"min_qty": 10, "price": 5000}, {"min_qty": 25, "price": 4500}, {"min_qty": 50, "price": 4000}, {"min_qty": 100, "price": 3500}]',
   NULL),
  ('00000000-0000-0000-0006-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Premium Hoodie', 'Heavyweight 350gsm pullover hoodie with screen-print or embroidery. Kangaroo pocket, reinforced seams.',
   'hoodie', 12000.00,
   '[{"min_qty": 10, "price": 11000}, {"min_qty": 25, "price": 10000}, {"min_qty": 50, "price": 9000}]',
   NULL),
  ('00000000-0000-0000-0006-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Die-Cut Stickers', 'Weatherproof vinyl stickers, die-cut to any shape. UV-resistant, dishwasher-safe. Minimum order: 50 units.',
   'sticker', 300.00,
   '[{"min_qty": 50, "price": 300}, {"min_qty": 100, "price": 250}, {"min_qty": 250, "price": 200}, {"min_qty": 500, "price": 150}]',
   NULL),
  ('00000000-0000-0000-0006-000000000004', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Business Cards', '400gsm uncoated or silk-laminated business cards. Full-color CMYK both sides, rounded or square corners.',
   'business_card', 150.00,
   '[{"min_qty": 100, "price": 150}, {"min_qty": 250, "price": 120}, {"min_qty": 500, "price": 90}, {"min_qty": 1000, "price": 65}]',
   NULL),
  ('00000000-0000-0000-0006-000000000005', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'A2 Poster Print', 'Giclée-quality poster printing on 200gsm matte or gloss art paper. Perfect for events, album covers, and retail displays.',
   'poster', 3500.00,
   '[{"min_qty": 10, "price": 3200}, {"min_qty": 25, "price": 2800}, {"min_qty": 50, "price": 2400}, {"min_qty": 100, "price": 2000}]',
   NULL);

-- ============================================================================
-- ROAST MENU ITEMS (The Roast)
-- ============================================================================
INSERT INTO roast_menu_items (id, org_id, business_unit_id, name, description, origin, roast_level, price, category, is_featured) VALUES
  ('00000000-0000-0000-0007-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Lagos Sunrise Blend', 'Bright, citrusy blend with notes of blood orange and honeycomb. Our house filter coffee — the way Lagos wakes up.',
   'Ethiopian Yirgacheffe + Colombian Huila', 'light', 4500.00, 'bag', TRUE),
  ('00000000-0000-0000-0007-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Mainland Dark', 'Bold, smoky, no-nonsense espresso blend. Dark chocolate, toasted walnut, and a clean tobacco finish.',
   'Brazilian Santos + Sumatran Mandheling', 'dark', 4500.00, 'bag', TRUE),
  ('00000000-0000-0000-0007-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Single Origin: Kenyan AA', 'Washed process, sun-dried. Blackcurrant, grapefruit, and brown sugar. Limited seasonal lot.',
   'Kenya (Nyeri County)', 'medium', 5500.00, 'bag', FALSE),
  ('00000000-0000-0000-0007-000000000004', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Espresso Shot', 'Double shot pulled on our La Marzocca Linea. Choose house blend or single-origin of the week.',
   NULL, 'espresso', 1500.00, 'espresso_drink', FALSE),
  ('00000000-0000-0000-0007-000000000005', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'V60 Pour Over', 'Hand-brewed single cup, any origin in stock. Served with tasting notes.',
   NULL, NULL, 2000.00, 'pour_over', FALSE),
  ('00000000-0000-0000-0007-000000000006', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Cold Brew (350ml)', '18-hour cold-steeped in-house. Smooth, low-acid, served on ice or with oat milk.',
   'House Blend', 'medium', 2500.00, 'cold_brew', TRUE);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================
INSERT INTO testimonials (org_id, business_unit_id, author_name, author_role, content, rating, is_featured) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Tola Adesanya', 'Podcast Host, "The Lagos Frequency"',
   'We recorded our entire first season at The Booth. The acoustic treatment is serious, the gear is top-tier, and the team actually cares about your output. Best studio value in Lagos, no contest.',
   5, TRUE),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Chidi Okonkwo', 'Founder, BLVCK MRKTS Streetwear',
   'We ran 200 custom hoodies through The Line for our pop-up launch. Quality was flawless, turnaround was 5 days, and the bulk pricing made our margins work. Already placed our second order.',
   5, TRUE),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030',
   'Amara Eze', 'Creative Director, Studio Nomad',
   'The Roast''s subscription is the one thing I haven''t cancelled in two years. The Lagos Sunrise Blend is legitimately the best coffee I''ve had in Nigeria — and I''ve tried them all.',
   5, TRUE),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010',
   'Femi Adewale', 'Music Producer',
   'Booked the Music Suite for a 3-day album session. The engineer they assigned was incredibly skilled, and the Neumann U87 captured vocals like butter. Will be back monthly.',
   5, FALSE),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020',
   'Nneka Ifeoma', 'Marketing Lead, TechCabal',
   'Needed 500 branded stickers for a conference in 48 hours. The Line delivered overnight. Perfect die-cuts, vivid colours, and they even caught a bleed error in our design file before printing.',
   5, FALSE);

-- ============================================================================
-- COMING SOON UNITS (Maker's Row)
-- ============================================================================
INSERT INTO coming_soon_units (org_id, name, slug, description, icon, expected_launch_label, color, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000001', 'The Deck', 'the-deck',
   'An indoor skate and BMX park for Lagos creatives who need to move. Sessions, competitions, and community rides.',
   'skateboard', 'Q2 2027', '#00C9A7', 1),
  ('00000000-0000-0000-0000-000000000001', 'The Crate', 'the-crate',
   'Vinyl records, cassettes, and curated music gear. A listening bar meets record shop on the production floor.',
   'disc', 'Q3 2027', '#FFB347', 2),
  ('00000000-0000-0000-0000-000000000001', 'The Bay', 'the-bay',
   'Community bike repair co-op. Fix your ride, learn the craft, and join group rides across Lagos.',
   'wrench', 'Q4 2027', '#4ECDC4', 3);
