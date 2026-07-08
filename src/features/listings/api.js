import { apiFetch } from '@/lib/apiClient';

export const fetchListings = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const path = `/api/listings${queryParams ? `?${queryParams}` : ''}`;
  
  return apiFetch(path, { 
    method: 'GET' 
  });
};