import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Foundry — Raw talent. Real output. One floor.',
    template: '%s | Foundry',
  },
};

/* ─── TICKER STRIP ─── */
function TickerStrip() {
  const items = [
    'NOW BOOKING THE BOOTH',
    'FRESH ROAST DROPS FRIDAY',
    'NEW PRINT RUN OPEN',
    'PODCAST ROOM AVAILABLE',
    'CUSTOM MERCH FROM ₦3,500',
    'SUBSCRIBE TO THE ROAST',
    'THE DECK COMING Q2 2027',
    'STUDIO SESSIONS DAILY',
  ];

  // Duplicate for seamless loop
  const tickerContent = [...items, ...items];

  return (
    <div className="ticker-strip">
      <div className="ticker-content">
        {tickerContent.map((item, i) => (
          <span key={i}>{item} ·</span>
        ))}
      </div>
    </div>
  );
}

/* ─── HEADER ─── */
function FloorHeader() {
  return (
    <header className="sticky top-0 z-40 bg-foundry-black border-b-2 border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-foundry-orange border-2 border-foundry-black flex items-center justify-center" style={{ borderRadius: '2px' }}>
              <span className="font-display font-bold text-foundry-black text-sm">F</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foundry-concrete uppercase">
              Foundry
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {[
              { href: '/the-booth', label: 'The Booth', color: 'text-booth-violet' },
              { href: '/the-line', label: 'The Line', color: 'text-line-red' },
              { href: '/the-roast', label: 'The Roast', color: 'text-roast-caramel' },
              { href: '/makers-row', label: "Maker's Row" },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 font-body text-sm uppercase tracking-wider font-semibold transition-colors duration-150 hover:text-foundry-orange ${
                  link.color || 'text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foundry-concrete"
            aria-label="Open menu"
            id="mobile-menu-toggle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── FOOTER ─── */
function FloorFooter() {
  return (
    <footer className="bg-surface-secondary border-t-2 border-border-subtle">
      {/* Tear-line divider */}
      <div className="divider-tear" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foundry-orange border-2 border-foundry-black flex items-center justify-center" style={{ borderRadius: '2px' }}>
                <span className="font-display font-bold text-foundry-black text-sm">F</span>
              </div>
              <span className="font-display font-bold text-xl uppercase text-foundry-concrete">
                Foundry
              </span>
            </div>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-wide mb-4">
              Raw talent. Real output. One floor.
            </p>
            <p className="text-sm text-text-secondary">
              A creative-economy production floor in Lagos.
            </p>
          </div>

          {/* Units */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foundry-orange mb-4 font-bold">
              The Floor
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/the-booth', label: 'The Booth', sub: 'Studio Rentals' },
                { href: '/the-line', label: 'The Line', sub: 'Print & Merch' },
                { href: '/the-roast', label: 'The Roast', sub: 'Coffee & Subscriptions' },
                { href: '/makers-row', label: "Maker's Row", sub: 'Coming Soon' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-primary hover:text-foundry-orange transition-colors duration-150">
                    {link.label}
                  </Link>
                  <span className="block font-mono text-[10px] text-text-secondary uppercase">
                    {link.sub}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours per unit */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foundry-orange mb-4 font-bold">
              Hours
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-mono text-xs text-booth-violet uppercase font-bold">The Booth</span>
                <p className="text-sm text-text-secondary">Mon–Sat: 8AM–10PM</p>
              </div>
              <div>
                <span className="font-mono text-xs text-line-red uppercase font-bold">The Line</span>
                <p className="text-sm text-text-secondary">Mon–Fri: 9AM–6PM</p>
              </div>
              <div>
                <span className="font-mono text-xs text-roast-caramel uppercase font-bold">The Roast</span>
                <p className="text-sm text-text-secondary">Daily: 7AM–9PM</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foundry-orange mb-4 font-bold">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+2349012345678"
                className="flex items-center gap-2 text-sm text-text-primary hover:text-foundry-orange transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +234 901 234 5678
              </a>
              <a
                href="https://wa.me/2349012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-primary hover:text-[#25D366] transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link href="/contact" className="flex items-center gap-2 text-sm text-text-primary hover:text-foundry-orange transition-colors duration-150">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                hello@foundrycollective.ng
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-foundry" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">
            © {new Date().getFullYear()} Foundry Collective Limited · Lagos, Nigeria
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-mono text-[10px] text-text-secondary uppercase tracking-widest hover:text-foundry-orange transition-colors duration-150"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP FLOATING BUTTON ─── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2349012345678"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function FloorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloorHeader />
      <TickerStrip />
      <main className="min-h-screen">{children}</main>
      <FloorFooter />
      <WhatsAppButton />
    </>
  );
}
