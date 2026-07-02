'use client';

export default function TheBoothOpsPage() {
  const activeBookings = [
    { time: '10:00 AM - 12:00 PM', client: 'Chuka U. (Podcast)', studio: 'Podcast Room', engineer: 'Required', status: 'confirmed' },
    { time: '02:00 PM - 06:00 PM', client: 'Femi K. (Recording Session)', studio: 'Music Suite', engineer: 'Self-engineered', status: 'completed' },
    { time: '06:30 PM - 08:30 PM', client: 'Lagos Lookbook Shoot', studio: 'Photo/Video Cyc Wall', engineer: 'Not needed', status: 'inquiry' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-booth-violet block mb-1">Business Unit Ops</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">The Booth</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border-2 border-booth-violet bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Today&apos;s Bookings</span>
          <span className="price-mono text-2xl text-foundry-concrete">5 Sessions</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Utilization Rate</span>
          <span className="price-mono text-2xl text-foundry-concrete">78%</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Income (Today)</span>
          <span className="price-mono text-2xl text-green-400">₦195,000</span>
        </div>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary">
          <h2 className="font-display font-bold text-sm text-foundry-concrete uppercase">Active Schedule</h2>
        </div>
        {activeBookings.map((b, i) => (
          <div key={i} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <div>
              <span className="font-mono text-xs text-booth-violet block">{b.time}</span>
              <p className="text-sm font-bold text-foundry-concrete uppercase">{b.client}</p>
              <span className="font-mono text-[10px] text-text-secondary uppercase">{b.studio} · Engineer: {b.engineer}</span>
            </div>
            <span className="font-mono text-[10px] uppercase border px-2 py-0.5" style={{ borderRadius: '2px' }}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
