"use client";

import { useEffect, useState, useCallback } from "react";
import { getManagedOrders, updateOrderStatus, deleteOrder } from "../../admin/api";
import { getUsersByIds } from "../../admin/api";
import OrderManagementCard from "./OrderManagementCard";

export default function OrderManagementList() {
  const [orders, setOrders] = useState([]);
  const [buyerNames, setBuyerNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getManagedOrders();
      setOrders(data);

      const buyerMap = await getUsersByIds(data.map((o) => o.buyerId));
      const names = {};
      buyerMap.forEach((user, id) => {
        names[id] =
          user.fullName ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
      });
      setBuyerNames(names);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  async function handleStatusChange(orderId, status) {
    setUpdatingId(orderId);
    const prevOrders = orders;
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    try {
      await updateOrderStatus(orderId, status);
    } catch {
      setOrders(prevOrders);
      setError("Couldn't update status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(orderId) {
    const prevOrders = orders;
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      await deleteOrder(orderId);
    } catch {
      setOrders(prevOrders);
      setError("Couldn't delete order. Try again.");
    }
  }

  if (loading) return <p className="text-sm text-gray-500 px-5 py-4">Loading orders...</p>;
  if (error) return <p className="text-sm text-red-600 px-5 py-4">{error}</p>;
  if (orders.length === 0) return <p className="text-sm text-gray-500 px-5 py-4">No orders yet.</p>;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderManagementCard
          key={order.id}
          order={order}
          buyerName={buyerNames[order.buyerId]}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          isUpdating={updatingId === order.id}
        />
      ))}
    </div>
  );
}