'use client';

import { useState, useMemo } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  origin: string;
  roast_level: 'light' | 'medium' | 'dark' | 'espresso';
  price: number;
  category: string;
  is_featured: boolean;
}

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function RoastClient({ menuItems }: { menuItems: MenuItem[] }) {
  const [plan, setPlan] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');
  const [bagSize, setBagSize] = useState<'250g' | '500g' | '1kg'>('250g');
  const [grindType, setGrindType] = useState<'whole_bean' | 'french_press' | 'filter' | 'espresso' | 'moka_pot'>('whole_bean');
  const [preferredRoast, setPreferredRoast] = useState<'light' | 'medium' | 'dark' | 'surprise_me'>('surprise_me');

  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  // Simple pricing algorithm
  const subscriptionPrice = useMemo(() => {
    let base = 6500; // Base bag price
    if (bagSize === '500g') base = 12000;
    if (bagSize === '1kg') base = 22000;

    let discount = 1;
    if (plan === 'weekly') discount = 0.85; // 15% off
    if (plan === 'biweekly') discount = 0.90; // 10% off

    return Math.round(base * discount);
  }, [bagSize, plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-roast-caramel border-2 border-foundry-black mx-auto mb-6 flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EDEBE6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-4">Subscription Started</h2>
          <p className="text-text-secondary mb-6">We have received your subscription setup! We will send details to confirm your delivery schedule via WhatsApp.</p>
          <button onClick={() => setSubmitted(false)} className="btn-foundry" style={{ backgroundColor: '#C08A3E' }}>Manage Subscription</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-primary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag-unit text-roast-caramel border-roast-caramel mb-4">The Roast</div>
              <h1 className="heading-foundry text-5xl lg:text-6xl text-foundry-concrete mb-4">
                Fresh roast.<br /><span className="text-roast-caramel">Direct to your door.</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-md mb-8">Specialty coffee beans sourced ethically and roasted weekly on our Lagos production floor.</p>
              <a href="#subscribe-now" className="btn-foundry" style={{ backgroundColor: '#C08A3E' }}>Start Subscription</a>
            </div>
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-surface-tertiary border-2 border-roast-caramel overflow-hidden" style={{ clipPath: 'polygon(0 5%, 95% 0, 100% 95%, 95% 100%, 0 95%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-roast-caramel/20 via-transparent to-foundry-black/60" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(192,138,62,0.12) 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#C08A3E" strokeWidth="1.5" opacity="0.5"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-foundry max-w-7xl mx-auto" />

      {/* Featured Menu */}
      <section className="py-16 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-roast-caramel block mb-3">Fresh Batches</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-10">Our coffee lineup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-6 border-2 border-border-subtle bg-surface-secondary flex flex-col justify-between"
                style={{ borderRadius: '2px' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-roast-caramel uppercase tracking-widest">{item.origin}</span>
                    <span className="label-mono text-text-secondary px-2 py-0.5 bg-surface-tertiary border border-border-subtle">{item.roast_level} roast</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foundry-concrete uppercase mb-2">{item.name}</h3>
                  <p className="text-sm text-text-secondary mb-6">{item.description}</p>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-border-subtle">
                  <span className="label-mono text-text-secondary">Retail Bag</span>
                  <span className="price-mono text-xl text-roast-caramel">{formatNaira(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Configurator */}
      <section id="subscribe-now" className="py-16 bg-surface-secondary border-t-2 border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-roast-caramel block mb-3">Configure Subscription</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-8">Coffee Subscription</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Selections */}
            <div className="space-y-6">
              {/* Frequency selection */}
              <div>
                <label className="input-label">Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['weekly', 'biweekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setPlan(freq)}
                      className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                        plan === freq
                          ? 'border-roast-caramel bg-roast-caramel/10 text-foundry-concrete'
                          : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-roast-caramel/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bag size */}
              <div>
                <label className="input-label">Bag Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['250g', '500g', '1kg'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setBagSize(size)}
                      className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                        bagSize === size
                          ? 'border-roast-caramel bg-roast-caramel/10 text-foundry-concrete'
                          : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-roast-caramel/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind type */}
              <div>
                <label className="input-label">Grind Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['whole_bean', 'french_press', 'filter', 'espresso', 'moka_pot'] as const).map((grind) => (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setGrindType(grind)}
                      className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                        grindType === grind
                          ? 'border-roast-caramel bg-roast-caramel/10 text-foundry-concrete'
                          : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-roast-caramel/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {grind.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred roast */}
              <div>
                <label className="input-label">Preferred Roast profile</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['light', 'medium', 'dark', 'surprise_me'] as const).map((roast) => (
                    <button
                      key={roast}
                      type="button"
                      onClick={() => setPreferredRoast(roast)}
                      className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                        preferredRoast === roast
                          ? 'border-roast-caramel bg-roast-caramel/10 text-foundry-concrete'
                          : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-roast-caramel/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {roast.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Cost and Details */}
            <div className="space-y-6">
              {/* Cost card */}
              <div className="p-6 border-2 border-roast-caramel bg-surface-primary animate-count-up" style={{ borderRadius: '2px' }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="label-mono text-text-secondary">Subscription Cost</span>
                  <span className="price-mono text-3xl text-roast-caramel">{formatNaira(subscriptionPrice)}</span>
                </div>
                <div className="divider-tear" style={{ margin: '0.75rem 0' }} />
                <div className="space-y-1.5 font-mono text-xs text-text-secondary uppercase">
                  <div>Frequency: {plan}</div>
                  <div>Bag Size: {bagSize}</div>
                  <div>Grind: {grindType.replace('_', ' ')}</div>
                  <div>Roast Style: {preferredRoast.replace('_', ' ')}</div>
                </div>
              </div>

              {/* Subscribe form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="input-label">Full Name *</label>
                  <input type="text" required className="input-foundry" placeholder="Your name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Phone *</label>
                    <input type="tel" required className="input-foundry" placeholder="+234..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="input-label">Email</label>
                    <input type="email" className="input-foundry" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="input-label">Delivery Address *</label>
                  <textarea required rows={2} className="input-foundry" placeholder="Where should we deliver?" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <button type="submit" className="btn-foundry w-full" style={{ backgroundColor: '#C08A3E' }}>Start Subscription</button>
                <p className="font-mono text-[10px] text-text-secondary text-center uppercase tracking-wider">Free delivery in central Lagos. Cancel anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
