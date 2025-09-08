"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Earth3D from "../Earth3D";
import AnimatedSwapButton from "../AnimatedSwapButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, x: -120 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 30,
      mass: 1.1,
      bounce: 0.2,
      restDelta: 0.001,
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
          className="pointer-events-auto absolute z-0 left-1/2 top-[481px] w-[509px] h-[509px] max-w-full -translate-x-1/2"
          aria-hidden="true"
        >
          <Earth3D />
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
              <AnimatedSwapButton href="/service">
                Services & Solutions
              </AnimatedSwapButton>
            </motion.div>
          </motion.div>

          {/* Right visual spacer (kept) */}
          <div className="relative min-h-[320px] lg:min-h-[520px]" />
        </div>
      </section>
    </div>
  );
}
