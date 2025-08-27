"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const topIn = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 28 },
  },
};

const bottomIn = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 28, delay: 0.1 },
  },
};

export default function ServicesHero({
  title = "Welcome to Our Services & Solutions",
  subtitle = "Innovative solutions tailored to your business needs.",
  bgSrc = "/services/service-bg.png", // <- put your PNG here
}) {
  return (
    <section className="relative isolate">
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle darkening for readability */}
        {/* <div className="absolute inset-0 bg-black/45" /> */}
        {/* Gentle gradient to add depth */}
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" /> */}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 min-h-[46svh] grid place-items-center">
        <div className="text-center">
          <motion.h1
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="font-extrabold text-[#EDF900] tracking-tight text-[clamp(28px,5vw,64px)]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={bottomIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-4 sm:mt-5 text-white/95 font-semibold text-[clamp(14px,2.8vw,28px)]"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
