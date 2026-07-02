import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Maker's Row — Expansion",
  description: "Kiln's expansion units coming soon to the Foundry floor: The Deck, The Crate, and The Bay.",
};

export default function MakersRowPage() {
  const futureUnits = [
    {
      name: 'The Deck',
      tagline: 'Indoor skate & BMX park',
      description: 'Lagos first dedicated indoor skatepark and BMX facility. Ramp sessions, lesson bookings, and custom deck building.',
      launch: 'Q2 2027',
      color: '#00C9A7',
    },
    {
      name: 'The Crate',
      tagline: 'Vinyl records & listening bar',
      description: 'A curated music space offering vinyl record sales, high-fidelity listening stations, and evening DJ residency sets.',
      launch: 'Q3 2027',
      color: '#FFB347',
    },
    {
      name: 'The Bay',
      tagline: 'Community bike repair co-op',
      description: 'Shared workstation rentals, bike mechanics classes, community tool library, and custom commuter builds.',
      launch: 'Q4 2027',
      color: '#4ECDC4',
    },
  ];

  return (
    <section className="bg-surface-primary py-20 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="label-mono text-foundry-orange block mb-3">Expansion Phase</span>
          <h1 className="heading-foundry text-5xl text-foundry-concrete mb-6">Maker&apos;s Row</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Adding three creative-economy units under the Foundry roof. Register your email below to be notified as each unit launches.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {futureUnits.map((unit) => (
            <div
              key={unit.name}
              className="border-2 border-border-subtle bg-surface-secondary p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
              style={{ borderRadius: '2px' }}
            >
              <div className="space-y-2 max-w-lg">
                <div className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: unit.color }}>
                  {unit.launch} Launch
                </div>
                <h2 className="heading-foundry text-2xl text-foundry-concrete">{unit.name}</h2>
                <h3 className="font-mono text-xs uppercase text-text-secondary">{unit.tagline}</h3>
                <p className="text-sm text-text-secondary leading-relaxed pt-2">{unit.description}</p>
              </div>

              <div className="flex-shrink-0">
                <button
                  className="btn-foundry-outline text-xs"
                  style={{ color: unit.color, borderColor: unit.color }}
                >
                  Notify Me
                </button>
              </div>

              {/* Decorative accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none"
                style={{
                  background: `repeating-linear-gradient(-45deg, ${unit.color}, ${unit.color} 2px, transparent 2px, transparent 10px)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Unified subscription form */}
        <div className="border-2 border-foundry-orange p-8 bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <h2 className="heading-foundry text-2xl text-foundry-concrete mb-4">Floor Updates</h2>
          <p className="text-sm text-text-secondary mb-6">
            Get general announcements, launch events, and founding member invite codes directly in your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              className="input-foundry flex-1"
              placeholder="you@example.com"
            />
            <button type="submit" className="btn-foundry sm:w-auto w-full">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
