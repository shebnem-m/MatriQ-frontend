import { SupplierStatus, SupplierCategories } from './types';
import { apiFetch } from '@/lib/apiClient';

// Maps backend Spring Boot DTO to our Frontend component needs
const mapSupplierData = (backendSupplier) => ({
  id: backendSupplier.id,
  name: backendSupplier.name || 'Unknown',
  email: backendSupplier.email || 'No email provided',
  phone: backendSupplier.phoneNumber || 'No phone provided',
  location: backendSupplier.address || 'Unknown Location',
  // Faking missing backend fields to prevent UI crashes:
  categories: [SupplierCategories.BUILDING_MATERIALS], 
  appliedOn: backendSupplier.createdAt || new Date().toISOString(),
  documentsCount: 0,
  status: SupplierStatus.PENDING, 
});

export const fetchSuppliers = async () => {};

export const fetchSupplierById = async (id) => {};

export const updateSupplierStatus = async (id, status) => {};
