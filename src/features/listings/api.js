import { apiFetch } from '@/src/lib/apiClient';

export const fetchListings = async (filters = {}) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== "" && v !== null)
  );

  const queryParams = new URLSearchParams(cleanFilters).toString();
  
  const hasFilters = Object.keys(cleanFilters).length > 0;
  const path = hasFilters ? `/listings/search?${queryParams}` : `/listings`;
  
  const data = await apiFetch(path, {
    method: 'GET'
  });

  return data.content || data || [];
};

export const deleteListing = async (id) => {
  return await apiFetch(`/listings/${id}`, {
    method: 'DELETE',
  });
};

export const updateListing = async (id, listingData) => {
  return await apiFetch(`/listings/${id}`, {
    method: 'PUT',
    body: listingData, 
  });
};

export const createOrder = async (orderData) => {
  return await apiFetch("/orders", {
    method: "POST",
    body: orderData,
  });
};