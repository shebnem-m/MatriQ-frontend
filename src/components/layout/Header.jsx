"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  
  // Safe role check
  const userRole = isAuthenticated ? (user?.role?.toLowerCase() || 'admin') : 'guest';
  const pathname = usePathname();
  
  // Admin pages have their own navbar (AdminNavbar)
  if (pathname?.startsWith('/admin')) return null;

  // Prevent flash of wrong header during initial auth check
  if (loading) return <header className="h-[73px] border-b border-ink/10 bg-paper/95 sticky top-0 backdrop-blur z-50" />;

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
          {!isAuthenticated && (
            <>
              <Link href="/login" className="text-sm font-body text-ink/70 hover:text-ink">
                Log In
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-rust text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </>
          )}

          {isAuthenticated && userRole === 'supplier' && (
            <>
              <span className="text-sm font-mono text-steel">Supplier Portal</span>
              <Link href="/suppliers/dashboard" className="px-5 py-2.5 bg-rust text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Dashboard
              </Link>
              <button onClick={logout} className="text-sm font-body text-ink/70 hover:text-ink ml-2">Log Out</button>
            </>
          )}

          {isAuthenticated && userRole === 'admin' && (
            <>
              <span className="text-sm font-mono text-steel">Admin</span>
              <Link href="/admin/suppliers" className="px-5 py-2.5 bg-ink text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                Admin Panel
              </Link>
              <button onClick={logout} className="text-sm font-body text-ink/70 hover:text-ink ml-2">Log Out</button>
            </>
          )}

          {isAuthenticated && userRole !== 'admin' && userRole !== 'supplier' && (
             <>
               <span className="text-sm font-mono text-steel">User</span>
               <Link href="/profile" className="px-5 py-2.5 bg-ink text-chalk rounded-sm font-medium text-sm hover:opacity-90 transition-opacity">
                 My Profile
               </Link>
               <button onClick={logout} className="text-sm font-body text-ink/70 hover:text-ink ml-2">Log Out</button>
             </>
          )}
        </div>
      </div>
    </header>
  );
}
