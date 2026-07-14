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

// Əgər backend @RequestParam gözləyirsə, ID-ni URL-ə əlavə edin
export const createOrder = async (orderData) => {
  // orderData içindən listingId və quantity-ni götürürük
  // buyerId-ni isə URL-ə əlavə edirik (backend-dən necə tələb olunduğuna baxın)
  return await apiFetch(`/orders?buyerId=${orderData.buyerId}`, {
    method: "POST",
    body: { listingId: orderData.listingId, quantity: orderData.quantity },
  });
};