import React, { useState } from 'react';

export default function SupplierVerificationTable({ suppliers, onAddSupplier }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(suppliers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = suppliers.slice(startIndex, startIndex + itemsPerPage);

  // Use dates from mock data or formatted specifically
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-chalk text-ink font-body">
      {/* Header section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-display font-600 text-3xl mb-1">Suppliers</h1>
          <p className="text-ink/60 text-sm">Verify and manage supplier applications</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onAddSupplier} className="flex items-center gap-2 px-4 py-2 bg-rust text-chalk rounded-sm font-medium text-sm hover:bg-rust/90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Supplier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ink/10 mb-6 gap-6">
        <button className="py-3 px-1 text-ink/60 font-medium text-sm hover:text-ink">
          All Suppliers <span className="ml-1 bg-ink/5 text-ink/60 px-2 py-0.5 rounded-sm font-mono text-[10px]">56</span>
        </button>
        <button className="py-3 px-1 text-rust font-medium text-sm border-b-2 border-rust">
          Pending <span className="ml-1 bg-[#FDF1E8] text-rust px-2 py-0.5 rounded-sm font-mono text-[10px]">12</span>
        </button>
        <button className="py-3 px-1 text-ink/60 font-medium text-sm hover:text-ink">
          Approved <span className="ml-1 bg-ink/5 text-ink/60 px-2 py-0.5 rounded-sm font-mono text-[10px]">40</span>
        </button>
        <button className="py-3 px-1 text-ink/60 font-medium text-sm hover:text-ink">
          Rejected <span className="ml-1 bg-ink/5 text-ink/60 px-2 py-0.5 rounded-sm font-mono text-[10px]">4</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative w-64">
          <svg className="absolute left-3 top-2.5 text-ink/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search suppliers..." 
            className="w-full pl-9 pr-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none focus:border-rust"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none cursor-pointer">
            <option>All Categories</option>
          </select>
          <select className="px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none cursor-pointer">
            <option>All Status</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm hover:bg-ink/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            All Time
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-paper border border-ink/10 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ink/10 bg-paper2/50">
              <th className="font-display font-600 text-xs py-4 px-6 text-ink/80">Supplier</th>
              <th className="font-display font-600 text-xs py-4 px-6 text-ink/80">Company Info</th>
              <th className="font-display font-600 text-xs py-4 px-6 text-ink/80">Applied On</th>
              <th className="font-display font-600 text-xs py-4 px-6 text-ink/80">Status</th>
              <th className="font-display font-600 text-xs py-4 px-6 text-ink/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.map((supplier, idx) => (
              <tr key={supplier.id} className="border-b border-ink/10 hover:bg-paper2/20">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ink text-chalk flex items-center justify-center font-display font-600 text-lg">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display font-600 text-sm text-ink">{supplier.name}</p>
                      <p className="text-xs text-ink/60">{supplier.categories[0]}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-xs text-ink/80 mb-1">{supplier.email}</p>
                  <p className="text-xs text-ink/80 mb-1">{supplier.phone}</p>
                  <p className="text-xs text-ink/60 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {supplier.location}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-ink/80">{formatDate(supplier.appliedOn)}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-[#FDF1E8] text-rust px-3 py-1 rounded-sm text-xs font-medium">
                    {supplier.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center border border-[#10B981]/30 text-[#10B981] rounded-sm hover:bg-[#10B981]/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-[#EF4444]/30 text-[#EF4444] rounded-sm hover:bg-[#EF4444]/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-ink/20 text-ink rounded-sm hover:bg-ink/5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-ink/60">
          Showing {Math.min(startIndex + 1, suppliers.length)} to {Math.min(startIndex + itemsPerPage, suppliers.length)} of {suppliers.length} applications
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center border border-ink/10 rounded-sm hover:bg-paper2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-sm font-medium text-sm ${
                currentPage === i + 1 
                  ? 'bg-rust text-chalk' 
                  : 'border border-ink/10 hover:bg-paper2'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border border-ink/10 rounded-sm hover:bg-paper2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
