import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foundry — Raw talent. Real output. One floor.',
  description:
    'A Lagos creative-economy production floor: book a studio session, order custom merch, or subscribe to specialty coffee.',
};

/* ─── ASYMMETRIC HERO ─── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Large type */}
          <div className="animate-slide-in-left lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange px-2 py-1 border border-foundry-orange" style={{ borderRadius: '2px' }}>
                LAGOS · EST. 2024
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.9] text-foundry-concrete">
              Raw talent.<br />
              Real output.<br />
              <span className="text-foundry-orange">One floor.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed font-body">
              Three production units operating under one roof in Lagos. Record your audio, print your custom merchandise, and brew single-origin coffee. Welcome to the workspace.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/the-booth" className="btn-foundry">
                BOOK A SESSION
              </Link>
              <Link href="/the-line" className="btn-foundry-outline">
                GET A QUOTE
              </Link>
            </div>
          </div>

          {/* Right: Textured/duotone visual block */}
          <div className="relative animate-slide-in-right lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[3/4] w-full">
              {/* Sharp geometric card with single top border and real image */}
              <div
                className="absolute inset-0 bg-surface-tertiary border-t-4 border-foundry-orange overflow-hidden flex flex-col justify-end"
                style={{ borderRadius: '2px' }}
              >
                {/* Real imagery for hero */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/the-booth.png"
                  alt="Foundry Collective Production Floor"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale contrast-125 mix-blend-luminosity"
                />
                
                {/* Halftone dot overlay pattern */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,75,18,0.2) 1px, transparent 1.5px)`,
                    backgroundSize: '10px 10px',
                  }}
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-foundry-black via-transparent to-transparent opacity-80" />

                {/* Text stamp */}
                <div className="relative p-8 space-y-3 z-10">
                  <div className="font-display text-4xl font-bold text-foundry-concrete uppercase tracking-tight">
                    Creative Factory
                  </div>
                  <div className="font-mono text-xs text-foundry-orange uppercase tracking-[0.2em]">
                    RECORD · PRINT · BREW
                  </div>
                </div>
              </div>

              {/* Hard stamp-shadow offsets */}
              <div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-foundry-orange -z-10"
                style={{ borderRadius: '2px' }}
              />
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-foundry-orange/20 -z-10"
                style={{ borderRadius: '2px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── THREE UNITS, ONE FLOOR — STAGGERED GRID ─── */
function UnitsSection() {
  const units = [
    {
      key: 'the_booth',
      name: 'The Booth',
      slug: '/the-booth',
      tagline: 'Record. Capture. Create.',
      description:
        'Soundproof podcast suites, recording rooms, and photo/video studios. Fully equipped for professional creators.',
      cta: 'BOOK A SESSION',
      color: '#7B2FF7',
      borderClass: 'border-t-booth-violet',
      textClass: 'text-booth-violet',
      image: '/images/the-booth.png',
      features: ['3 calibrated acoustics suites', 'From ₦15,000/hr base rate', 'Pro gear & operator options'],
    },
    {
      key: 'the_line',
      name: 'The Line',
      slug: '/the-line',
      tagline: 'Design. Print. Ship.',
      description:
        'Premium screen-printed apparel, custom hoodies, stickers, posters, and collateral. Structured volume pricing.',
      cta: 'GET A QUOTE',
      color: '#E4002B',
      borderClass: 'border-t-line-red',
      textClass: 'text-line-red',
      image: '/images/the-line.png',
      features: ['Heavyweight cotton blanks', 'Crisp halftone vector prints', 'Bulk tiers & fast turnaround'],
    },
    {
      key: 'the_roast',
      name: 'The Roast',
      slug: '/the-roast',
      tagline: 'Source. Roast. Subscribe.',
      description:
        'Specialty micro-roastery and espresso bar. Fresh seasonal single-origin deliveries straight to your door.',
      cta: 'START SUBSCRIPTION',
      color: '#C08A3E',
      borderClass: 'border-t-roast-caramel',
      textClass: 'text-roast-caramel',
      image: '/images/the-roast.png',
      features: ['Micro-batch roasted weekly', 'Tailored grind & origin selections', 'Lagos-wide express delivery'],
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-surface-primary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange block mb-3 font-semibold">
            01 / PRODUCTION DEPARTMENTS
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foundry-concrete tracking-tight">
            Three units. One floor.
          </h2>
        </div>

        {/* Staggered grid */}
        <div className="staggered-grid">
          {units.map((unit) => (
            <Link
              key={unit.key}
              href={unit.slug}
              className={`group flex flex-col justify-between bg-surface-secondary border-t-4 ${unit.borderClass} transition-all duration-150 hover:shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5`}
              style={{ borderRadius: '2px', minHeight: '460px' }}
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-tertiary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest bg-foundry-black/90 px-2.5 py-1 border"
                    style={{ color: unit.color, borderColor: unit.color, borderRadius: '2px' }}
                  >
                    {unit.name}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-2xl text-foundry-concrete leading-none uppercase tracking-tight">
                    {unit.tagline}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                {/* Features (IBM Plex Sans for readability, not mono) */}
                <ul className="space-y-2 border-t border-border-subtle pt-4">
                  {unit.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 flex-shrink-0"
                        style={{ backgroundColor: unit.color }}
                      />
                      <span className="font-body text-xs text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA (Mono, uppercase, short) */}
                <div
                  className="font-mono text-xs font-bold uppercase tracking-widest pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-150"
                  style={{ color: unit.color }}
                >
                  {unit.cta} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS TICKET-STUB STRIP ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      author: 'Tola Adesanya',
      role: 'Podcast Host, "The Lagos Frequency"',
      content:
        'We recorded our entire first season at The Booth. The acoustic treatment is serious, the gear is top-tier, and the team actually cares about your output.',
      unit: 'The Booth',
      unitColor: '#7B2FF7',
    },
    {
      author: 'Chidi Okonkwo',
      role: 'Founder, BLVCK MRKTS Streetwear',
      content:
        'We ran 200 custom hoodies through The Line for our pop-up launch. Quality was flawless, turnaround was 5 days, and the bulk pricing made our margins work.',
      unit: 'The Line',
      unitColor: '#E4002B',
    },
    {
      author: 'Amara Eze',
      role: 'Creative Director, Studio Nomad',
      content:
        "The Roast's subscription is the one thing I haven't cancelled in two years. The Lagos Sunrise Blend is legitimately the best coffee I've had in Nigeria.",
      unit: 'The Roast',
      unitColor: '#C08A3E',
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-surface-secondary border-t border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange block mb-3 font-semibold">
            02 / CLIENT FEEDBACK
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">
            What they&apos;re saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-surface-primary p-8 flex flex-col justify-between"
              style={{ borderTop: `4px solid ${t.unitColor}`, borderRadius: '2px', minHeight: '280px' }}
            >
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border" style={{ color: t.unitColor, borderColor: t.unitColor, borderRadius: '2px' }}>
                    {t.unit}
                  </span>
                </div>
                <p className="font-body text-base text-text-primary leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="border-t border-border-subtle pt-4 mt-6">
                <p className="font-display font-bold text-sm text-foundry-concrete">
                  {t.author}
                </p>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAKER'S ROW COMING SOON TEASER ─── */
function MakersRowTeaser() {
  const comingSoon = [
    { name: 'The Deck', description: 'Indoor skate & BMX park', label: 'Q2 2027', color: '#00C9A7' },
    { name: 'The Crate', description: 'Vinyl records & listening bar', label: 'Q3 2027', color: '#FFB347' },
    { name: 'The Bay', description: 'Community bike repair co-op', label: 'Q4 2027', color: '#4ECDC4' },
  ];

  return (
    <section className="py-24 lg:py-40 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange block mb-3 font-semibold">
              03 / FUTURE EXPANSIONS
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">
              Maker&apos;s Row
            </h2>
          </div>
          <div>
            <Link href="/makers-row" className="btn-foundry-outline">
              NOTIFY ME
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {comingSoon.map((unit) => (
            <div
              key={unit.name}
              className="bg-surface-secondary p-8 relative overflow-hidden group flex flex-col justify-between"
              style={{ borderTop: `4px solid ${unit.color}`, borderRadius: '2px', minHeight: '220px' }}
            >
              <div className="space-y-4">
                <div
                  className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 inline-block border"
                  style={{ color: unit.color, borderColor: unit.color, borderRadius: '2px' }}
                >
                  {unit.label}
                </div>
                <h3 className="font-display font-bold text-2xl text-foundry-concrete uppercase tracking-tight">
                  {unit.name}
                </h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{unit.description}</p>
              </div>

              {/* Diagonal stripe accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none"
                style={{
                  background: `repeating-linear-gradient(-45deg, ${unit.color}, ${unit.color} 2px, transparent 2px, transparent 8px)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ─── */
function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-foundry-orange border-t-2 border-b-2 border-foundry-black">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foundry-black tracking-tight uppercase">
          Ready to make something?
        </h2>
        <p className="font-body text-lg sm:text-xl text-foundry-black/85 max-w-2xl mx-auto leading-relaxed">
          Whether it&apos;s a podcast episode, a custom run of merch for your brand, or a fresh bag of properly roasted coffee beans — the floor is open.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/the-booth" className="btn-foundry-dark">
            BOOK A SESSION
          </Link>
          <Link href="/the-line" className="btn-foundry-dark">
            GET A QUOTE
          </Link>
          <Link href="/the-roast" className="btn-foundry-dark">
            START SUBSCRIPTION
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="bg-surface-primary">
      <HeroSection />
      <UnitsSection />
      <TestimonialsSection />
      <MakersRowTeaser />
      <CTASection />
    </div>
  );
}
