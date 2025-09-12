// src/components/FAQSection.jsx
"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppData } from "@/store/appData"; // ← pull from zustand
import AnimatedSwapButton from "../AnimatedSwapButton";

const SPRING = { type: "spring", stiffness: 140, damping: 18, mass: 0.9 };
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

  // 1) Read from store
  const faqsFromStore = useAppData((s) => s.faqs);

  // 2) Normalize store → component shape
  const faqs = useMemo(() => {
    if (Array.isArray(faqsFromStore) && faqsFromStore.length > 0) {
      return faqsFromStore.map((f) => ({
        id: f._id ?? f.id ?? f.question ?? cryptoRandomKey(),
        q: f.question ?? "",
        a: f.answer ?? "",
        rich: false, // set true if you later want to render rich HTML for a subset
      }));
    }
    // fallback demo content (your current hardcoded list)
    return [
      {
        id: "d1",
        q: "What services does Sportech provide?",
        a: "We offer innovative sports technology solutions, including fan engagement tools, club management systems, data analytics, and custom interactive experiences.",
        rich: true,
      },
      {
        id: "d2",
        q: "Do you only work with sports clubs?",
        a: "Mostly clubs, but we also partner with leagues, venues, and sports businesses.",
      },
      {
        id: "d3",
        q: "Can you create a custom solution for my needs?",
        a: "Yes—every solution is tailored to your goals, integrations, and budget.",
      },
      {
        id: "d4",
        q: "How long does it take to build a website or platform?",
        a: "MVPs often ship in 6–10 weeks; larger platforms can take 3–6 months, depending on scope.",
      },
      {
        id: "d5",
        q: "Do you provide ongoing support after launch?",
        a: "Absolutely—maintenance, updates, and support packages are available.",
      },
    ];
  }, [faqsFromStore]);

  return (
    <section id="faq" className="relative bg-[#262626] py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Title (capsule locked to last character) */}
        <div className="relative mx-auto mb-8 text-center sm:mb-10">
          <motion.h2
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="font-bold tracking-tight text-[#EDF900] text-[clamp(28px,6vw,48px)] leading-[1.1] inline-block"
          >
            {/* Everything except the last character */}
            <span>Frequently Asked Questions</span>
            {/* Wrap the last character to anchor the capsule */}
            <span className="relative inline-block align-top">
              ?
              <motion.span
                variants={topIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...SPRING, delay: 0.08 }}
                className="
          absolute left-full top-0
          -translate-y-[60%] translate-x-[8px]
          select-none rounded-full bg-gray-100 px-3 py-1
          text-[14px] text-[#262626]
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          rotate-[15deg]
        "
                aria-hidden="true"
              >
                FAQ
              </motion.span>
            </span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            const rowVariants = i % 2 === 0 ? leftIn : rightIn;

            return (
              <motion.div
                key={item.id ?? item.q}
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

                  {/* Plus / Minus */}
                  <span
                    className={[
                      "grid size-9 place-items-center rounded-full border transition",
                      isOpen
                        ? "border-[#262626] bg-white/80"
                        : "border-white/60 bg-white/80",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#262626"
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

                {/* Body */}
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
          <AnimatedSwapButton href="/contact-us">Contact Us</AnimatedSwapButton>
        </div>
      </div>
    </section>
  );
}

// tiny helper to generate a stable-ish id if backend lacks one
function cryptoRandomKey() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return `k_${arr[0].toString(16)}`;
  }
  return `k_${Math.random().toString(16).slice(2)}`;
}
