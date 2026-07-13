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

export const fetchSuppliers = async () => {
  try {
    // Spring Boot paginated response places the array in 'content'
    const data = await apiFetch('/suppliers');
    const suppliersArray = data?.content || [];
    return suppliersArray.map(mapSupplierData);
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    return []; // Return empty array on error so UI doesn't crash
  }
};

export const fetchSupplierById = async (id) => {
  try {
    const backendSupplier = await apiFetch(`/suppliers/${id}`);
    return mapSupplierData(backendSupplier);
  } catch (error) {
    console.error(`Failed to fetch supplier ${id}:`, error);
    return null;
  }
};

export const updateSupplierStatus = async (id, status) => {};
