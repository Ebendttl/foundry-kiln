'use client';

import { useState } from 'react';

export default function RecordPage() {
  const [formData, setFormData] = useState({
    unit: 'the_booth',
    type: 'income',
    category: 'booking',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        unit: 'the_booth',
        type: 'income',
        category: 'booking',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foundry-concrete uppercase tracking-tight">Record Transaction</h1>
      </div>

      <div className="bg-surface-secondary border-t-4 border-t-border-subtle p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 bg-green-500/20 border border-green-500 mx-auto flex items-center justify-center" style={{ borderRadius: '2px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="font-display font-bold text-xl text-foundry-concrete uppercase tracking-tight">Transaction Posted</h2>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">Entry pushed to unified ledger</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">BUSINESS UNIT</label>
                <select
                  className="input-foundry focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="the_booth">The Booth (Studios)</option>
                  <option value="the_line">The Line (Print)</option>
                  <option value="the_roast">The Roast (Coffee)</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">TYPE</label>
                <select
                  className="input-foundry focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="income">Income (Cash Inflow)</option>
                  <option value="expense">Expense (Cash Outflow)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">CATEGORY</label>
                <select
                  className="input-foundry focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {formData.type === 'income' ? (
                    <>
                      <option value="booking">Studio Booking</option>
                      <option value="quote">Merch / Custom Print Run</option>
                      <option value="subscription">Coffee Subscription</option>
                      <option value="retail">Retail Café / Walk-in</option>
                    </>
                  ) : (
                    <>
                      <option value="equipment">Equipment Purchase / Repair</option>
                      <option value="materials">Raw Materials (Ink, Blanks, Coffee Beans)</option>
                      <option value="rent">Rent & Utilities</option>
                      <option value="staff">Staff Wages</option>
                      <option value="marketing">Marketing & Promo</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">AMOUNT (NGN) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="input-foundry font-mono focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">TRANSACTION DATE *</label>
                <input
                  type="date"
                  required
                  className="input-foundry font-mono focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-text-secondary mb-2">DESCRIPTION / REFERENCE *</label>
                <input
                  type="text"
                  required
                  className="input-foundry focus:ring-2 focus:ring-foundry-orange focus:border-foundry-orange"
                  placeholder="e.g. Invoice #2931 / Podcast Recording"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-foundry w-full font-mono text-sm font-semibold tracking-wider hover:bg-white hover:text-foundry-black hover:border-white transition-all duration-150 py-3" style={{ backgroundColor: 'var(--color-foundry-orange)', borderColor: 'var(--color-foundry-orange)' }}>
              POST TO LEDGER
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
