import { apiFetch } from "@/src/lib/apiClient";

export const createOrder = ({ listingId, quantity }, buyerId) =>
  apiFetch(`/orders?buyerId=${buyerId}`, {
    method: "POST",
    body: { listingId, quantity },
  });

export const getMyOrders = (userId, page = 0, size = 10) =>
  apiFetch(
    `/users/${userId}/orders?page=${page}&size=${size}`
  );

export const getOrderById = (orderId) =>
  apiFetch(`/orders/${orderId}`);

export const cancelOrder = (id) =>
  apiFetch(`/orders/${id}/cancel`, {
    method: "PUT",
  });