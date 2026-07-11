"use client";

import { useState } from "react";
import { cancelOrder } from "@/app/orders/api";

export default function CancelOrderButton({
  orderId,
  onCancelled,
}) {
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const updatedOrder = await cancelOrder(orderId);

      onCancelled(updatedOrder);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="
        rounded-lg
        border
        border-red-200
        bg-red-50
        px-4
        py-2
        text-sm
        font-medium
        text-red-700
        transition
        hover:bg-red-100
        disabled:opacity-50
      "
    >
      {loading ? "Cancelling..." : "Cancel"}
    </button>
  );
}