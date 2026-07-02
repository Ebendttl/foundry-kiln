'use client';

export default function TheLineOpsPage() {
  const printJobs = [
    { id: 'JOB-901', client: 'Alte Streetwear', item: '75x Custom Hoodies', stage: 'Screen Setup', priority: 'High' },
    { id: 'JOB-902', client: 'Gidi Burger Co.', item: '500x Matte Business Cards', stage: 'On Press', priority: 'Medium' },
    { id: 'JOB-903', client: 'Vibe Lagos Concert', item: '100x A2 Gloss Posters', stage: 'Cutting & Packaging', priority: 'Low' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-line-red block mb-1">Business Unit Ops</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">The Line</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border-2 border-line-red bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Active Print Jobs</span>
          <span className="price-mono text-2xl text-foundry-concrete">8 Projects</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Press Capacity</span>
          <span className="price-mono text-2xl text-foundry-concrete">60%</span>
        </div>
        <div className="p-5 border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
          <span className="label-mono text-text-secondary block mb-1">Income (Today)</span>
          <span className="price-mono text-2xl text-green-400">₦168,000</span>
        </div>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary">
          <h2 className="font-display font-bold text-sm text-foundry-concrete uppercase">Production Queue</h2>
        </div>
        {printJobs.map((j, i) => (
          <div key={i} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <div>
              <span className="font-mono text-xs text-line-red block">{j.id}</span>
              <p className="text-sm font-bold text-foundry-concrete uppercase">{j.client}</p>
              <span className="font-mono text-[10px] text-text-secondary uppercase">{j.item}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase border border-border-subtle px-2 py-0.5 text-text-secondary" style={{ borderRadius: '2px' }}>
                {j.stage}
              </span>
              <span className="font-mono text-[9px] uppercase border px-2 py-0.5 text-line-red border-line-red" style={{ borderRadius: '2px' }}>
                {j.priority} priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
