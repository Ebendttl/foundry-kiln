// ============================================================================
// Foundry Kiln — Shared Constants
// ============================================================================

export const FOUNDRY_ORG_ID = '00000000-0000-0000-0000-000000000001';

export const BUSINESS_UNIT_IDS = {
  THE_BOOTH: '00000000-0000-0000-0000-000000000010',
  THE_LINE: '00000000-0000-0000-0000-000000000020',
  THE_ROAST: '00000000-0000-0000-0000-000000000030',
} as const;

export const BUSINESS_UNIT_KEYS = {
  THE_BOOTH: 'the_booth',
  THE_LINE: 'the_line',
  THE_ROAST: 'the_roast',
} as const;

export const UNIT_COLORS = {
  the_booth: '#7B2FF7',
  the_line: '#E4002B',
  the_roast: '#C08A3E',
} as const;

export const UNIT_ACCENTS = {
  the_booth: { bg: '#7B2FF7', text: '#FFFFFF', label: 'The Booth' },
  the_line: { bg: '#E4002B', text: '#FFFFFF', label: 'The Line' },
  the_roast: { bg: '#C08A3E', text: '#FFFFFF', label: 'The Roast' },
} as const;

export const BOOKING_STATUSES = ['inquiry', 'confirmed', 'completed', 'cancelled'] as const;
export const ORDER_STATUSES = ['quote_requested', 'in_production', 'ready', 'delivered'] as const;
export const SUBSCRIPTION_STATUSES = ['active', 'paused', 'cancelled'] as const;
export const ENQUIRY_STATUSES = ['new', 'contacted', 'converted', 'closed'] as const;

export const CURRENCY_SYMBOL = '₦';
export const CURRENCY_CODE = 'NGN';

export function formatNaira(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatNairaFull(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Studio operating hours (used for time-slot calendar)
export const STUDIO_HOURS = {
  open: 8,   // 8 AM
  close: 22, // 10 PM
  slotDuration: 60, // minutes
} as const;

// WhatsApp link
export const WHATSAPP_NUMBER = '2349012345678'; // placeholder — update before deploy
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
