"use client";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-[calc(100svh)] bg-[#262626] text-white">
      {/* subtle vignette (optional) */}
      <div className="mx-auto flex min-h-[calc(100svh)] max-w-7xl items-center justify-center px-4">
        {children}
      </div>
    </main>
  );
}
