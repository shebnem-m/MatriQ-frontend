"use client";

import React, { useEffect, useState } from 'react';
import SupplierVerificationTable from '@/src/features/suppliers/components/SupplierVerificationTable';
import { fetchSuppliers } from '@/src/features/suppliers/api';

export default function AdminSuppliersPage() {
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

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <p className="font-mono text-ink/50 text-sm">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-chalk p-8">
      <div className="max-w-7xl mx-auto">
        <SupplierVerificationTable suppliers={suppliers} />
      </div>
    </div>
  );
}