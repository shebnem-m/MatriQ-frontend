"use client";

import React, { useEffect, useState } from 'react';
import SupplierDashboard from '@/src/features/suppliers/components/SupplierDashboard';
import { fetchSuppliers } from '@/src/features/suppliers/api';

export default function SupplierDashboardPage() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Safely fetch the first available supplier instead of hardcoding '1' (which breaks UUID databases)
      const allSuppliers = await fetchSuppliers();
      if (allSuppliers && allSuppliers.length > 0) {
        setSupplier(allSuppliers[0]);
      } else {
        setSupplier(null);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-8 font-mono text-ink/50 text-sm">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <SupplierDashboard supplier={supplier} />
    </div>
  );
}
