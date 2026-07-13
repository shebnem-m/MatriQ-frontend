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

export const getAllReviews = async () => {
  return await apiFetch("/reviews", {
    method: 'GET'
  });
};

export const deleteReview = async (id) => {
  return await apiFetch(`/reviews/${id}`, {
    method: 'DELETE',
  });
};