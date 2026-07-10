"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi, getMe } from "@/app/(auth)/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null)) // not logged in on load — expected, not an error
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await loginApi({ email, password }); // let the real backend message surface
    setUser(data); // store the user, never the token
  }

  async function logout() {
    await logoutApi();
    setUser(null);
  }

  const value = { user, isAuthenticated: !!user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
