const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // 401 xətası aldıqda:
  if (res.status === 401) {
    // 1. Tokeni silirik
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      
      // 2. İstifadəçini login səhifəsinə yönləndiririk
      // Yalnız login səhifəsində deyilsənsə yönləndir
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    throw new Error("Sessiyanız bitib, zəhmət olmasa yenidən daxil olun.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.errors?.length ? data.errors.join(", ") : data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}