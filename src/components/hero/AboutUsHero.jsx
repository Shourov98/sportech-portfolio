"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/* Smooth/slow spring used across the elements */
const SPRING = {
  type: "spring",
  stiffness: 100, // lower = slower
  damping: 32, // higher = smoother
  mass: 1.05,
  bounce: 0.04,
  restDelta: 0.001,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.18 } },
};
const leftIn = {
  hidden: { opacity: 0, x: -120 },
  show: { opacity: 1, x: 0, transition: SPRING },
};
const upIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export default function AboutUsHero({
  bgSrc = "/about/about-hero.svg", // ← put your SVG path here
  title = "About Us",
  subtitle = "Our Tech Vision, Your Sports Success",
  description = `SporTech Technologies was established as a bridge between sports and technology.
With a specialized team and strategic partnerships, we deliver tailor-made digital
solutions to meet the needs of sports clubs and fans. We are committed to supporting
the growth of the sports sector locally and globally in alignment with Saudi Vision 2030.`,
}) {
  return (
    <section className="relative min-h-screen isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image src={bgSrc} alt="" fill priority className="object-cover" />
        {/* contrast scrim for readability */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-16 sm:pb-20 lg:pb-24 text-center"
      >
        {/* Title */}
        <motion.h1
          variants={leftIn}
          className="transform-gpu will-change-transform font-bold text-[#EDF900] tracking-tight
                    text-[clamp(36px,6vw,64px)] leading-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={leftIn}
          className="transform-gpu will-change-transform mt-4 font-bold text-white
                     text-[clamp(20px,3.8vw,32px)]"
        >
          {subtitle}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={upIn}
          className="transform-gpu will-change-transform mx-auto mt-6 max-w-4xl
                     text-white/90 leading-7 text-[clamp(14px,2.4vw,18px)]"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
