"use client";
import Image from "next/image";
import { useMemo } from "react";

/**
 * PartnersStrip
 * props:
 *  - logos: [{ src: "/partners/x.png", alt: "Brand" }, ...]
 *  - duration: seconds for one full loop (default 28)
 */
export default function PartnersStrip({ logos = [], duration = 28 }) {
  // Duplicate array for seamless loop
  const loop = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section className="w-full overflow-hidden">
      {/* strip background (optional) – remove bg classes if not needed */}
      <div className="relative w-full bg-[#262626] py-4 sm:py-5">
        {/* scroll track */}
        <div
          className="marquee flex items-center gap-4 sm:gap-5"
          style={{
            // tune speed here; smaller = faster
            ["--marquee-duration"]: `${duration}s`,
          }}
        >
          {loop.map((logo, idx) => (
            <Card key={`${logo.src}-${idx}`} logo={logo} />
          ))}
        </div>

        {/* fade masks (optional, soft edges) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* marquee animation */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          width: 200%; /* two copies side-by-side */
          animation: marquee-left var(--marquee-duration) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

function Card({ logo }) {
  return (
    <div
      className={[
        // Fixed viewport-based width so we see exactly 3 on small, 4 on md+
        "shrink-0 py-5 px-1 sm:px-2",
        "min-w-[33.3333vw] md:min-w-[25vw] lg:min-w-[25vw]",
      ].join(" ")}
    >
      <div className="relative mx-auto h-20 sm:h-27 md:h-36 lg:h-45 rounded-2xl bg-white ring-1 ring-black/10 shadow-sm">
        <Image
          src={logo.src}
          alt={logo.alt || ""}
          fill
          priority={false}
          className="object-contain p-3 sm:p-4 md:p-5 lg:p-6"
          sizes="(min-width:1024px) 25vw, (min-width:768px) 25vw, 33.33vw"
        />
      </div>
    </div>
  );
}
