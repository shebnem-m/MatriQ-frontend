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
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.errors?.length ? data.errors.join(", ") : data?.message || `Request failed (${res.status})`;
    
    if (res.status === 401) {
       console.error("İcazə yoxdur, token etibarsızdır.");
    }
    
    throw new Error(message);
  }

  return data;
}