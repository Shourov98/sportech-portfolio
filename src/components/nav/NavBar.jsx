"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services & Solution", href: "/service" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <Link href="/" className="inline-flex px-5 items-center shrink-0">
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
          <nav
            className="
              hidden md:block
              ml-2 md:ml-6
              rounded-full border border-white/10 backdrop-blur-xl
              px-3 md:px-4 lg:px-5 py-2
              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            "
          >
            <ul className="flex flex-nowrap items-center gap-3 md:gap-4 lg:gap-7 text-[14px] md:text-[15px] lg:text-[17px] text-white/85">
              {links.map((i) => {
                const active = pathname === i.href;
                return (
                  <li key={i.label} className="whitespace-nowrap">
                    <Link
                      href={i.href}
                      className={`inline-flex items-center gap-2 rounded-full
                        px-2.5 md:px-3.5 lg:px-6 py-1 hover:text-white whitespace-nowrap
                        ${active ? "text-white font-semibold" : ""}
                      `}
                    >
                      {i.label}
                      {active && (
                        <span className="ml-1 inline-block size-2 rounded-full bg-[#e4ff25]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#262626] p-1.5 backdrop-blur-sm"
            aria-label="Toggle menu"
            aria-expanded={open}
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
                  className={`block rounded-xl px-3 py-2 text-white text-sm hover:bg-white/5 whitespace-nowrap ${
                    active ? "text-[#e4ff25]" : ""
                  }`}
                >
                  {i.label}
                  {active && (
                    <span className="ml-1 inline-block size-2 rounded-full bg-[#e4ff25]" />
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
