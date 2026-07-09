"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function LogoutButton({
  children = "Logout",
  className = "",
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      await logout();

      // Send user to homepage after cookie removal
      router.push("/");
      
      // Optional: refresh server components
      router.refresh();

    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-stone-300
        bg-white
        px-4
        py-2.5
        text-sm
        font-medium
        text-stone-700
        transition-all
        hover:border-rust
        hover:text-rust
        hover:shadow-sm
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      <span>{loading ? "..." : "↩"}</span>
      {loading ? "Logging out..." : children}
    </button>
  );
}