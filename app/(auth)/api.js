import { apiFetch } from "@/src/lib/apiClient";

export const login = (credentials) =>
  apiFetch("/auth/login", { method: "POST", body: credentials });

export const register = (payload) =>
  apiFetch("/auth/register", { method: "POST", body: payload });

export const logout = () =>
  apiFetch("/auth/logout", { method: "POST" });

export const getMe = () =>
  apiFetch("/auth/me");