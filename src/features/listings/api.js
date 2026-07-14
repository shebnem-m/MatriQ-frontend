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

export const updateListing = async (id, listingData, file = null) => {
  const formData = new FormData();
  
  formData.append(
    "listing", 
    new Blob([JSON.stringify(listingData)], { type: "application/json" })
  );
  
  if (file) {
    formData.append("file", file);
  }

  return await apiFetch(`/listings/${id}`, {
    method: 'PUT',
    body: formData, 
  });
};

export const createListing = async (listingData, file) => {
  const formData = new FormData();
  formData.append(
    "listing",
    new Blob([JSON.stringify(listingData)], { type: "application/json" })
  );
  if (file) {
    formData.append("file", file);
  }

  return await apiFetch(`/listings`, {
    method: "POST",
    body: formData,
  });
};

export const createOrder = async (orderData) => {
  return await apiFetch(`/orders?buyerId=${orderData.buyerId}`, {
    method: "POST",
    body: { listingId: orderData.listingId, quantity: orderData.quantity },
  });
};