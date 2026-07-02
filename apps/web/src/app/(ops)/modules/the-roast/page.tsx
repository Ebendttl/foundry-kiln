'use client';

export default function TheRoastOpsPage() {
  const roastingSchedule = [
    { batch: 'BATCH-201', coffee: 'Lagos Sunrise Blend', qty: '15kg', target: 'Espresso Profile', roastmaster: 'Segun' },
    { batch: 'BATCH-202', coffee: 'Ethiopian Yirgacheffe', qty: '10kg', target: 'Filter Profile', roastmaster: 'Favour' },
    { batch: 'BATCH-203', coffee: 'Rwanda Gitesi', qty: '5kg', target: 'Light Roast Profile', roastmaster: 'Segun' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-roast-caramel block mb-1">Business Unit Ops</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">The Roast</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border-2 border-roast-caramel bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Active Subscribers</span>
          <span className="price-mono text-2xl text-foundry-concrete">42 Members</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Beans Roasted (Week)</span>
          <span className="price-mono text-2xl text-foundry-concrete">120 kg</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Income (Today)</span>
          <span className="price-mono text-2xl text-green-400">₦122,000</span>
        </div>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary">
          <h2 className="font-display font-bold text-sm text-foundry-concrete uppercase">Roasting Log</h2>
        </div>
        {roastingSchedule.map((s, i) => (
          <div key={i} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <div>
              <span className="font-mono text-xs text-roast-caramel block">{s.batch}</span>
              <p className="text-sm font-bold text-foundry-concrete uppercase">{s.coffee}</p>
              <span className="font-mono text-[10px] text-text-secondary uppercase">{s.qty} · Roastmaster: {s.roastmaster}</span>
            </div>
            <span className="font-mono text-[10px] uppercase border px-2 py-0.5 text-roast-caramel border-roast-caramel" style={{ borderRadius: '2px' }}>
              {s.target}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
