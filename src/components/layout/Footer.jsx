import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-auto bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display font-700 text-2xl tracking-tight text-ink">MatriQ</span>
            </Link>
            <p className="text-sm font-body text-ink/70 leading-relaxed max-w-xs">
              The industrial marketplace for verified source materials and trusted suppliers.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <span className="block font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-4">Platform</span>
            <ul className="space-y-3 text-sm font-body text-ink/70">
              <li><Link href="/listings" className="hover:text-ink transition-colors">Browse Materials</Link></li>
              <li><Link href="/suppliers" className="hover:text-ink transition-colors">Supplier Directory</Link></li>
              <li><Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-4">Company</span>
            <ul className="space-y-3 text-sm font-body text-ink/70">
              <li><Link href="/info#about" className="hover:text-ink transition-colors">About Us</Link></li>
              <li><Link href="/info#careers" className="hover:text-ink transition-colors">Careers</Link></li>
              <li><Link href="/info#contact" className="hover:text-ink transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="block font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-4">Legal</span>
            <ul className="space-y-3 text-sm font-body text-ink/70">
              <li><Link href="/terms" className="hover:text-ink transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link></li>
              <li><Link href="/guidelines" className="hover:text-ink transition-colors">Verification Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-wide text-stone uppercase">
            &copy; {new Date().getFullYear()} MatriQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-stone">
            <span className="font-mono text-[10px] uppercase tracking-wide">System Status: All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
