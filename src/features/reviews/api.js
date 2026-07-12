import { apiFetch } from '@/src/lib/apiClient';

export const fetchReviewsByListing = async (listingId) => {
  return await apiFetch(`/listings/${listingId}/reviews`, {
    method: 'GET'
  });
};

export const addReview = async (listingId, reviewData) => {
  return await apiFetch(`/listings/${listingId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};