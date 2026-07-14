const API_BASE = "http://localhost:8080";
import { apiFetch } from '@/src/lib/apiClient';

export const fetchReviewsByListing = async (listingId) => {
  return await apiFetch(`/listings/${listingId}/reviews`, {
    method: 'GET'
  });
};

export const addReview = async (listingId, reviewData) => {
  const url = `${API_BASE}/listings/${listingId}/reviews`;
  
  console.log("🔗 Sorğu URL:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(reviewData),
  });

  console.log("📡 Status:", response.status);

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.log("Raw response:", await response.text());
    }
    console.error("Backend Error:", errorData);
    throw new Error(errorData.message || `Xəta (${response.status})`);
  }

  return response.json();
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