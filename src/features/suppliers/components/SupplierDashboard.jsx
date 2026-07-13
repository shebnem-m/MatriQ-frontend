import React from 'react';

export default function SupplierDashboard({ supplier }) {
  // A placeholder dashboard for the supplier to view their own profile
  return (
    <div className="bg-paper min-h-[500px] p-8 rounded-sm border border-ink/10">
      <h2 className="font-display font-600 text-2xl mb-6">Supplier Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-paper2 p-6 rounded-sm border border-ink/10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-2">Profile Status</p>
          <p className="font-display font-600 text-xl text-ink">
            {supplier?.status || 'Pending'}
          </p>
        </div>
        <div className="bg-paper2 p-6 rounded-sm border border-ink/10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-2">Documents Uploaded</p>
          <p className="font-display font-600 text-xl text-ink">
            {supplier?.documentsCount || 0}
          </p>
        </div>
        <div className="bg-paper2 p-6 rounded-sm border border-ink/10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-steel uppercase mb-2">Active Listings</p>
          <p className="font-display font-600 text-xl text-ink">0</p>
        </div>
      </div>

      <div className="bg-chalk p-6 border border-ink/10 rounded-sm">
        <h3 className="font-display font-600 text-lg mb-4">Company Details</h3>
        <div className="space-y-3">
          <p className="text-sm"><span className="font-mono text-steel inline-block w-24">COMPANY:</span> {supplier?.name || 'Your Company'}</p>
          <p className="text-sm"><span className="font-mono text-steel inline-block w-24">EMAIL:</span> {supplier?.email || 'email@example.com'}</p>
          <p className="text-sm"><span className="font-mono text-steel inline-block w-24">PHONE:</span> {supplier?.phone || '+994 xx xxx xx xx'}</p>
        </div>
      </div>
    </div>
  );
}
