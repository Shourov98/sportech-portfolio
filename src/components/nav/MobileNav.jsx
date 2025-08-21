"use client";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav({ open, setOpen }) {
  return (
    <>
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="Sportech"
            width={90}
            height={13}
            priority
          />
        </Link>

        {/* Expand button */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="relative text-amber-300 grid place-items-center w-11 h-11"
        >
          <span className="w-[16px] h-[16px] rounded-[2px] bg-brandNeon grid place-items-center">
            <span className="flex flex-col items-center gap-[2px]">
              <span className="block w-[10px] h-[2px] bg-black/80 rounded-full" />
              <span className="block w-[10px] h-[2px] bg-black/80 rounded-full" />
              <span className="block w-[10px] h-[2px] bg-black/80 rounded-full" />
            </span>
          </span>
        </button>
      </div>

      {/* Slide-over */}
      <div
        id="mobile-menu"
        className={`
          fixed inset-y-0 right-0 w-[82%] max-w-sm
          bg-black/90 backdrop-blur
          border-l border-white/10
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "translate-x-full"}
          z-40
        `}
      >
        <nav className="p-6 space-y-6">
          <MobileLink href="/" label="Home" onClick={() => setOpen(false)} />
          <MobileLink
            href="/about"
            label="About Us"
            onClick={() => setOpen(false)}
          />
          <MobileLink
            href="/services"
            label="Services & Solution"
            onClick={() => setOpen(false)}
          />
          <MobileLink
            href="/contact"
            label="Contact Us"
            onClick={() => setOpen(false)}
          />
        </nav>
      </div>

      {/* Backdrop */}
      {open && (
        <button
          aria-hidden
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function MobileLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-[18px] text-white/95 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}
