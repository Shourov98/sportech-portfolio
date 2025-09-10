// app/change-password/page.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordField from "@/components/auth/PasswordField";
import { apiFetch } from "@/utils/api";
import { FaLock } from "react-icons/fa";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const currentPassword = String(form.get("currentPassword") || "").trim();
    const newPassword = String(form.get("newPassword") || "").trim();
    const confirmPassword = String(form.get("confirmPassword") || "").trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You’re not logged in.");
      return;
    }

    try {
      setLoading(true);

      // Change password
      await apiFetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ On success: hard logout + redirect to login
      localStorage.removeItem("token");
      sessionStorage.clear(); // optional: clear any temp data
      router.replace("/login"); // replace to prevent back-nav into authed pages
    } catch (err) {
      setError(err?.message || "Could not change password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md text-center"
        noValidate
      >
        <div className="flex justify-center mb-2">
          <Image
            src="/Logo.svg"
            alt="SporTech Logo"
            width={160}
            height={40}
            priority
            className="h-auto w-[160px] lg:w-[240px] p-4"
          />
        </div>

        <div className="mx-auto mt-2 w-full max-w-md rounded-2xl bg-white p-6 text-left text-[#1b1d1e] shadow">
          <h1 className="text-xl font-bold text-center text-[#1b1d1e]">
            Change password
          </h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Update your password to keep your account secure.
          </p>

          <div className="mt-6 space-y-4">
            <PasswordField
              name="currentPassword"
              label="Current Password"
              placeholder="Enter current password"
              iconLeft={<FaLock className="text-[#262626]" />}
              required
            />
            <PasswordField
              name="newPassword"
              label="New Password"
              placeholder="Type a strong password"
              iconLeft={<FaLock className="text-[#262626]" />}
              required
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm password"
              placeholder="Re-type password"
              iconLeft={<FaLock className="text-[#262626]" />}
              required
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
