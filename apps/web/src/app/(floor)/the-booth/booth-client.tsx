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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-surface-primary py-24">
        <div className="text-center max-w-md mx-auto px-6 space-y-6">
          <div className="w-16 h-16 bg-booth-violet border-2 border-foundry-black mx-auto flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EDEBE6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="font-display font-bold text-3xl text-foundry-concrete uppercase">Booking Received</h2>
          <p className="font-body text-base text-text-secondary">We&apos;ll confirm your session within 2 hours. Check your phone for a WhatsApp confirmation.</p>
          <button onClick={() => { setSubmitted(false); setSelectedSlots([]); setSelectedPackage(null); setSelectedAddons([]); }} className="btn-foundry" style={{ backgroundColor: '#7B2FF7', color: '#fff', borderColor: '#7B2FF7' }}>
            BOOK ANOTHER
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
                <span className="font-mono text-xs uppercase tracking-widest text-booth-violet px-2.5 py-1 border border-booth-violet" style={{ borderRadius: '2px' }}>
                  THE BOOTH
                </span>
              </div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.9] text-foundry-concrete">
                Book your<br /><span className="text-booth-violet">studio session</span>
              </h1>
              <p className="font-body text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
                Soundproof podcast rooms, music suites, and video studios — booked by the hour, designed for professional audio engineers and visual storytellers.
              </p>
              <div className="pt-4">
                <a href="#booking-calendar" className="btn-foundry" style={{ backgroundColor: '#7B2FF7', color: '#fff', borderColor: '#7B2FF7' }}>
                  BOOK A SESSION
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-surface-tertiary border-t-4 border-booth-violet overflow-hidden" style={{ borderRadius: '2px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-booth.png"
                    alt="The Booth Recording Studio"
                    className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foundry-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="font-mono text-[10px] text-booth-violet uppercase tracking-widest bg-foundry-black/90 px-2 py-0.5 border border-booth-violet/30" style={{ borderRadius: '2px' }}>
                      ROOM A (PODCAST)
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

      {/* Studio Spaces */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-booth-violet block mb-3 font-semibold">01 / CHOOSE SPACE</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">Our Production Studios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studioSpaces.map((space) => (
              <button
                key={space.id}
                onClick={() => { setSelectedSpace(space); setSelectedSlots([]); }}
                className={`text-left flex flex-col justify-between bg-surface-secondary border-t-4 transition-all duration-150 ${
                  selectedSpace?.id === space.id
                    ? 'border-t-booth-violet shadow-stamp-violet bg-surface-tertiary -translate-x-0.5 -translate-y-0.5'
                    : 'border-t-border-subtle hover:border-t-booth-violet/55'
                }`}
                style={{ borderRadius: '2px', minHeight: '380px' }}
              >
                {/* Visual section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-tertiary border-b border-border-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/the-booth.png"
                    alt={space.name}
                    className="w-full h-full object-cover filter brightness-[0.7] grayscale contrast-110"
                  />
                  <div className="absolute top-4 right-4 bg-foundry-black/90 px-2 py-0.5 border border-border-subtle" style={{ borderRadius: '2px' }}>
                    <span className="font-mono text-[10px] text-text-secondary uppercase">{space.capacity} pax max</span>
                  </div>
                </div>

                {/* Body section */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-foundry-concrete uppercase tracking-tight">{space.name}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">{space.description}</p>
                  </div>
                  
                  <div className="flex gap-6 border-t border-border-subtle pt-4">
                    <div>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block">Hourly Rate</span>
                      <span className="font-mono font-bold text-booth-violet text-lg">{formatNaira(space.hourly_rate)}</span>
                    </div>
                    {space.day_rate && (
                      <div>
                        <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block">Full Day</span>
                        <span className="font-mono font-bold text-text-primary text-lg">{formatNaira(space.day_rate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Time-Slot Calendar */}
      <section id="booking-calendar" className="py-24 lg:py-40 bg-surface-secondary border-t border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-booth-violet block mb-3 font-semibold">02 / SELECT DATE & HOURS</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foundry-concrete tracking-tight">Time-Slot Calendar</h2>
          </div>

          {!selectedSpace ? (
            <div className="border-2 border-dashed border-border-subtle p-16 text-center bg-surface-primary" style={{ borderRadius: '2px' }}>
              <p className="text-text-secondary font-body text-base">Select a studio space above to see available calendar slots.</p>
            </div>
          ) : (
            <div className="space-y-8 bg-surface-primary p-6 lg:p-8 border-t-4 border-booth-violet" style={{ borderRadius: '2px' }}>
              {/* Date picker strip */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => { setSelectedDate(date); setSelectedSlots([]); }}
                    className={`flex-shrink-0 px-5 py-4 border-t-4 text-center transition-all duration-150 min-w-[90px] ${
                      isSameDay(date, selectedDate)
                        ? 'border-t-booth-violet bg-booth-violet/10 text-foundry-concrete'
                        : 'border-t-border-subtle bg-surface-secondary text-text-secondary hover:border-t-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="font-mono text-[9px] uppercase tracking-wider">{format(date, 'EEE')}</div>
                    <div className="font-display font-bold text-2xl my-0.5">{format(date, 'd')}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider">{format(date, 'MMM')}</div>
                  </button>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-3 sm:grid-cols-7 lg:grid-cols-14 gap-3">
                {HOURS.map((hour) => {
                  const status = getSlotStatus(hour);
                  return (
                    <button
                      key={hour}
                      onClick={() => toggleSlot(hour)}
                      disabled={status === 'booked'}
                      className={`p-4 border-t-4 text-center transition-all duration-150 ${
                        status === 'selected'
                          ? 'border-t-booth-violet bg-booth-violet text-white shadow-stamp-sm -translate-x-px -translate-y-px font-bold'
                          : status === 'booked'
                          ? 'border-t-border-subtle bg-surface-secondary text-text-secondary/20 cursor-not-allowed line-through'
                          : 'border-t-border-subtle bg-surface-secondary text-text-secondary hover:border-t-booth-violet'
                      }`}
                      style={{ borderRadius: '2px' }}
                      title={status === 'booked' ? 'Already booked' : `${hour}:00 - ${hour + 1}:00`}
                    >
                      <div className="font-mono text-sm">{hour}:00</div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-text-secondary border-t border-border-subtle pt-6">
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border-t-4 border-border-subtle bg-surface-secondary" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-booth-violet border-t-4 border-booth-violet" /> Selected</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border-t-4 border-border-subtle bg-surface-secondary opacity-20" /> Booked</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages & Add-ons */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Packages */}
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-booth-violet block mb-3 font-semibold">03 / PACKAGE BUNDLES</span>
                <h3 className="font-display font-bold text-3xl text-foundry-concrete tracking-tight">Select a Package</h3>
              </div>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => { setSelectedPackage(selectedPackage?.id === pkg.id ? null : pkg); if (selectedPackage?.id !== pkg.id) setSelectedSlots([]); }}
                    className={`w-full text-left p-6 bg-surface-secondary border-t-4 transition-all duration-150 ${
                      selectedPackage?.id === pkg.id
                        ? 'border-t-booth-violet bg-surface-tertiary shadow-stamp-sm'
                        : 'border-t-border-subtle hover:border-t-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-display font-bold text-lg text-foundry-concrete uppercase tracking-tight">{pkg.name}</h4>
                        <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">{pkg.base_hours} Hours Included</span>
                      </div>
                      <span className="font-mono font-bold text-booth-violet text-lg">From {formatNaira(pkg.price_from)}</span>
                    </div>
                    <p className="font-body text-sm text-text-secondary mb-4">{pkg.description}</p>
                    <ul className="grid grid-cols-2 gap-2 border-t border-border-subtle pt-4">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="font-body text-xs text-text-secondary flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-booth-violet flex-shrink-0" /> {inc}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-booth-violet block mb-3 font-semibold">04 / OPTIONAL EXTRAS</span>
                <h3 className="font-display font-bold text-3xl text-foundry-concrete tracking-tight">Add-ons</h3>
              </div>
              <div className="space-y-3">
                {addons.map((addon) => (
                  <label
                    key={addon.name}
                    className={`flex items-center justify-between p-5 bg-surface-secondary border-t-4 cursor-pointer transition-all duration-150 ${
                      selectedAddons.includes(addon.name)
                        ? 'border-t-booth-violet bg-surface-tertiary'
                        : 'border-t-border-subtle hover:border-t-booth-violet/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-center gap-4">
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
                        <span className="font-display font-bold text-sm text-foundry-concrete uppercase tracking-tight">{addon.name}</span>
                        <span className="block font-body text-xs text-text-secondary mt-1">{addon.description}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-booth-violet">{formatNaira(addon.price)}</span>
                  </label>
                ))}
              </div>

              {/* Running Price Total */}
              <div className="mt-8 p-6 border-t-4 border-booth-violet bg-surface-secondary" style={{ borderRadius: '2px' }}>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-subtle">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">ESTIMATED TOTAL</span>
                  <span className="font-mono font-bold text-3xl text-booth-violet">{formatNaira(totalPrice)}</span>
                </div>
                <div className="space-y-2 font-body text-xs text-text-secondary">
                  {selectedSpace && selectedSlots.length > 0 && <div>Studio Space: {selectedSpace.name} ({selectedSlots.length} hours)</div>}
                  {selectedPackage && <div>Selected Package: {selectedPackage.name}</div>}
                  {selectedAddons.map((a) => <div key={a}>+ Add-on: {a}</div>)}
                  {totalPrice === 0 && <div>Please configure your studio spaces, slots, or package options above.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 lg:py-40 bg-surface-secondary border-t border-border-subtle">
        <div className="max-w-2xl mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-booth-violet block mb-3 font-semibold">05 / CONFIRM BOOKING</span>
            <h2 className="font-display font-bold text-4xl text-foundry-concrete tracking-tight">Complete your booking</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8 bg-surface-primary p-8 border-t-4 border-booth-violet" style={{ borderRadius: '2px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">FULL NAME *</label>
                <input type="text" required className="input-foundry focus:ring-2 focus:ring-booth-violet focus:border-booth-violet" placeholder="Your name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">PHONE *</label>
                <input type="tel" required className="input-foundry focus:ring-2 focus:ring-booth-violet focus:border-booth-violet" placeholder="+234..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-text-secondary mb-2">EMAIL</label>
              <input type="email" className="input-foundry focus:ring-2 focus:ring-booth-violet focus:border-booth-violet" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-text-secondary mb-2">NOTES / SPECIAL REQUESTS</label>
              <textarea rows={3} className="input-foundry focus:ring-2 focus:ring-booth-violet focus:border-booth-violet" placeholder="Anything we should know..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </div>

            {/* Summary */}
            <div className="divider-tear" />
            <div className="p-5 border-t-4 border-border-subtle bg-surface-secondary space-y-2" style={{ borderRadius: '2px' }}>
              <div className="flex justify-between text-sm"><span className="text-text-secondary font-body">Selected Space:</span> <span className="font-display font-semibold text-foundry-concrete">{selectedSpace?.name || '—'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary font-body">Date:</span> <span className="font-display font-semibold text-foundry-concrete">{format(selectedDate, 'EEE d MMM yyyy')}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary font-body">Time Range:</span> <span className="font-display font-semibold text-foundry-concrete">{selectedSlots.length > 0 ? `${selectedSlots[0]}:00 – ${(selectedSlots[selectedSlots.length - 1] ?? 0) + 1}:00` : selectedPackage ? `${selectedPackage.base_hours} hours (flexible)` : '—'}</span></div>
              <div className="flex justify-between text-sm border-t border-border-subtle pt-2 mt-2"><span className="text-text-secondary font-body">Total Estimated Cost:</span> <span className="font-mono font-bold text-booth-violet">{formatNaira(totalPrice)}</span></div>
            </div>

            <button type="submit" className="btn-foundry w-full text-white font-mono text-sm font-semibold tracking-wider hover:bg-white hover:text-booth-violet hover:border-white transition-all duration-150 py-3" style={{ backgroundColor: '#7B2FF7', borderColor: '#7B2FF7' }}>
              SUBMIT BOOKING REQUEST
            </button>
            <p className="font-mono text-[10px] text-text-secondary text-center uppercase tracking-widest mt-4">
              We will confirm scheduling and logistics via WhatsApp within 2 hours
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
