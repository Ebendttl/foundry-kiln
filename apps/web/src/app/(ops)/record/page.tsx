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
        <span className="label-mono text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">Record Transaction</h1>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 bg-green-500/20 border-2 border-green-500 mx-auto flex items-center justify-center" style={{ borderRadius: '2px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="heading-foundry text-xl text-foundry-concrete">Transaction Posted</h2>
            <p className="font-mono text-xs text-text-secondary uppercase">Entry pushed to unified ledger</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="input-label">Business Unit</label>
                <select
                  className="input-foundry"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="the_booth">The Booth (Studios)</option>
                  <option value="the_line">The Line (Print)</option>
                  <option value="the_roast">The Roast (Coffee)</option>
                </select>
              </div>
              <div>
                <label className="input-label">Type</label>
                <select
                  className="input-foundry"
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
                <label className="input-label">Category</label>
                <select
                  className="input-foundry"
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
                <label className="input-label">Amount (NGN) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="input-foundry font-mono"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="input-label">Transaction Date *</label>
                <input
                  type="date"
                  required
                  className="input-foundry font-mono"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Description / Reference *</label>
                <input
                  type="text"
                  required
                  className="input-foundry"
                  placeholder="e.g. Invoice #2931 / Podcast Recording"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-foundry w-full">
              Post to Ledger
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
