import React, { useState } from 'react';
import Button from '@/src/components/ui/Button';
import { createSupplier } from '../api';

export default function AddSupplierModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createSupplier(formData);
      setLoading(false);
      onSuccess(); // Refresh the list and close modal
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create supplier. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm">
      <div className="bg-paper p-8 rounded-sm shadow-xl max-w-md w-full border border-ink/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display font-600 text-2xl text-ink">Add New Supplier</h2>
          <button onClick={onClose} className="text-ink/60 hover:text-ink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#EF4444]/10 text-[#EF4444] rounded-sm text-sm border border-[#EF4444]/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Company Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none focus:border-rust"
              placeholder="e.g. Acme Build Materials"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none focus:border-rust"
              placeholder="contact@acme.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none focus:border-rust"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Address/Location</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-paper border border-ink/10 rounded-sm text-sm focus:outline-none focus:border-rust"
              placeholder="123 Industrial Pkwy, City, State"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Supplier'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
