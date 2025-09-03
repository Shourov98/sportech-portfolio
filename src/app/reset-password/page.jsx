"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import Brand from "@/components/auth/Brand";
import PasswordField from "@/components/auth/PasswordField";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const email = useMemo(() => params.get("email") || "", [params]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      // await fetch("/api/auth/reset-password", { method:"POST", body: JSON.stringify({ email, ...data }) })
      window.location.href = "/password-changed";
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="w-full max-w-md text-center">
        <Brand />
        <div className="mx-auto mt-2 w-full max-w-md rounded-2xl bg-white p-6 text-left text-[#1b1d1e] shadow">
          <h1 className="text-xl font-bold text-center text-[#1b1d1e]">
            Set new password
          </h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Set a new password and continue your journey
          </p>

          <div className="mt-6 space-y-4">
            <PasswordField
              name="currentPassword"
              label="Current Password"
              placeholder="Type a strong password"
              iconLeft={<span>🔒</span>}
              required
            />
            <PasswordField
              name="newPassword"
              label="New Password"
              placeholder="Type a strong password"
              iconLeft={<span>🔒</span>}
              required
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm password"
              placeholder="Re-type password"
              iconLeft={<span>🔒</span>}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
