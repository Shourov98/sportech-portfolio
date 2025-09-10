"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import TextField from "@/components/auth/TextField";
import { apiFetch } from "@/utils/api";
import { IoMdMail } from "react-icons/io";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const { email } = Object.fromEntries(new FormData(e.currentTarget));

    try {
      setLoading(true);
      setError("");
      // POST /auth/forgot-password with { email }
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      // success → go verify
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
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
            iconLeft={<IoMdMail className="text-[#262626]" />}
            required
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
        )}

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
