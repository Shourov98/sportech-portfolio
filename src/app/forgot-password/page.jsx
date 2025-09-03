"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Brand from "@/components/auth/Brand";
import TextField from "@/components/auth/TextField";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const { email } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      setLoading(true);
      // await fetch("/api/auth/forgot-password", { method:"POST", body: JSON.stringify({ email }) })
      // redirect to /verify-otp?email=...
      window.location.href = `/verify-otp?email=${encodeURIComponent(email)}`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="w-full max-w-md text-center">
        <Brand />
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="mt-1 text-sm text-white/70">
          Enter your email to reset password
        </p>

        <div className="mt-8 space-y-5 text-left">
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            iconLeft={<span>✉️</span>}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Next"}
        </button>

        <div className="mt-4 text-sm">
          <Link href="/login" className="text-white/80 hover:text-white">
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
