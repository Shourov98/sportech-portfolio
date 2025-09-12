"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSwapButton from "../AnimatedSwapButton";

const SPRING = {
  type: "spring",
  stiffness: 110, // softer → slower
  damping: 30, // smoother settle
  mass: 1.1,
  bounce: 0.05,
  restDelta: 0.001,
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.18 },
  },
};

const downIn = {
  hidden: { opacity: 0, y: -60 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const leftIn = {
  hidden: { opacity: 0, x: -160, y: -60 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

const rightIn = {
  hidden: { opacity: 0, x: 120, y: -60 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

const upIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export default function ValuesSection() {
  return (
    <section
      id="values"
      className="relative mx-auto max-w-full bg-[#262626] px-4 sm:px-6 lg:px-8 lg:py-8 md:py-6 py-2"
    >
      {/* Title */}
      <motion.h2
        className="text-center font-bold text-[#e4ff25] tracking-tight text-[clamp(28px,5vw,56px)]"
        variants={downIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Our Values
      </motion.h2>

      {/* Parent container: single column */}
      <motion.div
        className="mx-auto w-full max-w-8/10 flex flex-col items-stretch gap-5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Innovation — left aligned */}
        <motion.div
          variants={leftIn}
          className="max-w-[60ch] transform-gpu will-change-transform text-left"
        >
          <h3 className="text-[clamp(18px,2.6vw,28px)] text-white font-bold">
            Innovation
          </h3>
          <p className="mt-3 text-white/85 leading-7 text-[clamp(14px,2.2vw,18px)]">
            We are committed to{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-white"
            >
              continuous innovation
            </a>
            , striving to push boundaries and create cutting-edge solutions that
            meet the evolving needs of the{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-white"
            >
              sports industry
            </a>
            .
          </p>
        </motion.div>

        {/* Transparency — right aligned */}
        <motion.div
          variants={rightIn}
          className="max-w-[60ch] transform-gpu will-change-transform ml-auto text-right"
        >
          <h3 className="text-[clamp(18px,2.6vw,28px)] text-white text-align-left font-bold">
            Transparency
          </h3>
          <p className="mt-3 text-white/85 text-align-left leading-7 text-[clamp(14px,2.2vw,18px)]">
            We believe in open{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-white"
            >
              communication and transparency
            </a>{" "}
            in all aspects of our work. This builds trust and ensures that all
            stakeholders are well-informed and aligned with our goals.
          </p>
        </motion.div>
      </motion.div>
      {/* CTA — from bottom */}
      <motion.div
        variants={upIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-10 md:mt-14 flex justify-center transform-gpu will-change-transform"
      >
        <AnimatedSwapButton href="/about-us">Learn More</AnimatedSwapButton>
      </motion.div>
    </section>
  );
}
