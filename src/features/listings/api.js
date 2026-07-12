import { apiFetch } from '@/src/lib/apiClient';

export const fetchListings = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const path = `/listings${queryParams ? `?${queryParams}` : ''}`;
  
  const data = await apiFetch(path, {
    method: 'GET'
  });

  return data.content || [];
};