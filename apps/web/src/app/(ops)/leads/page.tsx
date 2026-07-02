'use client';

import { useState } from 'react';

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  type: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}

export default function LeadsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: '1', name: 'Tunde Bakare', contact: 'tunde@example.com · 08091234567', type: 'merch_quote', message: 'Need pricing for 150 heavyweight cotton shirts for corporate event.', date: 'Today, 4:12 PM', status: 'new' },
    { id: '2', name: 'Zainab Bello', contact: 'zainab.b@example.com', type: 'studio_booking', message: 'Inquiring if Cyc wall is free this Saturday afternoon for a 3-hour shoot.', date: 'Today, 2:30 PM', status: 'new' },
    { id: '3', name: 'Emeka Obi', contact: 'emeka@example.com · 08123456789', type: 'wholesale_coffee', message: 'Would like to request custom coffee sample pack for cafe bar setup in Lekki.', date: 'Yesterday, 11:00 AM', status: 'contacted' },
    { id: '4', name: 'Kelechi Nwosu', contact: 'kelechi@example.com', type: 'contact', message: 'General inquiry regarding studio membership options or bulk hour prepayments.', date: '2 days ago', status: 'converted' },
  ]);

  const updateStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const TYPE_LABELS: Record<string, { label: string; color: string }> = {
    studio_booking: { label: 'Studio Booking', color: 'text-booth-violet border-booth-violet bg-booth-violet/5' },
    merch_quote: { label: 'Merch Quote', color: 'text-line-red border-line-red bg-line-red/5' },
    wholesale_coffee: { label: 'Coffee Wholesale', color: 'text-roast-caramel border-roast-caramel bg-roast-caramel/5' },
    contact: { label: 'General Info', color: 'text-text-secondary border-border-subtle bg-surface-tertiary' },
  };

  const STATUS_CLASSES: Record<Inquiry['status'], string> = {
    new: 'text-green-400 border-green-500 bg-green-500/5',
    contacted: 'text-yellow-400 border-yellow-500 bg-yellow-500/5',
    converted: 'text-foundry-orange border-foundry-orange bg-foundry-orange/5',
    closed: 'text-text-secondary border-border-subtle bg-surface-tertiary/40',
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="label-mono text-foundry-orange block mb-1">Ops Portal</span>
        <h1 className="heading-foundry text-3xl sm:text-4xl text-foundry-concrete">Public Leads</h1>
      </div>

      <div className="border-2 border-border-subtle bg-surface-secondary" style={{ borderRadius: '2px' }}>
        {inquiries.map((inquiry, i) => {
          const typeInfo = TYPE_LABELS[inquiry.type] || { label: inquiry.type, color: 'text-text-secondary' };
          return (
            <div key={inquiry.id} className={`p-6 ${i > 0 ? 'border-t border-border-subtle' : ''} space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-lg text-foundry-concrete uppercase">{inquiry.name}</h3>
                  <span className={`font-mono text-[9px] px-2 py-0.5 border uppercase ${typeInfo.color}`} style={{ borderRadius: '2px' }}>
                    {typeInfo.label}
                  </span>
                  <span className={`font-mono text-[9px] px-2 py-0.5 border uppercase ${STATUS_CLASSES[inquiry.status]}`} style={{ borderRadius: '2px' }}>
                    {inquiry.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-text-secondary">{inquiry.date}</span>
              </div>

              <p className="text-sm text-text-primary bg-surface-primary p-4 border border-border-subtle font-mono uppercase" style={{ borderRadius: '2px' }}>
                {inquiry.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="font-mono text-xs text-text-secondary">{inquiry.contact}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(inquiry.id, 'contacted')}
                    className="px-3 py-1.5 border border-border-subtle font-mono text-[10px] uppercase text-text-secondary hover:text-foundry-concrete hover:border-text-secondary transition-all"
                    style={{ borderRadius: '2px' }}
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(inquiry.id, 'converted')}
                    className="px-3 py-1.5 border border-[#FF4B12] font-mono text-[10px] uppercase text-foundry-orange hover:bg-foundry-orange/10 transition-all"
                    style={{ borderRadius: '2px' }}
                  >
                    Convert Lead
                  </button>
                  <button
                    onClick={() => updateStatus(inquiry.id, 'closed')}
                    className="px-3 py-1.5 border border-border-subtle font-mono text-[10px] uppercase text-text-secondary/50 hover:text-text-secondary transition-all"
                    style={{ borderRadius: '2px' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
