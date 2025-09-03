"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Brand from "@/components/auth/Brand";
import TextField from "@/components/auth/TextField";
import PasswordField from "@/components/auth/PasswordField";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      setLoading(true);
      // TODO: call your login API
      // await fetch("/api/auth/login", { method:"POST", body: JSON.stringify(data) })
      // On success: redirect to /admin
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
        <Brand />
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="mt-1 text-sm text-white/70">
          To login, enter your email address
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
          <div>
            <PasswordField
              name="password"
              label="Password"
              placeholder="Enter password"
              iconLeft={<span>🔒</span>}
              required
            />
            <div className="mt-2 text-right text-sm">
              <Link href="/forgot-password" className="text-[#EDF900]">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}
