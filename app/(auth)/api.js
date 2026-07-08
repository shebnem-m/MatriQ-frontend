import { apiFetch } from "@/src/lib/apiClient";

export const login = (credentials) =>
  apiFetch("/api/auth/login", { method: "POST", body: credentials });

export const register = (payload) =>
  apiFetch("/api/auth/register", { method: "POST", body: payload });

export const logout = () =>
  apiFetch("/api/auth/logout", { method: "POST" });

export const getMe = () =>
  apiFetch("/api/auth/me");