'use client';

import { useState, useEffect } from 'react';

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 600;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.round(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span className="animate-count-up">{prefix}{display.toLocaleString('en-NG')}</span>;
}

function WaveformLoader() {
  return (
    <div className="waveform-loader">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="waveform-bar" />
      ))}
    </div>
  );
}

// Simulated data matching the seed schema
const todayData = {
  totalIncome: 485000,
  totalExpense: 127500,
  netProfit: 357500,
  prevDayNetProfit: 312000,
  transactionCount: 14,
  units: [
    { key: 'the_booth', name: 'The Booth', color: '#7B2FF7', income: 195000, expense: 42000, bookings: 5 },
    { key: 'the_line', name: 'The Line', color: '#E4002B', income: 168000, expense: 53500, orders: 3 },
    { key: 'the_roast', name: 'The Roast', color: '#C08A3E', income: 122000, expense: 32000, subscriptions: 8 },
  ],
};

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const profitChange = todayData.prevDayNetProfit > 0
    ? ((todayData.netProfit - todayData.prevDayNetProfit) / todayData.prevDayNetProfit * 100).toFixed(1)
    : '0';
  const isUp = todayData.netProfit >= todayData.prevDayNetProfit;
  const profitMargin = todayData.totalIncome > 0
    ? ((todayData.netProfit / todayData.totalIncome) * 100).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <WaveformLoader />
          <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange block mb-1">
            {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foundry-concrete uppercase tracking-tight">Overview</h1>
        </div>
        <button className="btn-foundry text-sm">RECORD ENTRY</button>
      </div>

      {/* KPI Cards — Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Income */}
        <div className="p-6 bg-surface-secondary border-t-4 border-t-border-subtle" style={{ borderRadius: '2px' }}>
          <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">Today&apos;s Income</span>
          <div className="font-mono font-bold text-2xl text-green-400 mb-1">
            <AnimatedNumber value={todayData.totalIncome} prefix="₦" />
          </div>
          <span className="font-mono text-[10px] text-text-secondary">{todayData.transactionCount} transactions</span>
        </div>

        {/* Total Expense */}
        <div className="p-6 bg-surface-secondary border-t-4 border-t-border-subtle" style={{ borderRadius: '2px' }}>
          <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">Today&apos;s Expense</span>
          <div className="font-mono font-bold text-2xl text-line-red mb-1">
            <AnimatedNumber value={todayData.totalExpense} prefix="₦" />
          </div>
          <span className="font-mono text-[10px] text-text-secondary">Across all units</span>
        </div>

        {/* Net Profit */}
        <div className="p-6 bg-surface-secondary border-t-4 border-t-foundry-orange" style={{ borderRadius: '2px' }}>
          <span className="font-mono text-[10px] text-foundry-orange uppercase tracking-widest block mb-2">Net Profit</span>
          <div className="font-mono font-bold text-2xl text-foundry-orange mb-1">
            <AnimatedNumber value={todayData.netProfit} prefix="₦" />
          </div>
          <span className={`font-mono text-[10px] ${isUp ? 'text-green-400' : 'text-line-red'}`}>
            {isUp ? '▲' : '▼'} {profitChange}% vs yesterday
          </span>
        </div>

        {/* Profit Margin */}
        <div className="p-6 bg-surface-secondary border-t-4 border-t-border-subtle" style={{ borderRadius: '2px' }}>
          <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">Profit Margin</span>
          <div className="font-mono font-bold text-2xl text-foundry-concrete mb-1">{profitMargin}%</div>
          <span className="font-mono text-[10px] text-text-secondary">Today&apos;s efficiency</span>
        </div>
      </div>

      {/* Per-Unit Breakdown */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-xl text-foundry-concrete uppercase tracking-tight">By Unit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayData.units.map((unit) => (
            <div
              key={unit.key}
              className="p-6 bg-surface-secondary transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ borderRadius: '2px', borderTop: `4px solid ${unit.color}`, boxShadow: `4px 4px 0px 0px ${unit.color}15` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5" style={{ backgroundColor: unit.color, borderRadius: '1px' }} />
                <span className="font-display font-bold text-sm text-foundry-concrete uppercase">{unit.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block mb-1">Income</span>
                  <span className="font-mono font-bold text-lg text-green-400">{formatNaira(unit.income)}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest block mb-1">Expense</span>
                  <span className="font-mono font-bold text-lg text-line-red">{formatNaira(unit.expense)}</span>
                </div>
              </div>

              <div className="divider-tear" style={{ margin: '0.75rem 0' }} />

              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest">Net</span>
                <span className="font-mono font-bold text-lg" style={{ color: unit.color }}>
                  {formatNaira(unit.income - unit.expense)}
                </span>
              </div>

              {/* Unit-specific metric */}
              <div className="mt-3 pt-3 border-t border-border-subtle">
                <span className="font-mono text-[10px] text-text-secondary uppercase">
                  {'bookings' in unit && `${unit.bookings} bookings today`}
                  {'orders' in unit && `${unit.orders} orders in production`}
                  {'subscriptions' in unit && `${unit.subscriptions} active subscribers`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-xl text-foundry-concrete uppercase tracking-tight">Recent Activity</h2>
        <div className="bg-surface-secondary border-t-4 border-t-border-subtle" style={{ borderRadius: '2px' }}>
          {[
            { time: '2:30 PM', desc: 'Studio booking completed — Podcast Room (Tola A.)', amount: 45000, type: 'income', unit: 'The Booth', color: '#7B2FF7' },
            { time: '1:15 PM', desc: 'Merch order moved to "in production" — 50x T-Shirts', amount: 200000, type: 'income', unit: 'The Line', color: '#E4002B' },
            { time: '12:00 PM', desc: 'Coffee subscription billing — 3 monthly subscribers', amount: 13500, type: 'income', unit: 'The Roast', color: '#C08A3E' },
            { time: '11:30 AM', desc: 'Equipment maintenance — replaced XLR cables', amount: 12500, type: 'expense', unit: 'The Booth', color: '#7B2FF7' },
            { time: '9:00 AM', desc: 'Green beans procurement — Ethiopian Yirgacheffe 5kg', amount: 35000, type: 'expense', unit: 'The Roast', color: '#C08A3E' },
          ].map((activity, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
              <span className="font-mono text-[10px] text-text-secondary w-16 flex-shrink-0">{activity.time}</span>
              <span className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: activity.color, borderRadius: '1px' }} />
              <span className="font-body text-sm text-text-primary flex-1 truncate">{activity.desc}</span>
              <span className={`font-mono text-sm ${activity.type === 'income' ? 'text-green-400' : 'text-line-red'}`}>
                {activity.type === 'income' ? '+' : '-'}{formatNaira(activity.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
