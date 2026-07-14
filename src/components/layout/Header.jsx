"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  // Mocking role-based dynamic state for now until frontend-auth is merged
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'supplier', 'admin'
  const pathname = usePathname();

  // Admin pages have their own navbar (AdminNavbar)
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="border-b border-ink/10 bg-paper/95 sticky top-0 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display font-700 text-2xl tracking-tight text-ink">MatriQ</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-body text-ink/70">
            <Link href="/listings" className="hover:text-ink transition-colors">Listings</Link>
            <Link href="/suppliers" className="hover:text-ink transition-colors">Suppliers</Link>
          </nav>
        </div>

        {/* Right: Dynamic Role-based Actions */}
        <div className="flex items-center gap-4">
          {userRole === 'guest' && (
            <>
              <button className="text-sm font-body text-ink/70 hover:text-ink">Log In</button>
              <button className="px-5 py-2.5 bg-rust text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Sign Up
              </button>
            </>
          )}

          {userRole === 'supplier' && (
            <>
              <span className="text-sm font-mono text-steel">Supplier Portal</span>
              <button className="px-5 py-2.5 bg-rust text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Dashboard
              </button>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <span className="text-sm font-mono text-steel">Admin</span>
              <Link href="/admin/suppliers" className="px-5 py-2.5 bg-ink text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Admin Panel
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
