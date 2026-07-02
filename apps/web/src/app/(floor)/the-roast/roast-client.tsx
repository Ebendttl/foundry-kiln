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
      <div className="min-h-[60vh] flex items-center justify-center bg-[#3B2314] py-24">
        <div className="text-center max-w-md mx-auto px-6 space-y-6">
          <div className="w-16 h-16 bg-[#C08A3E] border-2 border-foundry-black mx-auto flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B2314" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="font-display font-bold text-3xl text-foundry-concrete uppercase">Subscription Started</h2>
          <p className="font-body text-base text-[#EDEBE6]/80">We have received your coffee subscription setup. We will reach out via WhatsApp to finalize your schedules and delivery details.</p>
          <button onClick={() => setSubmitted(false)} className="btn-foundry" style={{ backgroundColor: '#C08A3E', color: '#3B2314', borderColor: '#C08A3E' }}>
            MANAGE SUBSCRIPTION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#3B2314] text-[#EDEBE6]">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#C08A3E] px-2.5 py-1 border border-[#C08A3E]" style={{ borderRadius: '2px' }}>
                  THE ROAST
                </span>
              </div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.9] text-[#EDEBE6]">
                Fresh roast.<br /><span className="text-[#C08A3E]">Direct to your door.</span>
              </h1>
              <p className="font-body text-lg sm:text-xl text-[#EDEBE6]/80 max-w-xl leading-relaxed">
                Single-origin specialty coffee beans sourced ethically and micro-roasted weekly on our Lagos production floor.
              </p>
              <div className="pt-4">
                <a href="#subscribe-now" className="btn-foundry" style={{ backgroundColor: '#C08A3E', color: '#3B2314', borderColor: '#C08A3E' }}>
                  START SUBSCRIPTION
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-[#4D311E] border-t-4 border-[#C08A3E] overflow-hidden" style={{ borderRadius: '2px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-roast.png"
                    alt="The Roast Specialty Coffee Beans"
                    className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B2314] via-transparent to-transparent opacity-80" />
                  
                  {/* Halftone Dot Overlay Pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(192,138,62,0.2) 1.5px, transparent 1.5px)`,
                      backgroundSize: '8px 8px',
                    }}
                  />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="font-mono text-[10px] text-[#C08A3E] uppercase tracking-widest bg-foundry-black/90 px-2 py-0.5 border border-[#C08A3E]/30" style={{ borderRadius: '2px' }}>
                      MICRO-ROASTED WEEKLY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <hr className="border-[#C08A3E]/20" />
      </div>

      {/* Featured Menu */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C08A3E] block mb-3 font-semibold">01 / SEASONAL BATCHES</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#EDEBE6] tracking-tight">Our Coffee Lineup</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-[#4D311E] border-t-4 border-t-[#C08A3E] transition-all duration-150"
                style={{ borderRadius: '2px', minHeight: '380px' }}
              >
                {/* Visual section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#3B2314] border-b border-[#C08A3E]/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-roast.png"
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-[0.7] grayscale contrast-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#3B2314]/90 px-2 py-0.5 border border-[#C08A3E]/30" style={{ borderRadius: '2px' }}>
                    <span className="font-mono text-[9px] text-[#C08A3E] uppercase tracking-wider">{item.roast_level} roast</span>
                  </div>
                </div>

                {/* Content text */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] text-[#C08A3E] uppercase tracking-widest">{item.origin}</div>
                    <h3 className="font-display font-bold text-xl text-[#EDEBE6] uppercase tracking-tight">{item.name}</h3>
                    <p className="font-body text-sm text-[#EDEBE6]/70 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-[#C08A3E]/20">
                    <span className="font-mono text-[10px] text-[#EDEBE6]/60 uppercase">Retail Bag</span>
                    <span className="font-mono font-bold text-xl text-[#C08A3E]">{formatNaira(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Configurator */}
      <section id="subscribe-now" className="py-24 lg:py-40 bg-[#4D311E] border-t border-b border-[#C08A3E]/20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C08A3E] block mb-3 font-semibold">02 / FLAVOR SUBSCRIPTION PROFILE</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#EDEBE6] tracking-tight">Configure Your Subscription</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#3B2314] p-6 lg:p-8 border-t-4 border-t-[#C08A3E]" style={{ borderRadius: '2px' }}>
            {/* Left Column: Selections */}
            <div className="space-y-6">
              {/* Frequency selection */}
              <div className="space-y-3">
                <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85">Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['weekly', 'biweekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setPlan(freq)}
                      className={`p-3 border-t-4 font-mono text-xs uppercase tracking-widest transition-all duration-150 ${
                        plan === freq
                          ? 'border-t-[#C08A3E] bg-[#C08A3E]/20 text-[#EDEBE6] font-bold'
                          : 'border-t-[#C08A3E]/20 bg-[#4D311E] text-[#EDEBE6]/60 hover:border-t-[#C08A3E]/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bag size */}
              <div className="space-y-3">
                <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85">Bag Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['250g', '500g', '1kg'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setBagSize(size)}
                      className={`p-3 border-t-4 font-mono text-xs uppercase tracking-widest transition-all duration-150 ${
                        bagSize === size
                          ? 'border-t-[#C08A3E] bg-[#C08A3E]/20 text-[#EDEBE6] font-bold'
                          : 'border-t-[#C08A3E]/20 bg-[#4D311E] text-[#EDEBE6]/60 hover:border-t-[#C08A3E]/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind type */}
              <div className="space-y-3">
                <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85">Grind Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['whole_bean', 'french_press', 'filter', 'espresso', 'moka_pot'] as const).map((grind) => (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setGrindType(grind)}
                      className={`p-3 border-t-4 font-mono text-[10px] uppercase tracking-wider transition-all duration-150 ${
                        grindType === grind
                          ? 'border-t-[#C08A3E] bg-[#C08A3E]/20 text-[#EDEBE6] font-bold'
                          : 'border-t-[#C08A3E]/20 bg-[#4D311E] text-[#EDEBE6]/60 hover:border-t-[#C08A3E]/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      {grind.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred roast */}
              <div className="space-y-3">
                <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85">Preferred Roast Profile</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['light', 'medium', 'dark', 'surprise_me'] as const).map((roast) => (
                    <button
                      key={roast}
                      type="button"
                      onClick={() => setPreferredRoast(roast)}
                      className={`p-3 border-t-4 font-mono text-[10px] uppercase tracking-wider transition-all duration-150 ${
                        preferredRoast === roast
                          ? 'border-t-[#C08A3E] bg-[#C08A3E]/20 text-[#EDEBE6] font-bold'
                          : 'border-t-[#C08A3E]/20 bg-[#4D311E] text-[#EDEBE6]/60 hover:border-t-[#C08A3E]/50'
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
            <div className="space-y-8">
              {/* Cost card */}
              <div className="p-6 border-t-4 border-[#C08A3E] bg-[#4D311E]" style={{ borderRadius: '2px' }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#EDEBE6]/60">Subscription Cost</span>
                  <span className="font-mono font-bold text-3xl text-[#C08A3E]">{formatNaira(subscriptionPrice)}</span>
                </div>
                <div className="divider-tear" style={{ margin: '0.75rem 0', borderColor: 'rgba(192,138,62,0.2)' }} />
                <div className="space-y-1.5 font-body text-xs text-[#EDEBE6]/85">
                  <div>Frequency: <span className="font-mono uppercase text-[#C08A3E]">{plan}</span></div>
                  <div>Bag Size: <span className="font-mono uppercase text-[#C08A3E]">{bagSize}</span></div>
                  <div>Grind Style: <span className="font-mono uppercase text-[#C08A3E]">{grindType.replace('_', ' ')}</span></div>
                  <div>Roast Preference: <span className="font-mono uppercase text-[#C08A3E]">{preferredRoast.replace('_', ' ')}</span></div>
                </div>
              </div>

              {/* Subscribe form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85 mb-2">FULL NAME *</label>
                  <input type="text" required className="input-foundry border-[#C08A3E]/30 bg-[#4D311E] text-[#EDEBE6] focus:ring-2 focus:ring-[#C08A3E] focus:border-[#C08A3E]" placeholder="Your name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85 mb-2">PHONE *</label>
                    <input type="tel" required className="input-foundry border-[#C08A3E]/30 bg-[#4D311E] text-[#EDEBE6] focus:ring-2 focus:ring-[#C08A3E] focus:border-[#C08A3E]" placeholder="+234..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85 mb-2">EMAIL</label>
                    <input type="email" className="input-foundry border-[#C08A3E]/30 bg-[#4D311E] text-[#EDEBE6] focus:ring-2 focus:ring-[#C08A3E] focus:border-[#C08A3E]" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[#EDEBE6]/85 mb-2">DELIVERY ADDRESS *</label>
                  <textarea required rows={2} className="input-foundry border-[#C08A3E]/30 bg-[#4D311E] text-[#EDEBE6] focus:ring-2 focus:ring-[#C08A3E] focus:border-[#C08A3E]" placeholder="Where should we deliver?" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <button type="submit" className="btn-foundry w-full text-[#3B2314] font-mono text-sm font-semibold tracking-wider hover:bg-[#3B2314] hover:text-[#C08A3E] hover:border-[#C08A3E] transition-all duration-150 py-3" style={{ backgroundColor: '#C08A3E', borderColor: '#C08A3E' }}>
                  START SUBSCRIPTION
                </button>
                <p className="font-mono text-[10px] text-[#EDEBE6]/50 text-center uppercase tracking-widest mt-3">Free dispatch delivery inside metropolitan Lagos. Cancel anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
