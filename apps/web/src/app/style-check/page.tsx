'use client';

import Link from 'next/link';

export default function StyleCheckPage() {
  return (
    <div className="min-h-screen bg-foundry-black text-foundry-concrete selection:bg-foundry-orange selection:text-foundry-black p-8 sm:p-16 lg:p-24 space-y-24">
      
      {/* Back button */}
      <div>
        <Link href="/" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-foundry-orange transition-all duration-150">
          ← Back to Floor
        </Link>
      </div>

      {/* Header section */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange px-2.5 py-1 border border-foundry-orange" style={{ borderRadius: '2px' }}>
          SYSTEM REFERENCE
        </span>
        <h1 className="font-display font-bold text-5xl uppercase tracking-tight text-foundry-concrete leading-none">
          Kiln Visual Style Check
        </h1>
        <p className="font-body text-lg text-text-secondary max-w-2xl leading-relaxed">
          This page renders the typography, color rules, grid spacing, imagery, and component polish standards defined in the corrected design system.
        </p>
      </div>

      <hr className="border-border-subtle" />

      {/* 1. TYPOGRAPHY & TYPE SCALE */}
      <section className="space-y-12">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">01 / TYPOGRAPHY</span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-foundry-concrete">Type Scale Hierarchy</h2>
        </div>

        <div className="space-y-8 bg-surface-secondary p-8 border border-border-subtle" style={{ borderRadius: '2px' }}>
          {/* Display Hero Headline */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Hero Display (Space Grotesk, 700, mixed case, ~96px)</span>
            <h1 className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-foundry-concrete">
              Raw talent. Real output. One floor.
            </h1>
          </div>

          {/* Section Headline */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Section Headline (Space Grotesk, 700, mixed case, 40-56px)</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foundry-concrete leading-none">
              A studio built for clean sound.
            </h2>
          </div>

          {/* Card / Subsection Title */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Card Title (Space Grotesk, 600, mixed case, 22-28px)</span>
            <h3 className="font-display font-semibold text-2xl tracking-tight text-foundry-concrete">
              Podcast Room B (Cyc Wall)
            </h3>
          </div>

          {/* Body Copy */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Body Copy (IBM Plex Sans, 400, sentence case, 16-18px)</span>
            <p className="font-body text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
              Every room is acoustically treated with custom rockwool panels and calibrated for a flat response. Bookings include a dedicated operator or you can patch in your own engineer.
            </p>
          </div>

          {/* Eyebrow Tag */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Eyebrow / Tag (IBM Plex Mono, 500, uppercase, 11-12px, letter-spaced)</span>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange">
                THE ROAST
              </span>
            </div>
          </div>

          {/* Price / Timestamp / Status */}
          <div className="space-y-2 border-b border-border-subtle pb-6">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Price / Status (IBM Plex Mono, 500, mixed case, 14-16px)</span>
            <div className="flex gap-4">
              <span className="font-mono text-base text-foundry-concrete">₦6,500/hr</span>
              <span className="font-mono text-sm text-green-400 border border-green-500/30 px-2 py-0.5 bg-green-500/5" style={{ borderRadius: '2px' }}>
                AVAILABLE
              </span>
            </div>
          </div>

          {/* Button Label */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-text-secondary uppercase">Button Label (IBM Plex Mono, 600, uppercase, 13-14px, letter-spaced)</span>
            <div>
              <span className="font-mono text-sm font-semibold uppercase tracking-wider">
                CONFIRM BOOKING
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPACING SCALE */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">02 / SPACING</span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-foundry-concrete">Breathing Room</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[16, 24, 32, 48, 64, 96, 128, 160].map((space) => (
            <div key={space} className="border border-border-subtle p-4 bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
              <span className="font-mono text-xs text-text-secondary block">{space}px</span>
              <div className="bg-foundry-orange/20 border border-foundry-orange/40" style={{ height: `${space}px` }} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. COLOR RATIONING */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">03 / COLOR RATIONING</span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-foundry-concrete">Core Swatches</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 border border-border-subtle bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
            <div className="w-full h-12 bg-foundry-black border border-border-subtle" />
            <div>
              <h4 className="font-display font-bold text-base text-foundry-concrete uppercase">Off-Black</h4>
              <span className="font-mono text-xs text-text-secondary">#121212</span>
            </div>
          </div>
          <div className="p-6 border border-border-subtle bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
            <div className="w-full h-12 bg-surface-secondary border border-border-subtle" />
            <div>
              <h4 className="font-display font-bold text-base text-foundry-concrete uppercase">Elevated Surface</h4>
              <span className="font-mono text-xs text-text-secondary">#1A1A1A</span>
            </div>
          </div>
          <div className="p-6 border border-border-subtle bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
            <div className="w-full h-12 bg-foundry-concrete" />
            <div>
              <h4 className="font-display font-bold text-base text-foundry-concrete uppercase">Raw Concrete</h4>
              <span className="font-mono text-xs text-text-secondary">#EDEBE6</span>
            </div>
          </div>
          <div className="p-6 border border-border-subtle bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
            <div className="w-full h-12 bg-foundry-orange" />
            <div>
              <h4 className="font-display font-bold text-base text-foundry-concrete uppercase">Signal Orange</h4>
              <span className="font-mono text-xs text-text-secondary">#FF4B12</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MANDATORY IMAGERY & REFINED CARDS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">04 / CARDS & IMAGERY</span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-foundry-concrete">Unit Card Specs (4px Top Border, Real Imagery)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card: The Booth */}
          <div className="bg-surface-secondary border-t-4 border-booth-violet flex flex-col justify-between" style={{ minHeight: '400px', borderRadius: '2px' }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/the-booth.png" alt="The Booth Studio" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-foundry-concrete bg-foundry-black/80 px-2 py-1 border border-booth-violet/50" style={{ borderRadius: '2px' }}>
                  THE BOOTH
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-foundry-concrete uppercase">Soundproof Music Suite</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  Equipped with focal monitors, high-end tube preamps, and solid rockwool isolation. Built for pristine multi-track recordings.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <span className="font-mono text-sm text-foundry-concrete">₦15,000 / hr</span>
                <button className="px-4 py-2 border-2 border-booth-violet bg-transparent text-booth-violet font-mono text-xs uppercase tracking-wider hover:bg-booth-violet hover:text-foundry-concrete transition-all duration-150" style={{ borderRadius: '2px' }}>
                  BOOK SUITE
                </button>
              </div>
            </div>
          </div>

          {/* Card: The Line */}
          <div className="bg-surface-secondary border-t-4 border-line-red flex flex-col justify-between" style={{ minHeight: '400px', borderRadius: '2px' }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/the-line.png" alt="The Line Production" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-foundry-concrete bg-foundry-black/80 px-2 py-1 border border-line-red/50" style={{ borderRadius: '2px' }}>
                  THE LINE
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-foundry-concrete uppercase">Custom T-Shirt Run</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  Premium screen-printed merchandise using heavyweight blanks. Setup for crisp multi-color vector prints.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <span className="font-mono text-sm text-foundry-concrete">From ₦3,500 / unit</span>
                <button className="px-4 py-2 border-2 border-line-red bg-transparent text-line-red font-mono text-xs uppercase tracking-wider hover:bg-line-red hover:text-foundry-concrete transition-all duration-150" style={{ borderRadius: '2px' }}>
                  GET QUOTE
                </button>
              </div>
            </div>
          </div>

          {/* Card: The Roast */}
          <div className="bg-surface-secondary border-t-4 border-roast-caramel flex flex-col justify-between" style={{ minHeight: '400px', borderRadius: '2px' }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/the-roast.png" alt="The Roast Coffee Roaster" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-foundry-concrete bg-foundry-black/80 px-2 py-1 border border-roast-caramel/50" style={{ borderRadius: '2px' }}>
                  THE ROAST
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-foundry-concrete uppercase">Weekly Roast Batch</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  Single-origin Ethiopian Yirgacheffe, natural wash process. Roasted on our custom built floor roaster for a clean finish.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <span className="font-mono text-sm text-foundry-concrete">₦6,500 / bag</span>
                <button className="px-4 py-2 border-2 border-roast-caramel bg-transparent text-roast-caramel font-mono text-xs uppercase tracking-wider hover:bg-roast-caramel hover:text-foundry-concrete transition-all duration-150" style={{ borderRadius: '2px' }}>
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPONENTS & INPUT FIELDS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">05 / COMPONENTS & POLISH</span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-foundry-concrete">Input Fields & Buttons</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-secondary p-8 border border-border-subtle" style={{ borderRadius: '2px' }}>
          {/* Buttons */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg uppercase text-foundry-concrete">Buttons</h4>
            <div className="flex flex-wrap gap-4">
              <button className="btn-foundry">
                PRIMARY BUTTON
              </button>
              <button className="btn-foundry-outline">
                OUTLINE BUTTON
              </button>
              <button className="btn-foundry-dark">
                DARK BUTTON
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg uppercase text-foundry-concrete">Inputs</h4>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium text-text-secondary mb-2">
                  FULL NAME
                </label>
                <input type="text" className="input-foundry" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foundry-orange mb-2">
                  FOCUS STATE EXAMPLE (ACTIVE UNIT)
                </label>
                <input type="text" className="input-foundry border-foundry-orange focus:ring-0" placeholder="Focus state shows accent border" defaultValue="Active state value" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
