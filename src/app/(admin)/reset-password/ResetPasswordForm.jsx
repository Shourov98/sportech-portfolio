// app/reset-password/ResetPasswordForm.jsx (Client Component)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordField from "@/components/auth/PasswordField";
import { apiFetch } from "@/utils/api";

export default function ResetPasswordForm({ searchParams }) {
  const router = useRouter();
  const emailFromUrl = searchParams?.email ?? "";
  const tokenFromUrl = searchParams?.token ?? searchParams?.resetToken ?? "";

  const [email, setEmail] = useState(emailFromUrl || "");
  const [resetToken, setResetToken] = useState(tokenFromUrl || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load from session if not in URL; save if it is.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!emailFromUrl) {
      const savedEmail = sessionStorage.getItem("resetEmail");
      if (savedEmail) setEmail(savedEmail);
    } else {
      sessionStorage.setItem("resetEmail", emailFromUrl);
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!tokenFromUrl) {
      const savedToken = sessionStorage.getItem("resetToken");
      if (savedToken) setResetToken(savedToken);
    } else {
      sessionStorage.setItem("resetToken", tokenFromUrl);
      setResetToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const newPassword = form.get("newPassword")?.toString().trim();
    const confirmPassword = form.get("confirmPassword")?.toString().trim();

    console.log(email, resetToken, newPassword, confirmPassword);

    if (!email)
      return setError("Missing email. Please restart the reset flow.");
    if (!resetToken) return setError("Missing or expired reset token.");
    if (!newPassword || !confirmPassword)
      return setError("Please fill in both password fields.");
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match.");

    try {
      setLoading(true);
      await apiFetch("/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, resetToken, newPassword }),
      });
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
      <form onSubmit={onSubmit} className="w-full max-w-md text-center">
        <div className="flex justify-center mb-2">
          <Image src="/Logo.svg" alt="SporTech Logo" width={160} height={40} />
        </div>

        <div className="mx-auto mt-2 w-full max-w-md rounded-2xl bg-white p-6 text-[#1b1d1e] shadow">
          <h1 className="text-xl font-bold text-center">Set new password</h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Set a new password and continue your journey
          </p>

          <div className="mt-6 space-y-4">
            <PasswordField name="newPassword" label="New Password" required />
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              required
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

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
