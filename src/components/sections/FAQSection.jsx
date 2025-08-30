"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const SPRING = {
  type: "spring",
  stiffness: 140,
  damping: 18,
  mass: 0.9,
};

const topIn = {
  hidden: { opacity: 0, y: -28 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const leftIn = {
  hidden: { opacity: 0, x: -260 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

const rightIn = {
  hidden: { opacity: 0, x: 260 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What services does Sportech provide?",
      a: "We offer innovative sports technology solutions, including fan engagement tools, club management systems, data analytics, and custom interactive experiences.",
      rich: true,
    },
    {
      q: "Do you only work with sports clubs?",
      a: "Mostly clubs, but we also partner with leagues, venues, and sports businesses.",
    },
    {
      q: "Can you create a custom solution for my needs?",
      a: "Yes—every solution is tailored to your goals, integrations, and budget.",
    },
    {
      q: "How long does it take to build a website or platform?",
      a: "MVPs often ship in 6–10 weeks; larger platforms can take 3–6 months, depending on scope.",
    },
    {
      q: "Do you provide ongoing support after launch?",
      a: "Absolutely—maintenance, updates, and support packages are available.",
    },
  ];

  return (
    <section id="faq" className="relative bg-[#262626] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Title + tilted capsule */}
        <div className="relative mx-auto mb-8 text-center sm:mb-10">
          <motion.h2
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="font-extrabold tracking-tight text-[#EDF900] text-[clamp(28px,6vw,48px)]"
          >
            Frequently Asked Questions ?
          </motion.h2>

          {/* Tilted capsule */}
          <motion.span
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...SPRING, delay: 0.08 }}
            className="absolute right-1/2 translate-x-[210px] -top-4 select-none rounded-full bg-[#EDF900] px-3 py-1 text-[12px] font-semibold text-[#1b1d1e] shadow-[0_8px_30px_rgba(0,0,0,0.25)] rotate-[15deg] sm:right-[8%] sm:translate-x-0"
            aria-hidden="true"
          >
            FAQ
          </motion.span>
        </div>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            const rowVariants = i % 2 === 0 ? leftIn : rightIn;

            return (
              <motion.div
                key={item.q}
                variants={rowVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={[
                  "rounded-2xl border transition-all",
                  isOpen
                    ? "border-[#9EEB00] bg-white/5"
                    : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {/* Header */}
                <button
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 sm:px-6 sm:py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                >
                  <h3 className="text-[clamp(16px,3.6vw,22px)] font-semibold text-white">
                    {item.q}
                  </h3>

                  {/* Plus / Minus in circular badge */}
                  <span
                    className={[
                      "grid size-9 place-items-center rounded-full border transition",
                      isOpen
                        ? "border-[#EDF900] bg-white/10"
                        : "border-white/20 bg-white/[0.06]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#EDF900"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      {isOpen ? (
                        <line x1="5" y1="12" x2="19" y2="12" />
                      ) : (
                        <>
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>

                {/* Body (animated height) */}
                <div
                  className={[
                    "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <div className="px-5 pb-5 pt-0 text-[clamp(14px,2.8vw,16px)] leading-7 text-white/85 sm:px-6 sm:pb-6">
                      {item.rich ? (
                        <p>
                          We offer innovative sports technology solutions,
                          including fan engagement tools, club management
                          systems, data analytics, and custom interactive
                          experiences.
                        </p>
                      ) : (
                        <p>{item.a}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#EDF900] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:brightness-95"
          >
            Contact Us
            <span className="grid size-6 place-items-center rounded-md bg-black/85 text-white">
              »
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
