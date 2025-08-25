"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/* smooth spring */
const SPRING = {
  type: "spring",
  stiffness: 100,
  damping: 32,
  mass: 1.05,
  bounce: 0.04,
};
const topIn = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: SPRING },
};
const leftIn = {
  hidden: { opacity: 0, x: -140 },
  show: { opacity: 1, x: 0, transition: SPRING },
};
const rightIn = {
  hidden: { opacity: 0, x: 140 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

export default function ObjectivesSection({
  title = "Our Objectives",
  subtitle = "Innovating Sports, Empowering Experiences",
}) {
  return (
    <section className="relative bg-[#262626] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1331px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <motion.h2
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="font-extrabold text-[#EDF900] tracking-tight text-[clamp(32px,6vw,64px)]"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-2 text-white text-[clamp(16px,3.4vw,28px)] font-semibold"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ---------- MD+ : Figma-precision stage ---------- */}
        <div className="mt-10 hidden md:block">
          {/* Figma canvas 1331 × 586 => preserve aspect for perfect percent mapping */}
          <div className="relative w-full aspect-[1331/586] overflow-visible">
            {/* Group 17 — from LEFT */}
            <motion.div
              variants={leftIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.55 }}
              transition={{ ...SPRING, delay: 0.05 }}
              className="absolute left-[0%] right-[10.22%] top-[3.41%] bottom-[8.68%]"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/objectives/GroupObj.svg" /* group 17 */
                  alt="Group"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Ellipse cluster — from RIGHT */}
            <motion.div
              variants={rightIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.55 }}
              transition={{ ...SPRING, delay: 0.15 }}
              className="absolute left-[65.82%] right-[0%] top-[0%] bottom-[0%]"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/objectives/ellipseObj.svg" /* "Our Objectives" ellipse block */
                  alt="Ellipses"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FULL-BLEED SMALL SCREEN VERSION */}
        <div className="md:hidden mt-8">
          {/* Make a full-width strip that escapes the page gutters */}
          <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] space-y-3">
            {[
              {
                frame: "/objectives/Frame52.svg",
                icon: "/objectives/icon1.svg",
                h: 17,
              },
              {
                frame: "/objectives/Frame54.svg",
                icon: "/objectives/icon2.svg",
                h: 24,
              },
              {
                frame: "/objectives/Frame56.svg",
                icon: "/objectives/icon3.svg",
                h: 26,
              },
            ].map((row, i) => (
              <motion.div
                key={row.frame}
                variants={leftIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ ...SPRING, delay: 0.05 + i * 0.1 }}
              >
                {/* Two columns: frame takes the whole row, icon hugs the right edge */}
                <div className="grid grid-cols-[1fr_auto] items-center gap-x-2">
                  {/* Frame fills the entire available width */}
                  <img
                    src={row.frame}
                    alt={`Frame ${i + 1}`}
                    className="block w-full h-auto pr-10 pl-20 py-10" // <= FULL WIDTH
                    loading="lazy"
                  />

                  {/* Icon keeps its aspect ratio; just sized up a bit */}
                  <img
                    src={row.icon}
                    alt={`Icon ${i + 1}`}
                    style={{ height: "auto", width: "auto" }} // <= SCALED UP
                    className="block p-5"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
