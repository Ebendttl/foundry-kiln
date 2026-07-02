'use client';

export default function ReportsPage() {
  const reports = [
    { title: 'June Monthly P&L Ledger', date: 'Jul 1, 2026', size: '2.4 MB', type: 'PDF' },
    { title: 'Q2 Studio Utilization Analytics', date: 'Jun 30, 2026', size: '4.8 MB', type: 'XLSX' },
    { title: 'The Line Bulk Discount Margin Analysis', date: 'Jun 15, 2026', size: '1.2 MB', type: 'PDF' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">Reports</h1>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary">
          <h2 className="font-display font-bold text-sm text-foundry-concrete uppercase">Financial & Operational Exports</h2>
        </div>
        {reports.map((r, i) => (
          <div key={i} className={`p-4 flex items-center justify-between gap-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <div>
              <p className="text-sm font-bold text-foundry-concrete uppercase">{r.title}</p>
              <span className="font-mono text-[10px] text-text-secondary uppercase">
                Generated: {r.date} · File size: {r.size}
              </span>
            </div>
            <button className="btn-foundry-outline text-[10px] py-1.5 px-3">
              Download {r.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
