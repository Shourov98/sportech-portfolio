// src/components/ServicesSection.jsx
"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { slugify } from "../../data/services";
import AnimatedSwapButton from "../AnimatedSwapButton";
import { useAppData } from "@/store/appData";

/* ===== Motion Variants ===== */
const SPRING = { type: "spring", stiffness: 140, damping: 22, mass: 0.9 };

const topIn = {
  hidden: { opacity: 0, y: -28 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const makeCardVariant = (from = "left") => ({
  hidden:
    from === "left"
      ? { opacity: 0, x: -60, y: 20, scale: 0.98 }
      : { opacity: 0, x: 60, y: 20, scale: 0.98 },
  show: { opacity: 1, x: 0, y: 0, scale: 1, transition: SPRING },
});

export default function ServicesSection({
  services = defaultServices,
  title = "Services & Solutions",
  subtitle = "Comprehensive Digital Sports Solutions",
  description,
  footerCtas = [{ label: "See More", href: "#" }],
  bgClass = "bg-[#262626]",
  containerClass = "",
  gridClass = "md:grid-cols-2 lg:grid-cols-3",
  sectionClass = "",
  cardButtonLabel = "View Details",
}) {
  const prefersReducedMotion = useReducedMotion();
  const apiServices = useAppData((s) => s.services);

  const mappedFromStore = useMemo(() => {
    if (!Array.isArray(apiServices) || apiServices.length === 0) return [];
    return apiServices.map((s) => ({
      title: s.title || s.name || "Untitled",
      icon: s.logo || s.bannerImage || s.rightImage || "/services/support.svg",
      excerpt: s.short_description || s.shortDesc || s.description || "",
      width: 154,
      height: 125,
    }));
  }, [apiServices]);

  const list = mappedFromStore.length ? mappedFromStore : services;

  return (
    <section
      id="services"
      className={`relative ${bgClass} py-16 sm:py-20 lg:py-28 ${sectionClass}`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClass}`}
      >
        {/* Heading */}
        <motion.div
          variants={topIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center"
        >
          <h2 className="font-bold text-[#e4ff25] tracking-tight text-[clamp(28px,5vw,56px)]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-[clamp(14px,2.6vw,18px)] text-white/80">
              {subtitle}
            </p>
          )}
          {!!description && (
            <p className="mx-auto mt-4 max-w-3xl text-[clamp(13px,2.2vw,16px)] leading-7 text-white/75">
              {description}
            </p>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={prefersReducedMotion ? undefined : containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className={`mt-10 grid grid-cols-1 items-stretch gap-6 sm:gap-7 ${gridClass}`}
        >
          {list.map((s, i) => (
            <ServiceCard
              key={`${s.title}-${i}`}
              {...s}
              buttonLabel={cardButtonLabel}
              // alternate entry direction
              variants={
                prefersReducedMotion
                  ? undefined
                  : makeCardVariant(i % 2 === 0 ? "left" : "right")
              }
            />
          ))}
        </motion.div>

        {/* Footer CTAs */}
        {footerCtas?.length > 0 && (
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3">
            {footerCtas.map((cta, i) => (
              <AnimatedSwapButton key={i} href="service">
                {cta.label}
              </AnimatedSwapButton>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ServiceCard({
  title,
  excerpt,
  icon,
  bullets,
  width,
  height,
  buttonLabel = "View Details",
  variants, // motion variants come from parent
}) {
  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col rounded-2xl bg-white ring-4 ring-white/90 shadow-md"
    >
      <div className="flex h-full flex-col p-4 sm:p-5">
        {/* Icon panel */}
        <div className="mb-4 w-full rounded-xl bg-[#262626] p-4 sm:p-6">
          <div className="relative w-full aspect-[328/191] grid place-items-center">
            <motion.img
              src={icon}
              alt=""
              width={width}
              height={height}
              className="block max-h-[80%] max-w-[80%] object-contain"
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />
          </div>
        </div>

        {/* Title + copy */}
        <h3 className="text-[clamp(16px,2.6vw,20px)] font-bold text-[#1b1d1e]">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 text-[clamp(13px,2.2vw,15px)] leading-6 text-[#394046]">
            {excerpt}
          </p>
        )}

        {Array.isArray(bullets) && bullets.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-[clamp(13px,2.2vw,15px)] text-[#394046]">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* CTA pinned to bottom */}
        <div className="mt-auto pt-5">
          <AnimatedSwapButton
            href={`/service/${slugify(title)}`}
            className="w-full"
          >
            {buttonLabel}
          </AnimatedSwapButton>
        </div>
      </div>
    </motion.article>
  );
}

/* Fallback demo data */
const defaultServices = [
  {
    title: "Subscription Management Platform",
    excerpt:
      "Enable fans to interact with clubs and participate in decision-making.",
    icon: "/services/subscription.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Match Streaming with Augmented Reality",
    excerpt:
      "Watch matches through player cameras for a more immersive experience.",
    icon: "/services/streaming-ar.svg",
    width: 154,
    height: 82,
  },
  {
    title: "Digital Currency Management",
    excerpt:
      "A fan-exclusive digital currency to encourage platform engagement.",
    icon: "/services/digital-currency.svg",
    width: 154,
    height: 173,
  },
  {
    title: "Sports Data Analytics",
    excerpt:
      "Support clubs with precise strategic decisions using AI-powered insights.",
    icon: "/services/data-analytics.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Sports Cyber Security",
    excerpt:
      "Protect club platforms from cyber attacks and ensure data safety.",
    icon: "/services/cyber-security.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Support Services",
    excerpt: "Annual maintenance and support services.",
    icon: "/services/support.svg",
    bullets: ["Annual Maintenance", "Support Services"],
    width: 154,
    height: 125,
  },
];
