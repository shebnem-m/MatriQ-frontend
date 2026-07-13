"use client";

import React, { useEffect, useState } from 'react';
import SupplierDashboard from '@/src/features/suppliers/components/SupplierDashboard';
import { fetchSupplierById } from '@/src/features/suppliers/api';

export default function SupplierDashboardPage() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // In a real app, this would use the logged-in user's ID
      const data = await fetchSupplierById('1');
      setSupplier(data);
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
