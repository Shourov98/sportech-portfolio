// utils/api.js
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let msg = "Request failed";
    try {
      const j = await res.json();
      msg = j && j.message ? j.message : msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
}
