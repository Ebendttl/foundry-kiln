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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-line-red border-2 border-foundry-black mx-auto mb-6 flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EDEBE6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-4">Quote Request Sent</h2>
          <p className="text-text-secondary mb-6">We&apos;ll get back to you with a final quote within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setSelectedProduct(null); setQuantity(10); }} className="btn-foundry">Get Another Quote</button>
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
              <div className="tag-unit text-line-red border-line-red mb-4">The Line</div>
              <h1 className="heading-foundry text-5xl lg:text-6xl text-foundry-concrete mb-4">
                Your design.<br /><span className="text-line-red">Our production floor.</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-md mb-8">Custom t-shirts, hoodies, stickers, business cards, and posters — with bulk pricing that rewards volume.</p>
              <a href="#pricing-calculator" className="btn-foundry" style={{ backgroundColor: '#E4002B' }}>Get a Quote</a>
            </div>
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-surface-tertiary border-2 border-line-red overflow-hidden" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-line-red/20 via-transparent to-foundry-black/60" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(228,0,43,0.12) 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#E4002B" strokeWidth="1.5" opacity="0.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-foundry max-w-7xl mx-auto" />

      {/* Product Grid */}
      <section className="py-16 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-line-red block mb-3">Products</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-10">What we print</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => { setSelectedProduct(product); setQuantity(product.price_breaks[0]?.min_qty || 10); }}
                className={`text-left p-6 border-2 transition-all duration-150 ${
                  selectedProduct?.id === product.id
                    ? 'border-line-red shadow-stamp-red bg-surface-tertiary -translate-x-0.5 -translate-y-0.5'
                    : 'border-border-subtle bg-surface-secondary hover:border-line-red'
                }`}
                style={{ borderRadius: '2px' }}
              >
                <div className="font-mono text-[10px] text-line-red uppercase tracking-widest mb-3">{CATEGORY_LABELS[product.category] || product.category}</div>
                <h3 className="font-display font-bold text-lg text-foundry-concrete uppercase mb-2">{product.name}</h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="label-mono text-text-secondary">From</span>
                  <span className="price-mono text-xl text-line-red">{formatNaira(product.price_breaks[product.price_breaks.length - 1]?.price || product.base_price)}</span>
                  <span className="label-mono text-text-secondary">/unit</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Pricing Calculator */}
      <section id="pricing-calculator" className="py-16 bg-surface-secondary border-t-2 border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-line-red block mb-3">Pricing Calculator</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-8">Build your order</h2>

          {!selectedProduct ? (
            <div className="border-2 border-dashed border-border-subtle p-12 text-center" style={{ borderRadius: '2px' }}>
              <p className="text-text-secondary font-mono text-sm uppercase">↑ Select a product above to calculate pricing</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Controls */}
              <div className="space-y-6">
                <div className="p-5 border-2 border-line-red bg-surface-primary" style={{ borderRadius: '2px' }}>
                  <div className="font-display font-bold text-lg text-foundry-concrete uppercase mb-1">{selectedProduct.name}</div>
                  <div className="font-mono text-xs text-text-secondary uppercase">{CATEGORY_LABELS[selectedProduct.category]}</div>
                </div>

                {/* Quantity slider */}
                <div>
                  <label className="input-label">Quantity</label>
                  <input
                    type="range"
                    min={selectedProduct.price_breaks[0]?.min_qty || 1}
                    max={Math.max(...selectedProduct.price_breaks.map(t => t.min_qty)) * 3}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full accent-[#E4002B] h-2"
                  />
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input-foundry w-24 text-center font-mono font-bold"
                      min={1}
                    />
                    <span className="label-mono text-text-secondary">units</span>
                  </div>
                </div>

                {/* Tier ladder */}
                <div>
                  <label className="input-label mb-3 block">Bulk Discount Tiers</label>
                  <div className="space-y-2">
                    {selectedProduct.price_breaks.map((tier, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 border-2 transition-all duration-150 ${
                          i === activeTierIndex
                            ? 'border-line-red bg-line-red/10 shadow-stamp-sm -translate-x-px -translate-y-px'
                            : 'border-border-subtle bg-surface-tertiary'
                        }`}
                        style={{ borderRadius: '2px' }}
                      >
                        <div className="flex items-center gap-2">
                          {i === activeTierIndex && <span className="w-2 h-2 bg-line-red" style={{ borderRadius: '1px' }} />}
                          <span className="font-mono text-xs text-text-secondary uppercase">
                            {tier.min_qty}+ units
                          </span>
                        </div>
                        <span className={`price-mono text-sm ${i === activeTierIndex ? 'text-line-red font-bold' : 'text-text-secondary'}`}>
                          {formatNaira(tier.price)}/unit
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Live total + form */}
              <div className="space-y-6">
                {/* Price summary */}
                <div className="p-6 border-2 border-line-red bg-surface-primary" style={{ borderRadius: '2px' }}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="label-mono text-text-secondary block mb-1">Unit Price</span>
                      <span className="price-mono text-xl text-foundry-concrete">{formatNaira(unitPrice)}</span>
                    </div>
                    <div>
                      <span className="label-mono text-text-secondary block mb-1">Quantity</span>
                      <span className="price-mono text-xl text-foundry-concrete">{quantity}</span>
                    </div>
                  </div>
                  <div className="divider-tear" style={{ margin: '0.75rem 0' }} />
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-text-secondary">Estimated Total</span>
                    <span className="price-mono text-3xl text-line-red">{formatNaira(totalPrice)}</span>
                  </div>
                  {quantity >= (selectedProduct.price_breaks[0]?.min_qty || 0) && quantity < (selectedProduct.price_breaks[selectedProduct.price_breaks.length - 1]?.min_qty || 0) && (
                    <p className="font-mono text-[10px] text-text-secondary mt-2 uppercase">
                      💡 Order {selectedProduct.price_breaks[activeTierIndex + 1]?.min_qty || ''}+ to unlock the next discount tier
                    </p>
                  )}
                </div>

                {/* Quote form */}
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
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
                    <label className="input-label">Design Notes</label>
                    <textarea rows={3} className="input-foundry" placeholder="Describe your design or paste a link to your file..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-foundry w-full" style={{ backgroundColor: '#E4002B' }}>Get a Quote</button>
                  <p className="font-mono text-[10px] text-text-secondary text-center uppercase tracking-wider">We&apos;ll respond within 24 hours</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
