import { apiFetch } from "@/src/lib/apiClient";

export const getUsers = (page = 0, size = 10) =>
  apiFetch(`/users?page=${page}&size=${size}`);

export const getUserById = (id) =>
  apiFetch(`/users/${id}`);

export const createUser = (data) =>
  apiFetch(`/users`, { method: "POST", body: data });

export const updateUser = (id, data) =>
  apiFetch(`/users/${id}`, { method: "PUT", body: data });

export const deleteUser = (id) =>
  apiFetch(`/users/${id}`, { method: "DELETE" });

export const getUserOrders = (id, page = 0, size = 10) =>
  apiFetch(`/users/${id}/orders?page=${page}&size=${size}`);