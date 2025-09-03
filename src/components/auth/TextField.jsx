"use client";
import { useId } from "react";

export default function TextField({
  label,
  type = "text",
  placeholder = "",
  iconLeft,
  ...props
}) {
  const id = useId();
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
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg bg-[#fafbe7] text-[#1b1d1e] placeholder-black/50 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-[#EDF900] ${
            iconLeft ? "pl-10 pr-3" : "px-3"
          } py-3`}
          {...props}
        />
      </div>
    </div>
  );
}
