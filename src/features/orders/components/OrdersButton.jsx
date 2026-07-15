// components/OrdersButton.jsx
"use client";

import { useRouter } from "next/navigation";

export default function OrdersButton({ className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/orders")}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full
        bg-rust hover:bg-orange-600 active:bg-orange-700
        text-white font-mono text-[11px] tracking-[0.18em] uppercase
        transition-colors ${className}`}
    >
      My Orders
    </button>
  );
}