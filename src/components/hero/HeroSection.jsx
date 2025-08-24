"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.18 }, // slower sequence
  },
};

const item = {
  hidden: { opacity: 0, x: -120 }, // shorter travel helps smoothness; use -160 if you want more
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 110, // ↓ lower = softer/slower
      damping: 30, // ↑ higher = less wobble, smoother settle
      mass: 1.1, // ↑ slightly heavier = slower accel
      bounce: 0.2, // tiny overshoot; set 0 for none
      restDelta: 0.001, // finish cleanly
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Full-bleed background */}
      <div className="pointer-events-none min-h-screen absolute inset-0 -z-10">
        <Image
          src="/home/homeHeroSection.svg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        {/* Globe */}
        <div
          className="pointer-events-none absolute -z-10
              left-[480px] top-[481px] w-[509px] h-[509px]"
          aria-hidden="true"
        >
          <img src="/home/globe.svg" alt="Globe" className="object-contain" />
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        <div className="grid grid-cols-1 gap-10">
          {/* Left copy with staggered enter-from-left */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.9 }}
          >
            <motion.h1
              variants={item}
              className="text-[40px] sm:text-5xl lg:text-[56px] font-bold leading-[1.1]"
            >
              Technology Serving Sports Innovative <br /> Solutions and
              Exceptional Experiences
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-base leading-7 text-white/80 sm:text-lg"
            >
              Welcome to Sportech, a leading company in delivering advanced
              digital solutions to the sports industry. We develop innovative
              platforms that enhance fan experiences, streamline club
              operations, and unlock new opportunities for sports investment
              through cutting-edge technologies.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-4"
            >
              <Link
                href="#services"
                className="inline-flex items-center gap-2 md:gap-3 rounded-2xl bg-[#e4ff25] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:brightness-95"
              >
                Services & Solutions
                <span className="ml-1 grid size-5 md:size-7 text-lg md:text-2xl place-items-center text-black">
                  »
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right visual spacer (kept) */}
          <div className="relative min-h-[320px] lg:min-h-[520px]" />
        </div>
      </section>
    </div>
  );
}
