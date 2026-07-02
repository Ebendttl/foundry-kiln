'use client';

import { useState } from 'react';

interface Budget {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  unit: string;
  color: string;
}

export default function BudgetsPage() {
  const [budgets] = useState<Budget[]>([
    { id: '1', name: 'Studio Gear Upgrades', allocated: 500000, spent: 120000, unit: 'The Booth', color: '#7B2FF7' },
    { id: '2', name: 'Textile Inks & Blank Stocks', allocated: 350000, spent: 295000, unit: 'The Line', color: '#E4002B' },
    { id: '3', name: 'Green Coffee Import Batch', allocated: 800000, spent: 800000, unit: 'The Roast', color: '#C08A3E' },
    { id: '4', name: 'Floor Marketing & Fliers', allocated: 150000, spent: 45000, unit: 'Foundry Collective', color: '#FF4B12' },
  ]);

  function formatNaira(n: number) {
    return `₦${n.toLocaleString('en-NG')}`;
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">Budgets</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((b) => {
          const percent = Math.min(100, Math.round((b.spent / b.allocated) * 100));
          return (
            <div key={b.id} className="p-6 border-2 border-border-subtle bg-surface-secondary space-y-4" style={{ borderRadius: '2px' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-foundry-concrete uppercase">{b.name}</h3>
                  <span className="font-mono text-[10px] uppercase" style={{ color: b.color }}>
                    {b.unit}
                  </span>
                </div>
                <span className="font-mono text-xs text-text-secondary">
                  {percent}% Spent
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-surface-primary border border-border-subtle" style={{ borderRadius: '1px' }}>
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${percent}%`, backgroundColor: b.color }}
                />
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <div>
                  <span className="label-mono text-text-secondary block">Spent</span>
                  <span className="price-mono text-base text-foundry-concrete">{formatNaira(b.spent)}</span>
                </div>
                <div className="text-right">
                  <span className="label-mono text-text-secondary block">Allocation</span>
                  <span className="price-mono text-base text-text-secondary">{formatNaira(b.allocated)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
