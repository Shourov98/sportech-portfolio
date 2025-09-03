"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Brand from "@/components/auth/Brand";
import OtpInput from "@/components/auth/OtpInput";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const email = useMemo(() => params.get("email") || "", [params]);
  const [code, setCode] = useState("");

  async function onVerify(e) {
    e.preventDefault();
    if (code.length < 4) return;
    // await fetch("/api/auth/verify-otp", { method:"POST", body: JSON.stringify({ email, code }) })
    // On success:
    window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
  }

  return (
    <AuthLayout>
      <form onSubmit={onVerify} className="w-full max-w-md text-center">
        <Brand />
        <h1 className="text-2xl font-bold">Verify Code</h1>
        <p className="mt-1 text-sm text-white/70">
          We sent an OTP code to your email{" "}
          <span className="text-white">{email}</span>. Enter the code below to
          verify
        </p>

        <div className="mt-8 flex justify-center">
          <OtpInput value={code} onChange={setCode} length={4} />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95"
        >
          Next
        </button>

        <div className="mt-3 text-sm text-white/80">
          Don’t receive OTP?{" "}
          <button type="button" className="text-[#EDF900]">
            Resend again
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
