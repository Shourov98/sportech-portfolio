"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Earth3D from "../Earth3D";
import AnimatedSwapButton from "../AnimatedSwapButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.18 } },
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
    <div className="relative isolate">
      {/* Full-bleed background (no globe here) */}
      <div className="pointer-events-none absolute inset-0 -z-10 min-h-screen">
        <Image
          src="/home/homeHeroSection.svg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="relative z-10 mx-auto max-w-full lg:max-w-7xl px-4 md:px-6 lg:px-8 pt-10 md:pt-28 lg:pt-28">
        <div className="grid grid-cols-1 gap-10">
          {/* Left copy */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.9 }}
          >
            <motion.h1
              variants={item}
              className="text-[40px] text-white text-3xl md:text-5xl lg:text-[56px] font-bold leading-[1.1]"
            >
              Technology Serving Sports Innovative <br /> Solutions and
              Exceptional Experiences
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-2 md:mt-4 lg:mt-6 text-base leading-7 text-white/80 text-md md:text-lg lg:text-xl"
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
                Services &amp; Solutions
              </AnimatedSwapButton>
            </motion.div>
          </motion.div>

          {/* Globe BELOW the text, centered and responsive */}
          <div className="relative mx-auto w-[320px] h-[320px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[680px] lg:h-[680px]">
            {/* Keep it above the bg and not clipped */}
            {/* Globe BELOW the text, centered and responsive */}
            <div
              className="
                relative mx-auto z-20 overflow-visible
                w-[82vw] h-[82vw]              /* phones: big, fully visible */
                sm:w-[420px] sm:h-[420px]
                md:w-[560px] md:h-[560px]
                lg:w-[800px] lg:h-[800px]      /* bigger on large screens */
              "
            >
              <Earth3D />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
