import type { Metadata } from 'next';
import LineClient from './line-client';

export const metadata: Metadata = {
  title: 'The Line — Custom Print & Merch',
  description:
    'Custom t-shirts, hoodies, stickers, business cards, and posters with bulk-discount pricing. Upload your design, get a quote.',
};

export default function TheLinePage() {
  const products = [
    {
      id: '00000000-0000-0000-0006-000000000001',
      name: 'Custom T-Shirt',
      description: 'DTG printed t-shirts. 100% ring-spun cotton, S–3XL. Full-color prints front and/or back.',
      category: 'tshirt' as const,
      base_price: 5500,
      price_breaks: [
        { min_qty: 10, price: 5000 },
        { min_qty: 25, price: 4500 },
        { min_qty: 50, price: 4000 },
        { min_qty: 100, price: 3500 },
      ],
    },
    {
      id: '00000000-0000-0000-0006-000000000002',
      name: 'Premium Hoodie',
      description: 'Heavyweight 350gsm pullover hoodie with screen-print or embroidery.',
      category: 'hoodie' as const,
      base_price: 12000,
      price_breaks: [
        { min_qty: 10, price: 11000 },
        { min_qty: 25, price: 10000 },
        { min_qty: 50, price: 9000 },
      ],
    },
    {
      id: '00000000-0000-0000-0006-000000000003',
      name: 'Die-Cut Stickers',
      description: 'Weatherproof vinyl stickers, die-cut to any shape. UV-resistant, dishwasher-safe.',
      category: 'sticker' as const,
      base_price: 300,
      price_breaks: [
        { min_qty: 50, price: 300 },
        { min_qty: 100, price: 250 },
        { min_qty: 250, price: 200 },
        { min_qty: 500, price: 150 },
      ],
    },
    {
      id: '00000000-0000-0000-0006-000000000004',
      name: 'Business Cards',
      description: '400gsm uncoated or silk-laminated. Full-color CMYK both sides.',
      category: 'business_card' as const,
      base_price: 150,
      price_breaks: [
        { min_qty: 100, price: 150 },
        { min_qty: 250, price: 120 },
        { min_qty: 500, price: 90 },
        { min_qty: 1000, price: 65 },
      ],
    },
    {
      id: '00000000-0000-0000-0006-000000000005',
      name: 'A2 Poster Print',
      description: 'Giclée-quality poster printing on 200gsm matte or gloss art paper.',
      category: 'poster' as const,
      base_price: 3500,
      price_breaks: [
        { min_qty: 10, price: 3200 },
        { min_qty: 25, price: 2800 },
        { min_qty: 50, price: 2400 },
        { min_qty: 100, price: 2000 },
      ],
    },
  ];

  return <LineClient products={products} />;
}
