"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import TextField from "@/components/auth/TextField";
import PasswordField from "@/components/auth/PasswordField";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await res.json();

      // save token for auth checks
      localStorage.setItem("token", result.token);

      // redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
        <div className="flex justify-center mb-4">
          <Image
            src="/Logo.svg"
            alt="SporTech Logo"
            width={160}
            height={40}
            priority
            className="h-auto w-[160px] lg:w-[240px] p-4"
          />
        </div>

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
            iconLeft={<IoMdMail className="text-[#262626]" />}
            required
          />
          <div>
            <PasswordField
              name="password"
              label="Password"
              placeholder="Enter password"
              iconLeft={<FaLock className="text-[#262626]" />}
              required
            />
            <div className="mt-2 text-right text-sm">
              <Link href="/forgot-password" className="text-[#EDF900]">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
        )}

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
