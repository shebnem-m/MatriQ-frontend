"use client";

import React, { useEffect, useState, useCallback } from 'react';
import SupplierVerificationTable from '@/src/features/suppliers/components/SupplierVerificationTable';
import AddSupplierModal from '@/src/features/suppliers/components/AddSupplierModal';
import { fetchSuppliers, deleteSupplier } from '@/src/features/suppliers/api';

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchSuppliers();
    setSuppliers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDeleteSupplier = async (id) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      await deleteSupplier(id);
      load(); // Refresh the list
    }
  };

  if (loading && suppliers.length === 0) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <p className="font-mono text-ink/50 text-sm">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-chalk p-8">
      <div className="max-w-7xl mx-auto">
        <SupplierVerificationTable 
          suppliers={suppliers} 
          onAddSupplier={() => setIsModalOpen(true)}
          onDeleteSupplier={handleDeleteSupplier}
        />
      </div>
      <AddSupplierModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          setIsModalOpen(false);
          load(); // Refresh the list
        }} 
      />
    </div>
  );
}