// src/utils/api.js

// Base URL comes from your .env.local
// NEXT_PUBLIC_API_URL=https://api.yourdomain.com
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Internal request helper
 * - Adds JSON Content-Type automatically (unless you pass FormData)
 * - Optionally includes Authorization: Bearer <token>
 * - Throws an Error with a friendly message on non-2xx
 * - Returns parsed JSON when available, otherwise text/null
 */
async function request(
  path,
  { method = "GET", body, headers, auth = false } = {}
) {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const token =
    auth && typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body,
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      msg = j?.message || j?.error || msg;
    } catch {
      // ignore parse error; keep default msg
    }
    throw new Error(msg);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return res.json();
  }
  const text = await res.text();
  return text || null;
}

/**
 * For public/unauthenticated endpoints (login, forgot-password, verify-otp, reset-password)
 * Example:
 *   apiFetch("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
 */
export function apiFetch(path, options) {
  return request(path, { ...(options || {}), auth: false });
}

/**
 * For authenticated endpoints (dashboard data, change-password, etc.)
 * Example:
 *   authFetch("/admin/home", { method: "GET" })
 *   authFetch("/auth/change-password", { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) })
 */
export function authFetch(path, options) {
  return request(path, { ...(options || {}), auth: true });
}
