'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', type: 'contact' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-surface-primary py-20 min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-mono text-foundry-orange block mb-3">Get in Touch</span>
        <h1 className="heading-foundry text-5xl text-foundry-concrete mb-6">Contact Us</h1>
        <p className="text-text-secondary mb-10 font-body">
          Have a general inquiry, want to partner with us, or need to discuss a custom production run? Drop us a line below or reach out via WhatsApp.
        </p>

        {submitted ? (
          <div className="p-8 border-2 border-foundry-orange bg-surface-secondary text-center" style={{ borderRadius: '2px' }}>
            <h2 className="heading-foundry text-2xl text-foundry-concrete mb-4">Message Sent</h2>
            <p className="text-text-secondary mb-6">Thank you. A member of our floor team will follow up with you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="btn-foundry">Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="input-label">Your Name *</label>
                <input
                  type="text"
                  required
                  className="input-foundry"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Your Email *</label>
                <input
                  type="email"
                  required
                  className="input-foundry"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="input-label">Inquiry Type</label>
              <select
                className="input-foundry"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="contact">General Inquiry</option>
                <option value="studio_booking">Studio Booking Inquiry</option>
                <option value="merch_quote">Custom Printing Quote</option>
                <option value="wholesale_coffee">Wholesale Coffee Beans</option>
                <option value="makers_row">Maker&apos;s Row Updates</option>
              </select>
            </div>

            <div>
              <label className="input-label">Your Message *</label>
              <textarea
                required
                rows={5}
                className="input-foundry"
                placeholder="How can we help?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-foundry w-full">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
