"use client";
import { useEffect, useRef } from "react";

export default function OtpInput({ value = "", onChange, length = 4 }) {
  const refs = useRef([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, length);
  }, [length]);

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const chars = value.split("");
    chars[i] = v;
    const next = chars.join("").padEnd(length, "");
    onChange(next);

    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-12 w-12 rounded-lg bg-[#fafbe7] text-center text-lg text-[#1b1d1e] outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-[#EDF900]"
        />
      ))}
    </div>
  );
}
