'use client';

import { useState, useMemo } from 'react';
import { format, addDays, isSameDay, startOfDay } from 'date-fns';

interface StudioSpace {
  id: string;
  name: string;
  description: string;
  capacity: number;
  hourly_rate: number;
  day_rate: number | null;
  equipment_included: string[];
  image_url: string | null;
}

interface Package {
  id: string;
  name: string;
  description: string;
  base_hours: number;
  price_from: number;
  inclusions: string[];
}

interface Addon {
  name: string;
  price: number;
  description: string;
}

interface Props {
  studioSpaces: StudioSpace[];
  packages: Package[];
  addons: Addon[];
}

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8AM to 9PM
const DAYS_AHEAD = 14;

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export default function BoothClient({ studioSpaces, packages, addons }: Props) {
  const [selectedSpace, setSelectedSpace] = useState<StudioSpace | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Simulated booked slots (in production, fetched from Supabase)
  const bookedSlots: Record<string, number[]> = {
    [`${format(addDays(new Date(), 1), 'yyyy-MM-dd')}-00000000-0000-0000-0004-000000000001`]: [9, 10, 11],
    [`${format(addDays(new Date(), 2), 'yyyy-MM-dd')}-00000000-0000-0000-0004-000000000002`]: [14, 15, 16, 17],
  };

  const dates = useMemo(() => Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(startOfDay(new Date()), i)), []);

  const getSlotStatus = (hour: number) => {
    if (!selectedSpace) return 'unavailable';
    const key = `${format(selectedDate, 'yyyy-MM-dd')}-${selectedSpace.id}`;
    if (bookedSlots[key]?.includes(hour)) return 'booked';
    if (selectedSlots.includes(hour)) return 'selected';
    return 'available';
  };

  const toggleSlot = (hour: number) => {
    if (getSlotStatus(hour) === 'booked') return;
    setSelectedSlots((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour].sort((a, b) => a - b)
    );
  };

  const totalPrice = useMemo(() => {
    let base = 0;
    if (selectedPackage) {
      base = selectedPackage.price_from;
    } else if (selectedSpace && selectedSlots.length > 0) {
      base = selectedSpace.hourly_rate * selectedSlots.length;
    }
    const addonTotal = addons.filter((a) => selectedAddons.includes(a.name)).reduce((sum, a) => sum + a.price, 0);
    return base + addonTotal;
  }, [selectedSpace, selectedSlots, selectedPackage, selectedAddons, addons]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to public_enquiries via Supabase
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-booth-violet border-2 border-foundry-black mx-auto mb-6 flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EDEBE6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-4">Booking Received</h2>
          <p className="text-text-secondary mb-6">We&apos;ll confirm your session within 2 hours. Check your phone for a WhatsApp message.</p>
          <button onClick={() => { setSubmitted(false); setSelectedSlots([]); setSelectedPackage(null); setSelectedAddons([]); }} className="btn-foundry">Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-surface-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag-unit text-booth-violet border-booth-violet mb-4">The Booth</div>
              <h1 className="heading-foundry text-5xl lg:text-6xl text-foundry-concrete mb-4">
                Book your<br /><span className="text-booth-violet">studio session</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-md mb-8">Podcast rooms, music suites, and photo/video studios — booked by the hour, equipped for professionals.</p>
              <a href="#booking-calendar" className="btn-foundry" style={{ backgroundColor: '#7B2FF7' }}>Book a Session</a>
            </div>
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-surface-tertiary border-2 border-booth-violet overflow-hidden" style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-booth-violet/20 via-transparent to-foundry-black/60" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(123,47,247,0.12) 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#7B2FF7" strokeWidth="1.5" opacity="0.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-foundry max-w-7xl mx-auto" />

      {/* Studio Spaces */}
      <section className="py-16 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-booth-violet block mb-3">Our Spaces</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-10">Choose your studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioSpaces.map((space) => (
              <button
                key={space.id}
                onClick={() => { setSelectedSpace(space); setSelectedSlots([]); }}
                className={`text-left p-6 border-2 transition-all duration-150 ${
                  selectedSpace?.id === space.id
                    ? 'border-booth-violet shadow-stamp-violet bg-surface-tertiary -translate-x-0.5 -translate-y-0.5'
                    : 'border-border-subtle bg-surface-secondary hover:border-booth-violet'
                }`}
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg text-foundry-concrete uppercase">{space.name}</h3>
                  <span className="font-mono text-xs text-text-secondary">{space.capacity} pax</span>
                </div>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{space.description}</p>
                <div className="flex gap-4 mb-4">
                  <div>
                    <span className="label-mono text-text-secondary block">Hourly</span>
                    <span className="price-mono text-booth-violet text-lg">{formatNaira(space.hourly_rate)}</span>
                  </div>
                  {space.day_rate && (
                    <div>
                      <span className="label-mono text-text-secondary block">Full Day</span>
                      <span className="price-mono text-text-primary text-lg">{formatNaira(space.day_rate)}</span>
                    </div>
                  )}
                </div>
                <div className="divider-tear" style={{ margin: '0.75rem 0' }} />
                <ul className="space-y-1">
                  {space.equipment_included.slice(0, 3).map((eq) => (
                    <li key={eq} className="font-mono text-[10px] text-text-secondary uppercase flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-booth-violet flex-shrink-0" />
                      {eq}
                    </li>
                  ))}
                  {space.equipment_included.length > 3 && (
                    <li className="font-mono text-[10px] text-booth-violet">+{space.equipment_included.length - 3} more</li>
                  )}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Time-Slot Calendar */}
      <section id="booking-calendar" className="py-16 bg-surface-secondary border-t-2 border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-booth-violet block mb-3">Select Date & Time</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-8">Booking Calendar</h2>

          {!selectedSpace ? (
            <div className="border-2 border-dashed border-border-subtle p-12 text-center" style={{ borderRadius: '2px' }}>
              <p className="text-text-secondary font-mono text-sm uppercase">↑ Select a studio space above to see available slots</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Date picker strip */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => { setSelectedDate(date); setSelectedSlots([]); }}
                    className={`flex-shrink-0 px-4 py-3 border-2 text-center transition-all duration-150 min-w-[80px] ${
                      isSameDay(date, selectedDate)
                        ? 'border-booth-violet bg-booth-violet/10 text-foundry-concrete'
                        : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="font-mono text-[10px] uppercase">{format(date, 'EEE')}</div>
                    <div className="font-display font-bold text-xl">{format(date, 'd')}</div>
                    <div className="font-mono text-[10px] uppercase">{format(date, 'MMM')}</div>
                  </button>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
                {HOURS.map((hour) => {
                  const status = getSlotStatus(hour);
                  return (
                    <button
                      key={hour}
                      onClick={() => toggleSlot(hour)}
                      disabled={status === 'booked'}
                      className={`p-3 border-2 text-center transition-all duration-150 ${
                        status === 'selected'
                          ? 'border-booth-violet bg-booth-violet text-white shadow-stamp-sm -translate-x-px -translate-y-px'
                          : status === 'booked'
                          ? 'border-border-subtle bg-surface-primary text-text-secondary/30 cursor-not-allowed line-through'
                          : 'border-border-subtle bg-surface-tertiary text-text-secondary hover:border-booth-violet'
                      }`}
                      style={{ borderRadius: '2px' }}
                      title={status === 'booked' ? 'Already booked' : `${hour}:00 - ${hour + 1}:00`}
                    >
                      <div className="font-mono text-xs font-bold">{hour}:00</div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-border-subtle bg-surface-tertiary" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-booth-violet border-2 border-booth-violet" /> Selected</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-border-subtle bg-surface-primary opacity-30" /> Booked</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages & Add-ons */}
      <section className="py-16 bg-surface-primary border-t-2 border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Packages */}
            <div>
              <span className="label-mono text-booth-violet block mb-3">Packages</span>
              <h3 className="heading-foundry text-2xl text-foundry-concrete mb-6">Or choose a package</h3>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => { setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg); if (selectedPackage?.id !== pkg.id) setSelectedSlots([]); }}
                    className={`w-full text-left p-5 border-2 transition-all duration-150 ${
                      selectedPackage?.id === pkg.id
                        ? 'border-booth-violet bg-booth-violet/5 shadow-stamp-sm'
                        : 'border-border-subtle bg-surface-secondary hover:border-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-display font-bold text-foundry-concrete uppercase">{pkg.name}</h4>
                        <p className="font-mono text-[10px] text-text-secondary uppercase">{pkg.base_hours} hours</p>
                      </div>
                      <span className="price-mono text-booth-violet text-lg">From {formatNaira(pkg.price_from)}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{pkg.description}</p>
                    <ul className="space-y-1">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="font-mono text-[10px] text-text-secondary uppercase flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-booth-violet flex-shrink-0" /> {inc}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <span className="label-mono text-booth-violet block mb-3">Add-ons</span>
              <h3 className="heading-foundry text-2xl text-foundry-concrete mb-6">Extras</h3>
              <div className="space-y-3">
                {addons.map((addon) => (
                  <label
                    key={addon.name}
                    className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-all duration-150 ${
                      selectedAddons.includes(addon.name)
                        ? 'border-booth-violet bg-booth-violet/5'
                        : 'border-border-subtle bg-surface-secondary hover:border-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.name)}
                        onChange={() => setSelectedAddons((prev) => prev.includes(addon.name) ? prev.filter((a) => a !== addon.name) : [...prev, addon.name])}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 flex items-center justify-center ${selectedAddons.includes(addon.name) ? 'border-booth-violet bg-booth-violet' : 'border-border-subtle'}`} style={{ borderRadius: '2px' }}>
                        {selectedAddons.includes(addon.name) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div>
                        <span className="font-display font-bold text-sm text-foundry-concrete uppercase">{addon.name}</span>
                        <span className="block font-mono text-[10px] text-text-secondary">{addon.description}</span>
                      </div>
                    </div>
                    <span className="price-mono text-booth-violet">{formatNaira(addon.price)}</span>
                  </label>
                ))}
              </div>

              {/* Running Price Total */}
              <div className="mt-8 p-6 border-2 border-booth-violet bg-surface-tertiary" style={{ borderRadius: '2px' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="label-mono text-text-secondary">Estimated Total</span>
                  <span className="price-mono text-3xl text-booth-violet">{formatNaira(totalPrice)}</span>
                </div>
                <div className="space-y-1 font-mono text-[10px] text-text-secondary uppercase">
                  {selectedSpace && selectedSlots.length > 0 && <div>{selectedSpace.name}: {selectedSlots.length}hr × {formatNaira(selectedSpace.hourly_rate)}</div>}
                  {selectedPackage && <div>Package: {selectedPackage.name}</div>}
                  {selectedAddons.map((a) => <div key={a}>+ {a}</div>)}
                  {totalPrice === 0 && <div>Select a space, slots, or package</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-surface-secondary border-t-2 border-border-subtle">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono text-booth-violet block mb-3">Almost There</span>
          <h2 className="heading-foundry text-3xl text-foundry-concrete mb-8">Complete your booking</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="input-label">Full Name *</label>
                <input type="text" required className="input-foundry" placeholder="Your name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="input-label">Phone *</label>
                <input type="tel" required className="input-foundry" placeholder="+234..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="input-label">Email</label>
              <input type="email" className="input-foundry" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="input-label">Notes / Special Requests</label>
              <textarea rows={3} className="input-foundry" placeholder="Anything we should know..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </div>

            {/* Summary */}
            <div className="divider-tear" />
            <div className="p-4 border-2 border-border-subtle bg-surface-primary font-mono text-xs text-text-secondary uppercase space-y-1" style={{ borderRadius: '2px' }}>
              <div>Space: {selectedSpace?.name || '—'}</div>
              <div>Date: {format(selectedDate, 'EEE d MMM yyyy')}</div>
              <div>Time: {selectedSlots.length > 0 ? `${selectedSlots[0]}:00 – ${(selectedSlots[selectedSlots.length - 1] ?? 0) + 1}:00` : selectedPackage ? `${selectedPackage.base_hours} hours (flexible)` : '—'}</div>
              <div>Total: <span className="text-booth-violet font-bold">{formatNaira(totalPrice)}</span></div>
            </div>

            <button type="submit" className="btn-foundry w-full" style={{ backgroundColor: '#7B2FF7', borderColor: '#121212' }}>
              Submit Booking Request
            </button>
            <p className="font-mono text-[10px] text-text-secondary text-center uppercase tracking-wider">
              We&apos;ll confirm availability via WhatsApp within 2 hours
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
