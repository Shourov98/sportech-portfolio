// app/reset-password/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordField from "@/components/auth/PasswordField";
import { apiFetch } from "@/utils/api";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const email = useMemo(() => params.get("email") || "", [params]);

  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load token from query or sessionStorage
  useEffect(() => {
    const t =
      params.get("token") ||
      params.get("resetToken") ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("resetToken")
        : "") ||
      "";
    setResetToken(t);
  }, [params]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const newPassword = String(form.get("newPassword") || "").trim();
    const confirmPassword = String(form.get("confirmPassword") || "").trim();

    if (!email) {
      setError("Missing email. Please restart the reset flow.");
      return;
    }
    if (!resetToken) {
      setError("Missing or expired reset token. Please request a new OTP.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, resetToken, newPassword }),
      });

      // Clear temp token and go to login
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("resetToken");
      }
      router.push("/login");
    } catch (err) {
      setError(err?.message || "Could not reset password. Please try again.");
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
        {/* Centered Logo like the login/verify pages */}
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
            Set new password
          </h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Set a new password and continue your journey
          </p>

          <div className="mt-6 space-y-4">
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

          {error && (
            <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
          )}

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
