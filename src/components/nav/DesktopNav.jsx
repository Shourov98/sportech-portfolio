"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services & Solution" },
  { href: "/contact", label: "Contact Us" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="h-[72px] flex items-center">
      {/* Logo */}
      <div className="pl-[60px] pr-6">
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="Sportech"
            width={196}
            height={29}
            priority
          />
        </Link>
      </div>

      {/* Pill nav */}
      <nav aria-label="Primary" className="flex-1 flex justify-center">
        <div
          className="
            w-[943px] h-[72px]
            rounded-full border border-white/20
            px-[119px] py-[10px] my-5
            bg-transparent backdrop-blur-sm
            flex items-center justify-between gap-[10px]
          "
        >
          {LINKS.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className="
                  text-white/95 hover:text-white transition-colors
                  text-[20px] leading-none font-medium flex items-center
                "
              >
                <span>{label}</span>
                {active && (
                  <span className="ml-[6px] inline-block w-[6px] h-[6px] rounded-full bg-brandNeon" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="pr-[60px]" aria-hidden />
    </div>
  );
}
