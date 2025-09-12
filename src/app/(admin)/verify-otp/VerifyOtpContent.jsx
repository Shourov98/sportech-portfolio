// app/verify-otp/VerifyOtpContent.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import OtpInput from "@/components/auth/OtpInput";
import { apiFetch } from "@/utils/api";

export default function VerifyOtpContent() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  // Persist the email so the reset page (and refreshes) can read it
  useEffect(() => {
    if (email && typeof window !== "undefined") {
      try {
        sessionStorage.setItem("resetEmail", email);
      } catch {
        /* ignore storage errors */
      }
    }
  }, [email]);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function onVerify(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email) return setError("Missing email. Go back and try again.");
    if (!code || code.trim().length < 4)
      return setError("Enter the full OTP code.");

    try {
      setLoading(true);
      const { resetToken } = await apiFetch("/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, otp: String(code).trim() }),
      });

      if (typeof window !== "undefined") {
        if (resetToken) sessionStorage.setItem("resetToken", resetToken);
        sessionStorage.setItem("resetEmail", email);
      }

      router.push(
        `/reset-password?email=${encodeURIComponent(
          email
        )}&token=${encodeURIComponent(resetToken || "")}`
      );
    } catch (err) {
      setError(err?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    try {
      setLoading(true);
      setError("");
      setInfo("");
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setInfo("OTP resent to your email.");
    } catch (err) {
      setError(err?.message || "Could not resend OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={onVerify}
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

        <h1 className="text-2xl font-bold">Verify Code</h1>
        <p className="mt-1 text-sm text-white/70">
          We sent an OTP code to your email{" "}
          <span className="text-white break-all">{email}</span>. Enter the code
          below to verify.
        </p>

        <div className="mt-8 flex justify-center">
          <OtpInput value={code} onChange={setCode} length={4} />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
        )}
        {info && (
          <p className="mt-4 text-sm text-green-400 font-medium">{info}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Next"}
        </button>

        <div className="mt-3 text-sm text-white/80">
          Don’t receive OTP?{" "}
          <button
            type="button"
            onClick={resendOtp}
            disabled={loading}
            className="text-[#EDF900] hover:brightness-110 disabled:opacity-60"
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-4 text-sm">
          <Link href="/login" className="text-white/80 hover:text-white">
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
