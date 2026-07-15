"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function ProtectedRoute({ children, requiredRole, requiredRoles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Normalize both props into a single list of allowed roles (empty = no role restriction)
  const allowedRoles = requiredRoles ?? (requiredRole ? [requiredRole] : []);

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          This page requires {allowedRoles.length > 1 ? "one of the following roles" : "the"}{" "}
          "{allowedRoles.join('", "')}"{allowedRoles.length > 1 ? " roles" : " role"}.
        </p>
      </div>
    );
  }

  return children;
}