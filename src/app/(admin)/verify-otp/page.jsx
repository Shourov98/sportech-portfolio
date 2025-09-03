// app/verify-otp/page.jsx
"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import OtpInput from "@/components/auth/OtpInput";
import { apiFetch } from "@/utils/api"; // uses NEXT_PUBLIC_API_URL

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function onVerify(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    // ensure we submit via FormData (OtpInput may not create a named input)
    const form = new FormData(e.currentTarget);
    // include the code from the controlled component
    form.set("otp", code);

    const otp = form.get("otp");

    if (!email) {
      setError("Missing email. Go back and try again.");
      return;
    }
    if (!otp || String(otp).trim().length < 4) {
      setError("Enter the full OTP code.");
      return;
    }

    try {
      setLoading(true);
      const { resetToken } = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp: String(otp) }),
      });

      // keep it available for the next step (optional)
      if (resetToken) sessionStorage.setItem("resetToken", resetToken);

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
          <span className="text-white">{email}</span>. Enter the code below to
          verify.
        </p>

        <div className="mt-8 flex justify-center">
          <OtpInput value={code} onChange={setCode} length={4} />
        </div>

        {/* hidden input so FormData always contains otp */}
        <input type="hidden" name="otp" value={code} readOnly />

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
