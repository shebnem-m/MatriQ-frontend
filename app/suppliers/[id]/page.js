"use client";

import React, { useEffect, useState } from 'react';
import SupplierProfileLayout from '@/src/features/suppliers/components/SupplierProfileLayout';
import { fetchSupplierById } from '@/src/features/suppliers/api';

export default function SupplierProfilePage({ params }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams?.id;
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function load() {
      if (id) {
        const data = await fetchSupplierById(id);
        setSupplier(data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <SupplierProfileLayout supplierName="Loading...">
      <div className="py-20 text-center font-mono text-ink/50">Loading profile...</div>
    </SupplierProfileLayout>;
  }

  if (!supplier) {
    return <SupplierProfileLayout supplierName="Not Found">
      <div className="py-20 text-center text-ink/50">Supplier not found.</div>
    </SupplierProfileLayout>;
  }

  return (
    <SupplierProfileLayout supplierName={supplier.name}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-paper p-8 rounded-sm border border-ink/10">
            <h2 className="font-display font-600 text-xl mb-4">About</h2>
            <p className="text-ink/80 leading-relaxed">
              {supplier.name} is a verified provider of {supplier.categories.join(', ')}. 
              They are located in {supplier.location} and have been a part of MatriQ since {new Date(supplier.appliedOn).getFullYear()}.
            </p>
          </section>
        </div>
        
        <div className="space-y-6">
          <div className="bg-paper2 p-6 rounded-sm border border-ink/10">
            <h3 className="font-display font-600 mb-4">Contact Info</h3>
            <p className="text-sm mb-2"><span className="font-mono text-steel inline-block w-16">EMAIL</span> {supplier.email}</p>
            <p className="text-sm mb-2"><span className="font-mono text-steel inline-block w-16">PHONE</span> {supplier.phone}</p>
            <p className="text-sm"><span className="font-mono text-steel inline-block w-16">LOC</span> {supplier.location}</p>
          </div>
        </div>
      </div>
    </SupplierProfileLayout>
  );
}
