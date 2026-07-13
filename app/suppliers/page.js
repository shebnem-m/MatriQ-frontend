"use client";

import React, { useEffect, useState } from 'react';
import SupplierCard from '@/src/features/suppliers/components/SupplierCard';
import { fetchSuppliers } from '@/src/features/suppliers/api';

export default function SuppliersDirectoryPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchSuppliers();
      setSuppliers(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-display font-600 text-4xl text-ink mb-2">Verified Suppliers</h1>
          <p className="text-ink/60 max-w-2xl">
            Browse our directory of verified construction materials suppliers.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-ink/50 font-mono text-sm">Loading suppliers...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {suppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
