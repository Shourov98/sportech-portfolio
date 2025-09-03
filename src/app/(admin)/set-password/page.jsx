"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import Brand from "@/components/auth/Brand";
import PasswordField from "@/components/auth/PasswordField";

export default function SetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  // You can pass email or a one-time token from the OTP step
  const email = useMemo(() => params.get("email") || "", [params]);
  const token = useMemo(() => params.get("token") || "", [params]);

  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!password || password.length < 8) {
      alert("Please use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // 🔗 Call your API to finalize password set
      // await fetch("/api/auth/set-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, token, password }),
      // });

      // On success:
      router.push("/password-changed");
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

        <div className="mx-auto w-full rounded-2xl bg-white p-6 text-left text-[#1b1d1e] shadow">
          <h1 className="text-xl font-bold text-center">Set new password</h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Set a new password and continue your journey
          </p>

          <div className="mt-6 space-y-4">
            <PasswordField
              name="password"
              label="Set Password"
              placeholder="Type a strong password"
              iconLeft={<span>🔒</span>}
              required
            />
            <PasswordField
              name="confirm"
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
