"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    // Position like the target: floating pill, not a full-width bar
    <header className="absolute inset-x-0 top-4 z-50">
      <div className="mx-auto lg:max-w-7/10 px-4 sm:px-3 md:px-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on the left (outside the pill) */}
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/Logo.svg"
              alt="Sportech Logo"
              width={196}
              height={30}
              priority
              className="md:h-[30px] md:w-[196px] w-[90px] h-[15px]"
            />
          </Link>

          {/* Desktop nav inside a translucent rounded pill */}
          <div className="hidden md:block rounded-full border border-white/10 bg-black/30 backdrop-blur-xl px-6 md:px-5 py-2 md:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <ul className="flex items-center gap-[clamp(8px,1.2vw,28px)] text-[clamp(13px,1.1vw,20px)] text-white/85">
              {[
                { label: "Home", href: "#" },
                { label: "About Us", href: "#about" },
                { label: "Services & Solution", href: "#services" },
                { label: "Contact Us", href: "#contact" },
              ].map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="inline-flex items-center gap-2 md:gap-3 rounded-full px-3 md:px-6 py-1 md:py-1 lg:px-10 hover:text-white"
                  >
                    {i.label}
                    {i.label === "Home" && (
                      <span className="ml-1 inline-block size-2 rounded-full bg-[#e4ff25]"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/40 p-1.5 backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            <div className="h-3.5 w-3.5">
              <span className="block h-[1.5px] w-full bg-white"></span>
              <span className="mt-1 block h-[1.5px] w-full bg-white"></span>
              <span className="mt-1 block h-[1.5px] w-full bg-white"></span>
            </div>
          </button>
        </div>

        {/* Mobile dropdown (full-width card) */}
        {open && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-xl">
            <Link
              href="#"
              className="block rounded-xl px-2 py-1.5 text-sm hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="block rounded-xl px-2 py-1.5 text-sm hover:bg-white/5"
            >
              About Us
            </Link>
            <Link
              href="#services"
              className="block rounded-xl px-2 py-1.5 text-sm hover:bg-white/5"
            >
              Services & Solution
            </Link>
            <Link
              href="#contact"
              className="block rounded-xl px-2 py-1.5 text-sm hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
