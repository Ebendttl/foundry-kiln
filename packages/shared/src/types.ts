// ============================================================================
// Shared TypeScript types for Foundry Kiln
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  logo_url: string | null;
  branding_color: string;
  created_at: string;
}

export interface BusinessUnit {
  id: string;
  org_id: string;
  key: string;
  display_name: string;
  slug: string;
  icon: string | null;
  color: string;
  is_active: boolean;
}

export interface StudioSpace {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  hourly_rate: number;
  day_rate: number | null;
  equipment_included: string[];
  image_url: string | null;
  is_active: boolean;
}

export interface StudioPackage {
  id: string;
  name: string;
  description: string | null;
  base_hours: number;
  price_from: number;
  inclusions: string[];
  is_active: boolean;
}

export interface StudioBooking {
  id: string;
  studio_space_id: string;
  client_name: string;
  client_email: string | null;
  client_phone: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  package_id: string | null;
  addons: Array<{ name: string; price: number }>;
  deposit_amount: number;
  total_quoted: number;
  amount_paid: number;
  status: 'inquiry' | 'confirmed' | 'completed' | 'cancelled';
}

export interface MerchProduct {
  id: string;
  name: string;
  description: string | null;
  category: 'tshirt' | 'hoodie' | 'sticker' | 'business_card' | 'poster';
  base_price: number;
  price_breaks: Array<{ min_qty: number; price: number }>;
  image_url: string | null;
  is_active: boolean;
}

export interface RoastMenuItem {
  id: string;
  name: string;
  description: string | null;
  origin: string | null;
  roast_level: 'light' | 'medium' | 'dark' | 'espresso' | null;
  price: number;
  category: 'bag' | 'espresso_drink' | 'pour_over' | 'cold_brew';
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

export interface CoffeeSubscription {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  plan: 'weekly' | 'biweekly' | 'monthly';
  bag_size: '250g' | '500g' | '1kg';
  grind_type: 'whole_bean' | 'french_press' | 'filter' | 'espresso' | 'moka_pot';
  preferred_roast: string | null;
  price_per_cycle: number;
  next_delivery_date: string | null;
  status: 'active' | 'paused' | 'cancelled';
}

export interface Testimonial {
  id: string;
  business_unit_id: string | null;
  author_name: string;
  author_role: string | null;
  content: string;
  rating: number | null;
  is_featured: boolean;
}

export interface ComingSoonUnit {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  expected_launch_label: string | null;
  color: string | null;
}

export interface PublicEnquiry {
  id: string;
  business_unit_id: string | null;
  type: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  metadata: Record<string, unknown>;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export interface Transaction {
  id: string;
  org_id: string;
  business_unit_id: string;
  type: 'income' | 'expense';
  category_id: string | null;
  subcategory_id: string | null;
  amount: number;
  currency: string;
  description: string | null;
  transaction_date: string;
  recorded_by: string | null;
  source: 'manual' | 'booking' | 'order' | 'subscription';
  source_ref_id: string | null;
  created_at: string;
}

export interface DailySummary {
  id: string;
  org_id: string;
  business_unit_id: string;
  summary_date: string;
  total_income: number;
  total_expense: number;
  net_profit: number;
  transaction_count: number;
}
