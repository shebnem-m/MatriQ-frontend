import { apiFetch } from "@/src/lib/apiClient";

const userCache = new Map();

export async function getUserById(userId) {
  if (userCache.has(userId)) return userCache.get(userId);

  const user = await apiFetch(`/users/${userId}`, { method: "GET" });
  userCache.set(userId, user);
  return user;
}

// Fetches only the distinct ids, in parallel, and never lets one
// failed lookup break the whole batch.
export async function getUsersByIds(userIds) {
  const uniqueIds = [...new Set(userIds)];
  const results = await Promise.all(
    uniqueIds.map((id) =>
      getUserById(id).catch(() => ({ id, fullName: "Unknown buyer" }))
    )
  );
  const map = new Map();
  results.forEach((u) => map.set(u.id, u));
  return map;
}



export async function getManagedOrders() {
  const data = await apiFetch("/orders", { method: "GET" });
  return data.content ?? data; // handles Page<T> wrapping
}

export async function updateOrderStatus(orderId, status) {
  return apiFetch(`/orders/${orderId}/status`, {
    method: "PUT",
    body: { "status": status },
  });
}

export async function deleteOrder(orderId) {
  await apiFetch(`/orders/${orderId}`, { method: "DELETE" });
}