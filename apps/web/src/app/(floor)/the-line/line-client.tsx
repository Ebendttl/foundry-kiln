'use client';

import { useState, useMemo } from 'react';

interface PriceBreak { min_qty: number; price: number; }
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  base_price: number;
  price_breaks: PriceBreak[];
}

function formatNaira(n: number) { return `₦${n.toLocaleString('en-NG')}`; }

function getUnitPrice(product: Product, qty: number): number {
  let price = product.base_price;
  for (const tier of product.price_breaks) {
    if (qty >= tier.min_qty) price = tier.price;
  }
  return price;
}

const CATEGORY_LABELS: Record<string, string> = {
  tshirt: 'T-Shirts',
  hoodie: 'Hoodies',
  sticker: 'Stickers',
  business_card: 'Business Cards',
  poster: 'Posters',
};

export default function LineClient({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(10);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const unitPrice = useMemo(() => selectedProduct ? getUnitPrice(selectedProduct, quantity) : 0, [selectedProduct, quantity]);
  const totalPrice = unitPrice * quantity;

  // Determine which tier is active for the visual indicator
  const activeTierIndex = useMemo(() => {
    if (!selectedProduct) return -1;
    let idx = -1;
    for (let i = 0; i < selectedProduct.price_breaks.length; i++) {
      if (quantity >= selectedProduct.price_breaks[i]!.min_qty) idx = i;
    }
    return idx;
  }, [selectedProduct, quantity]);

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-surface-primary py-24">
        <div className="text-center max-w-md mx-auto px-6 space-y-6">
          <div className="w-16 h-16 bg-line-red border-2 border-foundry-black mx-auto flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EDEBE6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="font-display font-bold text-3xl text-foundry-concrete uppercase">Quote Request Sent</h2>
          <p className="font-body text-base text-text-secondary">We&apos;ll get back to you with a finalized digital invoice and proof mockup within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setSelectedProduct(null); setQuantity(10); }} className="btn-foundry" style={{ backgroundColor: '#E4002B', color: '#fff', borderColor: '#E4002B' }}>
            GET ANOTHER QUOTE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-primary">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-line-red px-2.5 py-1 border border-line-red" style={{ borderRadius: '2px' }}>
                  THE LINE
                </span>
              </div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.9] text-foundry-concrete">
                Your design.<br /><span className="text-line-red">Our production floor.</span>
              </h1>
              <p className="font-body text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
                Custom screen-printed apparel, heavy cotton hoodies, die-cut sticker sheets, business cards, and display posters. Engineered for volume runs.
              </p>
              <div className="pt-4">
                <a href="#pricing-calculator" className="btn-foundry" style={{ backgroundColor: '#E4002B', color: '#fff', borderColor: '#E4002B' }}>
                  CALCULATE PRICING
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-surface-tertiary border-t-4 border-line-red overflow-hidden" style={{ borderRadius: '2px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-line.png"
                    alt="The Line Printing Workshop"
                    className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foundry-black via-transparent to-transparent opacity-80" />
                  
                  {/* Halftone Dot Overlay Pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(228,0,43,0.15) 1.5px, transparent 1.5px)`,
                      backgroundSize: '8px 8px',
                    }}
                  />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="font-mono text-[10px] text-line-red uppercase tracking-widest bg-foundry-black/90 px-2 py-0.5 border border-line-red/30" style={{ borderRadius: '2px' }}>
                      MERCH RUN (APPAREL)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <hr className="border-border-subtle" />
      </div>

      {/* Product Grid */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-line-red block mb-3 font-semibold">01 / MERCHANDISE CATALOG</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">What We Print</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => { setSelectedProduct(product); setQuantity(product.price_breaks[0]?.min_qty || 10); }}
                className={`text-left flex flex-col justify-between bg-surface-secondary border-t-4 transition-all duration-150 ${
                  selectedProduct?.id === product.id
                    ? 'border-t-line-red shadow-stamp-red bg-surface-tertiary -translate-x-0.5 -translate-y-0.5'
                    : 'border-t-border-subtle hover:border-t-line-red/55'
                }`}
                style={{ borderRadius: '2px', minHeight: '380px' }}
              >
                {/* Image top container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-tertiary border-b border-border-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-line.png"
                    alt={product.name}
                    className="w-full h-full object-cover filter brightness-[0.7] grayscale contrast-110"
                  />
                  <div className="absolute top-4 left-4 bg-foundry-black/90 px-2.5 py-0.5 border border-border-subtle" style={{ borderRadius: '2px' }}>
                    <span className="font-mono text-[9px] text-line-red uppercase tracking-wider">{CATEGORY_LABELS[product.category] || product.category}</span>
                  </div>
                </div>

                {/* Content text */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-foundry-concrete uppercase tracking-tight">{product.name}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-baseline gap-2 border-t border-border-subtle pt-4">
                    <span className="font-mono text-[10px] text-text-secondary uppercase">From</span>
                    <span className="font-mono font-bold text-xl text-line-red">{formatNaira(product.price_breaks[product.price_breaks.length - 1]?.price || product.base_price)}</span>
                    <span className="font-mono text-[10px] text-text-secondary uppercase">/ unit</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Pricing Calculator */}
      <section id="pricing-calculator" className="py-24 lg:py-40 bg-surface-secondary border-t border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-line-red block mb-3 font-semibold">02 / CALCULATE DISCOUNTS</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">Bulk Order Builder</h2>
          </div>

          {!selectedProduct ? (
            <div className="border-2 border-dashed border-border-subtle p-16 text-center bg-surface-primary" style={{ borderRadius: '2px' }}>
              <p className="text-text-secondary font-body text-base">Select a product model above to initialize the live pricing calculator.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-surface-primary p-6 lg:p-8 border-t-4 border-line-red" style={{ borderRadius: '2px' }}>
              {/* Left: Controls */}
              <div className="space-y-6">
                <div className="p-5 border-t-4 border-line-red bg-surface-secondary" style={{ borderRadius: '2px' }}>
                  <div className="font-display font-bold text-lg text-foundry-concrete uppercase tracking-tight">{selectedProduct.name}</div>
                  <div className="font-mono text-xs text-text-secondary uppercase mt-1">{CATEGORY_LABELS[selectedProduct.category]} PRODUCTION</div>
                </div>

                {/* Quantity slider */}
                <div className="space-y-3">
                  <label className="block font-body text-sm font-semibold text-text-secondary">Quantity</label>
                  <input
                    type="range"
                    min={selectedProduct.price_breaks[0]?.min_qty || 1}
                    max={Math.max(...selectedProduct.price_breaks.map(t => t.min_qty)) * 3}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full accent-[#E4002B] h-2 bg-surface-secondary rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input-foundry w-28 text-center font-mono font-bold focus:ring-2 focus:ring-line-red focus:border-line-red"
                      min={1}
                    />
                    <span className="font-mono text-xs text-text-secondary uppercase">UNITS</span>
                  </div>
                </div>

                {/* Tier ladder */}
                <div className="space-y-3">
                  <label className="block font-body text-sm font-semibold text-text-secondary">Bulk Discount Tiers</label>
                  <div className="space-y-2">
                    {selectedProduct.price_breaks.map((tier, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 border-t-4 transition-all duration-150 ${
                          i === activeTierIndex
                            ? 'border-t-line-red bg-line-red/10 shadow-stamp-sm -translate-x-px -translate-y-px'
                            : 'border-t-border-subtle bg-surface-secondary'
                        }`}
                        style={{ borderRadius: '2px' }}
                      >
                        <div className="flex items-center gap-3">
                          {i === activeTierIndex && <span className="w-2 h-2 bg-line-red" style={{ borderRadius: '1px' }} />}
                          <span className="font-mono text-xs text-text-secondary">
                            {tier.min_qty}+ units
                          </span>
                        </div>
                        <span className={`font-mono text-sm ${i === activeTierIndex ? 'text-line-red font-bold' : 'text-text-secondary'}`}>
                          {formatNaira(tier.price)}/unit
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Live total + form */}
              <div className="space-y-8">
                {/* Price summary */}
                <div className="p-6 border-t-4 border-line-red bg-surface-secondary" style={{ borderRadius: '2px' }}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block">Unit Price</span>
                      <span className="font-mono font-bold text-xl text-foundry-concrete">{formatNaira(unitPrice)}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block">Total Quantity</span>
                      <span className="font-mono font-bold text-xl text-foundry-concrete">{quantity} units</span>
                    </div>
                  </div>
                  <div className="divider-tear" style={{ margin: '0.75rem 0' }} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">Estimated Total</span>
                    <span className="font-mono font-bold text-3xl text-line-red">{formatNaira(totalPrice)}</span>
                  </div>
                  {quantity >= (selectedProduct.price_breaks[0]?.min_qty || 0) && quantity < (selectedProduct.price_breaks[selectedProduct.price_breaks.length - 1]?.min_qty || 0) && (
                    <p className="font-body text-xs text-text-secondary mt-3">
                      💡 Increase order to {selectedProduct.price_breaks[activeTierIndex + 1]?.min_qty || ''} units to unlock the next bulk discount tier.
                    </p>
                  )}
                </div>

                {/* Quote form */}
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-semibold text-text-secondary mb-2">FULL NAME *</label>
                    <input type="text" required className="input-foundry focus:ring-2 focus:ring-line-red focus:border-line-red" placeholder="Your name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-semibold text-text-secondary mb-2">PHONE *</label>
                      <input type="tel" required className="input-foundry focus:ring-2 focus:ring-line-red focus:border-line-red" placeholder="+234..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-semibold text-text-secondary mb-2">EMAIL</label>
                      <input type="email" className="input-foundry focus:ring-2 focus:ring-line-red focus:border-line-red" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-text-secondary mb-2">DESIGN NOTES</label>
                    <textarea rows={3} className="input-foundry focus:ring-2 focus:ring-line-red focus:border-line-red" placeholder="Specify ink colors, apparel blank weights, or details..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-foundry w-full text-white font-mono text-sm font-semibold tracking-wider hover:bg-white hover:text-line-red hover:border-white transition-all duration-150 py-3" style={{ backgroundColor: '#E4002B', borderColor: '#E4002B' }}>
                    SUBMIT QUOTE REQUEST
                  </button>
                  <p className="font-mono text-[10px] text-text-secondary text-center uppercase tracking-widest mt-3">We will compile your specs and respond within 24 hours</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
