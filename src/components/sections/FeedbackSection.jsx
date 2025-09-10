// src/components/FeedbackSection.jsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useAppData } from "@/store/appData";

/* springs & variants */
const SPRING = { type: "spring", stiffness: 120, damping: 24, mass: 1 };
const topIn = {
  hidden: { opacity: 0, y: -32 },
  show: { opacity: 1, y: 0, transition: SPRING },
};
const leftIn = {
  hidden: { opacity: 0, x: -148 },
  show: { opacity: 1, x: 0, transition: SPRING },
};
const rightIn = {
  hidden: { opacity: 0, x: 148 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

/* parent with stagger so children cascade in */
const listStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // time between items
      delayChildren: 0.05, // initial delay
    },
  },
};

export default function FeedbackSection({
  title = "What Our Clients Say",
  ringSrc = "/feedback/ring.svg",
  items = defaultFeedbacks,
}) {
  const prefersReducedMotion = useReducedMotion();

  // read from store if present, else fallback to prop/defaults
  const storeFeedback = useAppData((s) => s.feedback);
  const list =
    Array.isArray(storeFeedback) && storeFeedback.length > 0
      ? storeFeedback.map((f) => ({
          name: f.name || "Anonymous",
          stars: Number(f.stars) || 5,
          avatar: f.avatar || "/feedback/profile-1.jpg",
          message: f.message || "",
        }))
      : items;

  return (
    <section className="relative bg-[#262626] py-8 md:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          variants={topIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="text-center text-[clamp(28px,6vw,56px)] font-bold leading-tight text-[#EDF900]"
        >
          {title}
        </motion.h2>

        {/* Background ring (hidden on small) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <Image
            src={ringSrc}
            alt=""
            width={496}
            height={496}
            className="absolute md:top-[110px] left-1/2 -translate-x-1/2 w-[496px] h-[496px] opacity-70 select-none pointer-events-none"
            priority
          />
        </div>

        {/* Cards with staggered entrance */}
        <motion.div
          variants={prefersReducedMotion ? undefined : listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          {list.map((f, i) => {
            const isYellow = i === 1 || i === 2;
            const dirVariant = prefersReducedMotion
              ? undefined
              : i % 2 === 0
              ? leftIn
              : rightIn;

            return (
              <motion.article
                key={`${f.name}-${i}`}
                variants={dirVariant}
                className={[
                  "rounded-2xl p-5 sm:p-6 lg:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
                  isYellow ? "bg-[#EDF900] text-black" : "bg-white text-black",
                ].join(" ")}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={f.avatar}
                      alt={f.name}
                      width={44}
                      height={44}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <h3 className="text-[clamp(16px,2.6vw,20px)] font-semibold">
                      {f.name}
                    </h3>
                  </div>
                  <Stars count={f.stars} />
                </div>

                {/* Message */}
                <p className="mt-4 text-[clamp(13px,2.2vw,15px)] leading-6 text-black/80">
                  {f.message}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* Small star component */
function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="#F5C518"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.49L10 13.9l-4.94 2.9.94-5.49-4-3.9 5.53-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

/* Demo fallback */
const defaultFeedbacks = [
  {
    name: "Sarah Malik",
    stars: 5,
    avatar: "/feedback/profile-1.jpg",
    message:
      "Sportech’s innovative solutions completely transformed our fan engagement. Their team is professional, responsive, and always delivers beyond expectations",
  },
  {
    name: "Sarah Malik",
    stars: 5,
    avatar: "/feedback/profile-2.jpg",
    message:
      "Working with Sportech has been a game-changer for our club. Their technology helped us streamline operations and connect better with our audience",
  },
  {
    name: "Sarah Malik",
    stars: 5,
    avatar: "/feedback/profile-3.jpg",
    message:
      "From concept to execution, the Sportech team was exceptional. They truly understand the sports sector and deliver results that make a difference",
  },
  {
    name: "Sarah Malik",
    stars: 5,
    avatar: "/feedback/profile-4.jpg",
    message:
      "Sportech’s innovative solutions completely transformed our fan engagement. Their team is professional, responsive, and always delivers beyond expectations",
  },
];
