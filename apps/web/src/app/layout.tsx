import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Foundry — Raw talent. Real output. One floor.',
    template: '%s | Foundry',
  },
  description:
    'Foundry is a Lagos creative-economy production floor — studio rentals, custom print & merch, and specialty coffee under one roof.',
  keywords: [
    'Foundry Lagos',
    'podcast studio Lagos',
    'studio rental Lagos',
    'custom merch printing',
    'specialty coffee Lagos',
    'creative space Lagos',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Foundry',
    title: 'Foundry — Raw talent. Real output. One floor.',
    description:
      'A Lagos creative-economy production floor: studio rentals, custom print & merch, and specialty coffee.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foundry — Raw talent. Real output. One floor.',
    description:
      'A Lagos creative-economy production floor: studio rentals, custom print & merch, and specialty coffee.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
