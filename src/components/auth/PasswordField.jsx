"use client";
import { useId, useState } from "react";

export default function PasswordField({
  label = "Password",
  placeholder = "Enter password",
  iconLeft,
  ...props
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm text-white/80">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
            {iconLeft}
          </span>
        )}
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full rounded-lg bg-[#fafbe7] text-[#1b1d1e] placeholder-black/50 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-[#EDF900] ${
            iconLeft ? "pl-10 pr-10" : "px-3"
          } py-3`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );
}
