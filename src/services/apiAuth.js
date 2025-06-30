const BASE = import.meta.env.VITE_API_BASE_URL;

export async function login(userName, password) {
  const res = await fetch(`${BASE}/api/Authentication/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }
  return res.text(); // returns the JWT as plain text
}

export function authFetch(path, opts = {}) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined
    }
  });
}
