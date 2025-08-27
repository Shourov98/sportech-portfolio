"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/**
 * Partners section:
 * - First 4 logos slide in and STAY visible
 * - Marquee block remains commented
 */
export default function PartnersSection({ logos = [] }) {
  const firstFour = logos.slice(0, 5);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-20% 0px" });

  const list = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { x: -80, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 22, stiffness: 240 },
    },
  };

  return (
    <section className="relative bg-[#262626] py-12 sm:py-16 lg:py-24">
      {/* Heading on dark background */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-left text-[clamp(28px,5vw,48px)] font-bold text-white">
          Partners
        </h2>
      </div>

      {/* FULL yellow band: everything inside (including CTA) */}
      <div className="mt-6 bg-[#EDF900]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-14 lg:pb-16 overflow-hidden">
          {/* Intro text */}
          <div className="text-center text-black">
            <h3 className="text-[clamp(20px,3.2vw,32px)] font-bold">
              Partnering for shared success
            </h3>
            <p className="mx-auto mt-1 max-w-3xl text-[clamp(12px,2.2vw,16px)] text-black/80">
              Save time and effort. Operators around the world trust Playtech
            </p>
          </div>

          {/* Intro row: 4 WHITE cards slide in and stay visible */}
          <div ref={containerRef} className="relative mt-8 sm:mt-10">
            <motion.ul
              variants={list}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {logos.map((p) => (
                <motion.li
                  key={p.name || p}
                  variants={item}
                  className="rounded-2xl bg-white ring-1 ring-black/10 shadow-sm"
                >
                  <div className="relative mx-auto h-24 sm:h-28 lg:h-32 w-full rounded-2xl bg-white">
                    <Image
                      src={p.src || `/partners/${p}`}
                      alt={p.name || p}
                      fill
                      className="object-contain p-6 mix-blend-normal"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Marquee row: keep commented for now */}
            {/*
            <div className="relative opacity-0 transition-opacity duration-500">
              ...
            </div>
            */}
          </div>

          {/* CTA stays INSIDE the yellow band */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-[#EDF900] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:brightness-110"
            >
              View Details
              <span className="ml-1 grid size-7 place-items-center rounded-xl bg-[#EDF900] text-black">
                »
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* marquee styles (kept for later; currently unused) */}
      <style jsx global>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-track {
          animation: marquee-right 24s linear infinite;
        }
        .marquee-mask {
          background: linear-gradient(
            90deg,
            rgba(237, 249, 0, 0) 0%,
            rgba(237, 249, 0, 1) 8%,
            rgba(237, 249, 0, 1) 92%,
            rgba(237, 249, 0, 0) 100%
          );
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
