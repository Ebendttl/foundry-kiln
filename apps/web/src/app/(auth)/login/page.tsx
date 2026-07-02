'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: Supabase auth.signInWithPassword
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-foundry-orange border-2 border-foundry-black mx-auto mb-4 flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <span className="font-display font-bold text-foundry-black text-xl">K</span>
          </div>
          <h1 className="heading-foundry text-2xl text-foundry-concrete mb-1">Kiln Ops</h1>
          <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">Foundry Collective Limited</p>
        </div>

        {/* Login form */}
        <div className="border-2 border-border-subtle bg-surface-secondary p-8" style={{ borderRadius: '2px' }}>
          <h2 className="heading-foundry text-xl text-foundry-concrete mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="input-label">Email</label>
              <input type="email" required className="input-foundry" placeholder="you@foundrycollective.ng" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="input-label">Password</label>
              <input type="password" required className="input-foundry" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" disabled={loading} className="btn-foundry w-full">
              {loading ? (
                <div className="waveform-loader" style={{ height: '16px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="waveform-bar" style={{ width: '3px', backgroundColor: '#121212' }} />
                  ))}
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="divider-tear" />

          <button className="btn-foundry-outline w-full flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="font-mono text-xs text-text-secondary uppercase tracking-widest hover:text-foundry-orange transition-colors">
            ← Back to Foundry
          </Link>
        </p>
      </div>
    </div>
  );
}
