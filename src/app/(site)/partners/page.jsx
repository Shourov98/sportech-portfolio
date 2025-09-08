// src/app/(site)/partners/page.jsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppData } from "@/store/appData";

/* ---------- helpers ---------- */
function transformPartners(apiData = []) {
  return apiData.map((p) => ({
    id: p.slug || p._id,
    name: p.name,
    logo: p.logo,
    short_description: p.shortDesc,
    description: p.description,
    website: p.website || "#",
    links: {
      google_play: p.googlePlay || "#",
      app_store: p.appStore || "#",
      app_gallery: p.appGallery || "#",
    },
  }));
}

function StoreBadge({ href, label }) {
  if (!href || href === "#") return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-black ring-1 ring-black/10 shadow hover:brightness-95"
    >
      {label}
    </a>
  );
}

function LearnMoreLink({ website, id }) {
  const href = website && website !== "#" ? website : `/partners/${id}`;
  const isExternal = website && website !== "#";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1b1d1e] hover:underline"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="translate-y-[-1px]">↳</span> Learn more
    </a>
  );
}

/* ---------- motion presets ---------- */
const SPRING = { type: "spring", stiffness: 120, damping: 24, mass: 1 };

const topIn = {
  hidden: { opacity: 0, y: -36 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const gridIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const cardIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

/* ---------- Card ---------- */
function PartnerCard({ p }) {
  return (
    <motion.article
      variants={cardIn}
      className="w-full max-w-[420px] min-w-[300px] lg:w-1/3"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 shadow-sm"
      >
        {/* Logo */}
        <div className="relative grid h-40 w-full place-items-center bg-white">
          <Image
            src={p.logo}
            alt={p.name}
            width={340}
            height={160}
            className="max-h-24 w-auto object-contain"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 border-t border-black/5 bg-gray-50 px-4 py-4 sm:px-5">
          <h3 className="text-[17px] font-semibold text-[#1b1d1e]">{p.name}</h3>
          <p className="text-[13px] leading-5 text-[#394046] line-clamp-6">
            {p.short_description}
          </p>

          <LearnMoreLink website={p.website} id={p.id} />

          {(p.links.google_play ||
            p.links.app_store ||
            p.links.app_gallery) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <StoreBadge
                href={p.links.google_play}
                label="GET IT ON Google Play"
              />
              <StoreBadge href={p.links.app_store} label="Download App Store" />
              <StoreBadge
                href={p.links.app_gallery}
                label="Download AppGallery"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ---------- Page ---------- */
export default function PartnersPage() {
  const raw = useAppData((s) => s.partners);
  const partners = useMemo(() => transformPartners(raw || []), [raw]);

  return (
    <main className="bg-[#262626]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="relative mx-auto w-full">
          {/* Reserve the exact hero height for the background image */}
          <div className="h-[260px] sm:h-[320px] lg:h-[423px]" />

          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/partners/partnersHeroBG.svg"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
            {/* Optional dark overlay for legibility */}
            <div className="absolute inset-0 bg-black/35" />
            {/* Faint radial glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(237,249,0,0.22),transparent_60%)]" />
          </div>

          {/* Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-6xl px-4">
              <motion.h1
                variants={topIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                className="text-center text-[clamp(28px,5.2vw,44px)] font-extrabold tracking-tight text-[#EDF900]"
              >
                Partner Directory
              </motion.h1>
              <motion.p
                variants={topIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ ...SPRING, delay: 0.08 }}
                className="mx-auto mt-3 max-w-3xl text-center text-[clamp(14px,2.6vw,16px)] leading-7 text-white/90"
              >
                We work alongside trusted partners who share our passion for
                innovation, quality, and excellence in sports. Together, we
                create impactful solutions that elevate the sports experience.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID (centered, responsive, animated) */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {partners.length === 0 ? (
            <p className="text-center text-white/70">No partners to display.</p>
          ) : (
            <motion.div
              variants={gridIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap justify-center gap-6 lg:gap-6"
            >
              {partners.map((p) => (
                <PartnerCard key={p.id} p={p} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
