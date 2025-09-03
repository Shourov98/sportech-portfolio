"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function PasswordChangedPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center text-[#1b1d1e] shadow">
        <div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-[#EDF900]">
          ✓
        </div>
        <h1 className="text-xl font-bold">Password Changed!</h1>
        <p className="mt-1 text-sm text-black/70">
          Return to the login page to enter your account with your new password
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#EDF900] py-3 font-semibold text-black shadow hover:brightness-95"
        >
          Back To Login
        </Link>
      </div>
    </AuthLayout>
  );
}
