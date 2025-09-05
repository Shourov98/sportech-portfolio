"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services & Solution", href: "/service" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="absolute inset-x-0 top-4 z-50">
      <div className="mx-auto lg:max-w-7/10 px-4 sm:px-3 md:px-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
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

          {/* Desktop nav */}
          <div className="hidden md:block rounded-full border border-white/10 bg-black/30 backdrop-blur-xl px-6 md:px-5 py-2 md:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <ul className="flex items-center gap-[clamp(8px,1.2vw,28px)] text-[clamp(13px,1.1vw,20px)] text-white/85">
              {links.map((i) => {
                const active = pathname === i.href;
                return (
                  <li key={i.label}>
                    <Link
                      href={i.href}
                      className={`inline-flex items-center gap-2 md:gap-3 rounded-full px-3 md:px-6 py-1 md:py-1 lg:px-10 hover:text-white ${
                        active ? "text-white font-semibold" : ""
                      }`}
                    >
                      {i.label}
                      {active && (
                        <span className="ml-1 inline-block size-2 rounded-full bg-[#e4ff25]"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
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

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-xl">
            {links.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.label}
                  href={i.href}
                  className={`block rounded-xl px-2 py-1.5 text-sm hover:bg-white/5 ${
                    active ? "text-[#e4ff25]" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                  {active && (
                    <span className="ml-1 inline-block size-2 rounded-full bg-[#e4ff25]"></span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
