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
    <section className="relative overflow-hidden bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Large type */}
          <div className="animate-slide-in-left">
            <div className="tag-foundry mb-6">Lagos · Est. 2024</div>
            <h1 className="heading-foundry text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foundry-concrete mb-6">
              Raw<br />
              talent.<br />
              <span className="text-foundry-orange">Real output.</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-md mb-8 font-body">
              Three production units under one roof — record it, print it, brew it.
              Welcome to the floor.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/the-booth" className="btn-foundry">
                Book a Session
              </Link>
              <Link href="/the-line" className="btn-foundry-outline">
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Right: Textured/duotone visual block */}
          <div className="relative animate-slide-in-right">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              {/* Diagonal-cut container */}
              <div
                className="absolute inset-0 bg-surface-tertiary border-2 border-border-subtle overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%, 0 8%)',
                }}
              >
                {/* Halftone texture pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-foundry-orange/20 via-transparent to-booth-violet/20" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,75,18,0.15) 1px, transparent 1px)`,
                    backgroundSize: '8px 8px',
                  }}
                />
                {/* Content inside the shape */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Stencil-style graphic elements */}
                  <div className="space-y-6 text-center">
                    <div className="flex items-center justify-center gap-4">
                      {/* Mic icon (The Booth) */}
                      <div className="w-16 h-16 border-3 border-booth-violet flex items-center justify-center" style={{ borderRadius: '2px', borderWidth: '3px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B2FF7" strokeWidth="2.5" strokeLinecap="square">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                          <line x1="12" y1="19" x2="12" y2="23"/>
                          <line x1="8" y1="23" x2="16" y2="23"/>
                        </svg>
                      </div>
                      {/* Printer icon (The Line) */}
                      <div className="w-16 h-16 border-3 border-line-red flex items-center justify-center" style={{ borderRadius: '2px', borderWidth: '3px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E4002B" strokeWidth="2.5" strokeLinecap="square">
                          <polyline points="6 9 6 2 18 2 18 9"/>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                          <rect x="6" y="14" width="12" height="8"/>
                        </svg>
                      </div>
                      {/* Coffee icon (The Roast) */}
                      <div className="w-16 h-16 border-3 border-roast-caramel flex items-center justify-center" style={{ borderRadius: '2px', borderWidth: '3px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C08A3E" strokeWidth="2.5" strokeLinecap="square">
                          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                          <line x1="6" y1="2" x2="6" y2="4"/>
                          <line x1="10" y1="2" x2="10" y2="4"/>
                          <line x1="14" y1="2" x2="14" y2="4"/>
                        </svg>
                      </div>
                    </div>

                    <div className="font-display text-4xl lg:text-5xl font-bold text-foundry-concrete uppercase tracking-tight">
                      One Floor
                    </div>

                    <div className="font-mono text-xs text-text-secondary uppercase tracking-[0.2em]">
                      Record · Print · Brew
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stamp-shadow accent blocks */}
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-foundry-orange border-2 border-foundry-black"
                style={{ borderRadius: '2px' }}
              />
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-booth-violet"
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
        'Podcast rooms, music suites, and photo/video studios — booked by the hour, equipped for professionals.',
      cta: 'Book a Session',
      color: '#7B2FF7',
      borderClass: 'border-booth-violet',
      textClass: 'text-booth-violet',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
      features: ['3 studio spaces', 'From ₦15,000/hr', 'Pro equipment included'],
    },
    {
      key: 'the_line',
      name: 'The Line',
      slug: '/the-line',
      tagline: 'Design. Print. Ship.',
      description:
        'Custom t-shirts, hoodies, stickers, business cards, and posters — bulk pricing that rewards volume.',
      cta: 'Get a Quote',
      color: '#E4002B',
      borderClass: 'border-line-red',
      textClass: 'text-line-red',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
      ),
      features: ['5 product types', 'Bulk discounts', 'Design file upload'],
    },
    {
      key: 'the_roast',
      name: 'The Roast',
      slug: '/the-roast',
      tagline: 'Source. Roast. Subscribe.',
      description:
        'Specialty coffee roastery, café bar, and subscription bags — from bean to cup, done properly.',
      cta: 'Start Subscription',
      color: '#C08A3E',
      borderClass: 'border-roast-caramel',
      textClass: 'text-roast-caramel',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
          <line x1="6" y1="2" x2="6" y2="4"/>
          <line x1="10" y1="2" x2="10" y2="4"/>
          <line x1="14" y1="2" x2="14" y2="4"/>
        </svg>
      ),
      features: ['Specialty beans', 'Weekly/monthly plans', 'Café & wholesale'],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="label-mono text-foundry-orange block mb-3">What We Do</span>
          <h2 className="heading-foundry text-4xl sm:text-5xl text-foundry-concrete">
            Three units.<br />
            <span className="text-foundry-orange">One floor.</span>
          </h2>
        </div>

        {/* Staggered grid */}
        <div className="staggered-grid">
          {units.map((unit) => (
            <Link
              key={unit.key}
              href={unit.slug}
              className={`group block bg-surface-secondary border-2 ${unit.borderClass} p-6 lg:p-8 transition-all duration-150 hover:shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5`}
              style={{ borderRadius: '2px' }}
            >
              {/* Icon */}
              <div className={`${unit.textClass} mb-6`}>{unit.icon}</div>

              {/* Unit tag */}
              <div
                className="tag-unit mb-4"
                style={{ color: unit.color, borderColor: unit.color }}
              >
                {unit.name}
              </div>

              {/* Tagline */}
              <h3 className="heading-foundry text-2xl text-foundry-concrete mb-3">
                {unit.tagline}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                {unit.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {unit.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 flex-shrink-0"
                      style={{ backgroundColor: unit.color }}
                    />
                    <span className="font-mono text-xs text-text-secondary uppercase">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                className="font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-150"
                style={{ color: unit.color }}
              >
                {unit.cta} →
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
    <section className="py-20 bg-surface-secondary border-t-2 border-b-2 border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-mono text-foundry-orange block mb-3">From the Floor</span>
        <h2 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete mb-12">
          What they're saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="ticket-stub"
              style={{ borderLeftColor: t.unitColor }}
            >
              <div className="tag-unit mb-4" style={{ color: t.unitColor, borderColor: t.unitColor }}>
                {t.unit}
              </div>
              <p className="text-sm text-text-primary mb-6 leading-relaxed italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="divider-tear" style={{ margin: '1rem 0' }} />
              <div>
                <p className="font-display font-bold text-sm text-foundry-concrete">
                  {t.author}
                </p>
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
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
    <section className="py-20 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="label-mono text-foundry-orange block mb-3">Coming Soon</span>
            <h2 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">
              Maker&apos;s Row
            </h2>
          </div>
          <Link href="/makers-row" className="btn-foundry-outline text-sm">
            Notify Me
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {comingSoon.map((unit) => (
            <div
              key={unit.name}
              className="border-2 border-border-subtle bg-surface-secondary p-6 relative overflow-hidden group"
              style={{ borderRadius: '2px' }}
            >
              {/* Coming soon tag */}
              <div
                className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 px-2 py-1 inline-block border"
                style={{ color: unit.color, borderColor: unit.color }}
              >
                {unit.label}
              </div>
              <h3
                className="heading-foundry text-xl mb-2"
                style={{ color: unit.color }}
              >
                {unit.name}
              </h3>
              <p className="text-sm text-text-secondary">{unit.description}</p>

              {/* Diagonal stripe accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10"
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
    <section className="py-20 bg-foundry-orange border-t-2 border-b-2 border-foundry-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-foundry text-4xl sm:text-5xl text-foundry-black mb-6">
          Ready to make something?
        </h2>
        <p className="text-lg text-foundry-black/80 mb-8 max-w-2xl mx-auto">
          Whether it&apos;s a podcast episode, a run of merch for your brand, or a bag of properly roasted coffee — the floor is open.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/the-booth" className="btn-foundry-dark">
            Book a Session
          </Link>
          <Link href="/the-line" className="btn-foundry-dark">
            Get a Quote
          </Link>
          <Link href="/the-roast" className="btn-foundry-dark">
            Start Subscription
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UnitsSection />
      <TestimonialsSection />
      <MakersRowTeaser />
      <CTASection />
    </>
  );
}
