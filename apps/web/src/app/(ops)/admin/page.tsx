'use client';

export default function AdminPage() {
  const users = [
    { name: 'Segun Adesina', role: 'Roastmaster / Cafe Lead', unit: 'The Roast' },
    { name: 'Favour Obi', role: 'Screen Print Production Lead', unit: 'The Line' },
    { name: 'Tola Adesanya', role: 'Studio Booking Manager', unit: 'The Booth' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">Admin Settings</h1>
      </div>

      {/* Staff section */}
      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary flex items-center justify-between">
          <h2 className="font-display font-bold text-sm text-foundry-concrete uppercase">Staff Permissions</h2>
          <button className="btn-foundry text-[10px] py-1 px-2">+ Add Staff</button>
        </div>
        {users.map((u, i) => (
          <div key={i} className={`p-4 flex items-center justify-between gap-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <div>
              <p className="text-sm font-bold text-foundry-concrete uppercase">{u.name}</p>
              <span className="font-mono text-[10px] text-text-secondary uppercase">
                {u.role}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase border border-border-subtle px-2 py-0.5 text-text-secondary" style={{ borderRadius: '2px' }}>
              {u.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Global Config */}
      <div className="border-2 border-border-subtle bg-surface-secondary p-6 space-y-6" style={{ borderRadius: '2px' }}>
        <h2 className="heading-foundry text-xl text-foundry-concrete">System Config</h2>
        <div className="space-y-4">
          <div>
            <label className="input-label">Tax Rate (VAT)</label>
            <input type="text" className="input-foundry font-mono" defaultValue="7.5%" />
          </div>
          <div>
            <label className="input-label">Currency Symbol</label>
            <input type="text" className="input-foundry font-mono" defaultValue="₦" />
          </div>
        </div>
      </div>
    </div>
  );
}
