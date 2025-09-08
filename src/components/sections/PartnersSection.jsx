// src/components/PartnersSectionMarquee.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useAppData } from "@/store/appData"; // ✅ bring in the store

export default function PartnersSectionMarquee({ duration = 28 }) {
  // 1) get partners array from Zustand
  const partners = useAppData((s) => s.partners);

  // 2) map only logos into expected shape
  const logos = useMemo(
    () =>
      (partners || []).map((p) => ({ src: p.logo, alt: p.name || "Partner" })),
    [partners]
  );

  // 3) duplicate array for seamless loop
  const loop = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section className="relative bg-[#262626] py-6 md:py-10 lg:py-12">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-left text-[clamp(28px,5vw,48px)] font-bold text-white">
          Partners
        </h2>
      </div>

      {/* Yellow band */}
      <div className="mt-6 bg-[#EDF900]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-14 lg:pb-16 overflow-hidden">
          {/* Intro */}
          <div className="text-center text-black">
            <h3 className="text-[clamp(20px,3.2vw,32px)] font-bold">
              Partnering for shared success
            </h3>
            <p className="mx-auto mt-1 max-w-3xl text-[clamp(12px,2.2vw,16px)] text-black/80">
              Save time and effort. Operators around the world trust SporTech
            </p>
          </div>

          {/* Marquee */}
          <div
            className="relative mt-8 sm:mt-10 overflow-hidden"
            style={{ ["--marquee-duration"]: `${duration}s` }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#EDF900] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#EDF900] to-transparent" />

            <div className="marquee-track flex items-center gap-4 sm:gap-5 w-[200%]">
              {loop.map((logo, idx) => (
                <Card key={`${logo?.src || "logo"}-${idx}`} logo={logo} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-[#EDF900] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:brightness-110"
            >
              View Details
              <span className="ml-1 grid size-7 place-items-center rounded-xl bg-[#EDF900] text-black">
                »
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee-left var(--marquee-duration) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
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
        "shrink-0 py-5 px-1 sm:px-2",
        "min-w-[33.3333vw] md:min-w-[25vw] lg:min-w-[20vw]", // show 3/4/5 per row
      ].join(" ")}
    >
      <div className="relative mx-auto h-20 sm:h-24 md:h-28 lg:h-32 rounded-2xl bg-white ring-1 ring-black/10 shadow-sm">
        <Image
          src={logo?.src}
          alt={logo?.alt || "Partner"}
          fill
          className="object-contain p-3 sm:p-4 md:p-5 lg:p-6"
          sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
        />
      </div>
    </div>
  );
}
