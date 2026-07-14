import React from 'react';
import Link from 'next/link';

export default function SupplierCard({ supplier }) {
  const isVerified = supplier.status === 'Approved';

  return (
    <div className="bg-paper rounded-sm overflow-hidden border border-ink/10 flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-md">
      {/* Top Banner / Swatch */}
      <div className="h-24 bg-paper2 flex items-end p-4 border-b border-ink/10 relative">
        <h3 className="font-display font-600 text-lg text-ink truncate w-full">
          {supplier.name}
        </h3>
        {isVerified && (
          <div className="absolute top-3 right-3 text-rust">
            {/* Simple Verification Stamp */}
            <span className="stamp w-10 h-10 flex items-center justify-center font-mono text-[9px] rotate-[-8deg] border border-rust rounded-full opacity-80">
              OK
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-mono text-xs text-stone mb-4 uppercase tracking-[0.18em]">
          {supplier.categories[0] || 'Supplier'}
        </p>

        <div className="space-y-2 mb-6 flex-1">
          <p className="text-sm text-ink/80 flex items-center gap-2">
            <span className="font-mono text-xs text-steel w-16">LOC</span>
            {supplier.location}
          </p>
          <p className="text-sm text-ink/80 flex items-center gap-2">
            <span className="font-mono text-xs text-steel w-16">EMAIL</span>
            <span className="truncate">{supplier.email}</span>
          </p>
        </div>

        <Link href={`/suppliers/${supplier.id}`} className="block text-center w-full py-2 border border-ink/25 text-ink/80 font-medium text-sm rounded-sm hover:bg-ink/5 transition-colors">
          View Profile
        </Link>
      </div>
    </div>
  );
}
