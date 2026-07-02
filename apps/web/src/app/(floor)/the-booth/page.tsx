import type { Metadata } from 'next';
import BoothClient from './booth-client';

export const metadata: Metadata = {
  title: 'The Booth — Studio Rentals',
  description:
    'Book podcast rooms, music suites, and photo/video studios by the hour at Foundry. Professional equipment included.',
};

export default function TheBoothPage() {
  // In production, this data comes from Supabase server-side.
  // For now, using seed-matching data for the full end-to-end experience.
  const studioSpaces = [
    {
      id: '00000000-0000-0000-0004-000000000001',
      name: 'Podcast Room',
      description: 'Acoustically treated intimate room for 2–4 person podcasts, interviews, and voice-overs.',
      capacity: 4,
      hourly_rate: 15000,
      day_rate: 90000,
      equipment_included: ['2x Shure SM7B microphones', 'Focusrite Scarlett 4i4 interface', 'Boom arms & pop filters', 'Headphone amp + 4 headphones', 'Acoustic treatment'],
      image_url: null,
    },
    {
      id: '00000000-0000-0000-0004-000000000002',
      name: 'Music Suite',
      description: 'Full production suite for recording, mixing, and mastering with vocal booth and live room.',
      capacity: 6,
      hourly_rate: 25000,
      day_rate: 150000,
      equipment_included: ['Neumann U87 condenser mic', 'Universal Audio Apollo Twin X', 'MIDI keyboard (61 key)', 'KRK Rokit 8 monitors (pair)', 'Vocal booth', 'Pro Tools / Logic Pro'],
      image_url: null,
    },
    {
      id: '00000000-0000-0000-0004-000000000003',
      name: 'Photo/Video Cyc Wall',
      description: 'White infinity cyclorama wall studio — 5m x 4m shooting area with 3.5m ceiling.',
      capacity: 8,
      hourly_rate: 20000,
      day_rate: 120000,
      equipment_included: ['3-point LED lighting kit', 'Background paper rolls (white, black, grey)', 'C-stands & clamps', 'Tether table', 'Monitor for review'],
      image_url: null,
    },
  ];

  const packages = [
    {
      id: '00000000-0000-0000-0005-000000000001',
      name: 'Quick Session',
      description: 'Perfect for a single podcast episode, a quick interview, or a short recording session.',
      base_hours: 2,
      price_from: 25000,
      inclusions: ['2-hour studio access', 'Basic equipment included', 'Raw audio/files delivered via WeTransfer'],
    },
    {
      id: '00000000-0000-0000-0005-000000000002',
      name: 'Half Day',
      description: 'Room to breathe — record multiple takes, set up properly, and get the job done without rushing.',
      base_hours: 4,
      price_from: 45000,
      inclusions: ['4-hour studio access', 'All equipment included', '1 re-take slot', 'Basic editing included', 'Files delivered same day'],
    },
    {
      id: '00000000-0000-0000-0005-000000000003',
      name: 'Full Day',
      description: 'The whole floor is yours. Ideal for album sessions, video shoots, and multi-episode podcast blocks.',
      base_hours: 8,
      price_from: 80000,
      inclusions: ['8-hour studio access', 'All equipment included', 'Sound engineer on standby', 'Unlimited takes', 'Professional mixing included', 'Priority delivery'],
    },
  ];

  const addons = [
    { name: 'Sound Engineer', price: 15000, description: 'Dedicated engineer for the session' },
    { name: 'Extra Microphone', price: 5000, description: 'Additional mic setup' },
    { name: 'Lighting Kit', price: 8000, description: 'Professional lighting (photo/video)' },
    { name: 'Live Streaming', price: 10000, description: 'Multi-cam live stream setup' },
  ];

  return <BoothClient studioSpaces={studioSpaces} packages={packages} addons={addons} />;
}
