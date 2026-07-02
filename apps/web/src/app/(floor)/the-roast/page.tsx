import type { Metadata } from 'next';
import RoastClient from './roast-client';

export const metadata: Metadata = {
  title: 'The Roast — Specialty Coffee & Subscriptions',
  description:
    'Lagos specialty coffee roastery. Subscribe to freshly roasted single-origin or blended coffee beans delivered weekly or monthly.',
};

export default function TheRoastPage() {
  const menuItems = [
    {
      id: '00000000-0000-0000-0007-000000000001',
      name: 'Lagos Sunrise Blend',
      description: 'Our signature house espresso blend. Notes of dark chocolate, brown sugar, and orange zest.',
      origin: 'East Africa & Brazil',
      roast_level: 'medium' as const,
      price: 6500,
      category: 'bag' as const,
      is_featured: true,
    },
    {
      id: '00000000-0000-0000-0007-000000000002',
      name: 'Ethiopian Yirgacheffe',
      description: 'Single-origin washed process. Extremely clean cup with floral aroma, bergamot, and sweet lemon notes.',
      origin: 'Yirgacheffe, Ethiopia',
      roast_level: 'light' as const,
      price: 8500,
      category: 'bag' as const,
      is_featured: true,
    },
    {
      id: '00000000-0000-0000-0007-000000000003',
      name: 'Rwanda Gitesi',
      description: 'Single-origin natural process. Juicy body with tasting notes of red currant, black tea, and honey sweetness.',
      origin: 'Karongi, Rwanda',
      roast_level: 'light' as const,
      price: 8000,
      category: 'bag' as const,
      is_featured: false,
    },
  ];

  return <RoastClient menuItems={menuItems} />;
}
