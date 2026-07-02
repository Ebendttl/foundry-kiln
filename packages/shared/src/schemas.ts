import { z } from 'zod';

// ============================================================================
// PUBLIC ENQUIRY SCHEMAS
// ============================================================================
export const publicEnquirySchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone number is required').optional().or(z.literal('')),
  message: z.string().optional(),
  type: z.enum([
    'studio_booking', 'merch_quote', 'coffee_subscription',
    'wholesale_coffee', 'contact', 'notify_me',
  ]),
  metadata: z.record(z.unknown()).optional(),
});

// ============================================================================
// STUDIO BOOKING SCHEMA
// ============================================================================
export const studioBookingSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone number is required'),
  studio_space_id: z.string().uuid('Select a studio space'),
  booking_date: z.string().min(1, 'Select a date'),
  start_time: z.string().min(1, 'Select a start time'),
  end_time: z.string().min(1, 'Select an end time'),
  package_id: z.string().uuid().optional(),
  addons: z.array(z.object({
    name: z.string(),
    price: z.number(),
  })).default([]),
  message: z.string().optional(),
});

// ============================================================================
// MERCH QUOTE SCHEMA
// ============================================================================
export const merchQuoteSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone number is required'),
  product_id: z.string().uuid('Select a product'),
  quantity: z.number().min(1, 'Minimum quantity is 1'),
  message: z.string().optional(),
});

// ============================================================================
// COFFEE SUBSCRIPTION SCHEMA
// ============================================================================
export const coffeeSubscriptionSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone number is required'),
  plan: z.enum(['weekly', 'biweekly', 'monthly']),
  bag_size: z.enum(['250g', '500g', '1kg']),
  grind_type: z.enum(['whole_bean', 'french_press', 'filter', 'espresso', 'moka_pot']),
  preferred_roast: z.enum(['light', 'medium', 'dark', 'espresso', 'surprise_me']).optional(),
});

// ============================================================================
// TRANSACTION ENTRY SCHEMA
// ============================================================================
export const transactionEntrySchema = z.object({
  business_unit_id: z.string().uuid('Select a business unit'),
  type: z.enum(['income', 'expense']),
  category_id: z.string().uuid('Select a category'),
  subcategory_id: z.string().uuid().optional(),
  amount: z.number().positive('Amount must be greater than zero').max(999999999, 'Amount too large'),
  description: z.string().min(1, 'Description is required'),
  transaction_date: z.string().min(1, 'Date is required'),
});

export type PublicEnquiryInput = z.infer<typeof publicEnquirySchema>;
export type StudioBookingInput = z.infer<typeof studioBookingSchema>;
export type MerchQuoteInput = z.infer<typeof merchQuoteSchema>;
export type CoffeeSubscriptionInput = z.infer<typeof coffeeSubscriptionSchema>;
export type TransactionEntryInput = z.infer<typeof transactionEntrySchema>;
