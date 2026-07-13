import React from 'react';

export default function SupplierProfileLayout({ children, supplierName }) {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Profile Header */}
      <div className="bg-paper border-b border-ink/10 pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-4">
            Supplier Profile
          </p>
          <h1 className="font-display font-700 text-4xl text-ink">
            {supplierName || 'Supplier Profile'}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  );
}
