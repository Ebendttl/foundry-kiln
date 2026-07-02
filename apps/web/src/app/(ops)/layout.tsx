'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/overview', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/record', label: 'Record', icon: 'M12 4v16m8-8H4' },
  { href: '/leads', label: 'Leads', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/budgets', label: 'Budgets', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { href: '/modules/the-booth', label: 'The Booth', color: '#7B2FF7' },
  { href: '/modules/the-line', label: 'The Line', color: '#E4002B' },
  { href: '/modules/the-roast', label: 'The Roast', color: '#C08A3E' },
  { href: '/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { href: '/admin', label: 'Admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

function OpsNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface-secondary border-r-2 border-border-subtle min-h-screen">
      {/* Logo */}
      <div className="p-4 border-b-2 border-border-subtle">
        <Link href="/overview" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foundry-orange border-2 border-foundry-black flex items-center justify-center" style={{ borderRadius: '2px' }}>
            <span className="font-display font-bold text-foundry-black text-sm">K</span>
          </div>
          <div>
            <span className="font-display font-bold text-sm uppercase text-foundry-concrete block leading-none">Kiln Ops</span>
            <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest">Foundry Collective</span>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                isActive
                  ? 'bg-surface-tertiary text-foundry-orange border-l-2 border-foundry-orange -ml-px'
                  : 'text-text-secondary hover:text-foundry-concrete hover:bg-surface-tertiary'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {item.color ? (
                <span className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: item.color, borderRadius: '1px' }} />
              ) : item.icon ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0"><path d={item.icon} /></svg>
              ) : null}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t-2 border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-tertiary border-2 border-border-subtle flex items-center justify-center font-display font-bold text-xs text-foundry-concrete" style={{ borderRadius: '2px' }}>
            FC
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-xs font-bold text-foundry-concrete truncate">Foundry Admin</p>
            <p className="font-mono text-[9px] text-text-secondary uppercase">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-primary">
      <OpsNav />
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 bg-surface-secondary border-b-2 border-border-subtle px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-foundry-orange flex items-center justify-center" style={{ borderRadius: '2px' }}>
              <span className="font-display font-bold text-foundry-black text-xs">K</span>
            </div>
            <span className="font-display font-bold text-sm uppercase text-foundry-concrete">Kiln Ops</span>
          </div>
          <button className="p-1.5 text-text-secondary" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
