const BASE_URL =
  typeof window === "undefined"
    ? (process.env.INTERNAL_API_URL || "http://localhost:8080")
    : (process.env.NEXT_PUBLIC_API_URL || "/api");

export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
  };

  
  if (options.body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
    body: isFormData
      ? options.body
      : (options.body ? JSON.stringify(options.body) : undefined),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      message:
        data?.errors?.join(", ") ||
        data?.message ||
        `Request failed (${response.status})`,
    };
  }

  return data;
}