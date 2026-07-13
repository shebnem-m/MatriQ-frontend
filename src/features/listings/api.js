import { apiFetch } from '@/src/lib/apiClient';

export const fetchListings = async (filters = {}) => {
  // Əgər 'filters' obyektindəki 'title' boşdursa, onu URL-dən təmizləmək üçün
  // boş string-ləri silirik
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== "" && v !== null)
  );

  const queryParams = new URLSearchParams(cleanFilters).toString();
  
  // Əgər filter varsa, '/listings/search', yoxdursa standart '/listings' çağırmaq daha məntiqlidir
  const hasFilters = Object.keys(cleanFilters).length > 0;
  const path = hasFilters ? `/listings/search?${queryParams}` : `/listings`;
  
  const data = await apiFetch(path, {
    method: 'GET'
  });

  // Backend-dən Page obyekti gəldiyi üçün 'data.content' (məhsullar siyahısı) 
  // və ya 'data' (əgər Pageable istifadə etmirsinizsə) qayıdır.
  return data.content || data || [];
};
