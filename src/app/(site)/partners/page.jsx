// src/app/(site)/partners/page.jsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppData } from "@/store/appData";

/* ---------- normalize API ---------- */
function transformPartners(apiData = []) {
  return apiData.map((p) => ({
    id: p.slug || p._id,
    name: p.name,
    logo: p.logo,
    short_description: p.shortDesc,
    description: p.description,
    website: p.website || "#",
    specialization: p.specialization || "",
    region: p.region || "",
    language: p.language || "",
    links: {
      google_play: p.googlePlay || "#",
      app_store: p.appStore || "#",
      app_gallery: p.appGallery || "#",
    },
  }));
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

/* ---------- small bits ---------- */
function LearnMoreLink({ website, id }) {
  const href = website && website !== "#" ? website : `/partners/${id}`;
  const isExternal = website && website !== "#";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-[14px] font-medium text-[#6c8a00] hover:underline"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="translate-y-[-1px]">↳</span> Learn more
    </a>
  );
}

// keep the same signature
function StoreBadges({ links }) {
  // Always render all three badges; use "#" when missing
  const items = [
    {
      href: links.google_play || "#",
      src: "/partners/googlePlay.svg",
      alt: "GET IT ON Google play",
    },
    {
      href: links.app_store || "#",
      src: "/partners/appleStore.svg",
      alt: "Download App Store",
    },
    {
      href: links.app_gallery || "#",
      src: "/partners/appGallery.svg",
      alt: "Download AppGallery",
    },
  ];
  return (
    <div className="mt-3 flex w-full items-center gap-1">
      {items.map((it, i) => (
        <a
          key={i}
          href={it.href}
          target={it.href !== "#" ? "_blank" : undefined}
          rel={it.href !== "#" ? "noopener noreferrer" : undefined}
          aria-disabled={it.href === "#"}
          className="flex-1 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={it.src}
            alt={it.alt}
            className="block h-[36px] w-auto object-contain align-middle"
          />
        </a>
      ))}
    </div>
  );
}

/* ---------- Card (two stacked sections) ---------- */
function PartnerCard({ p }) {
  return (
    <motion.article variants={cardIn} className="h-full">
      <div className="flex h-full flex-col">
        {/* DETAILS (logo + title + short description + learn more) */}
        <div className="overflow-hidden rounded-[20px] bg-[#E5E5E5] ring-1 ring-black/10 shadow">
          {/* logo panel — NO padding */}
          <div className="grid h-[152px] w-full place-items-center rounded-[16px] border border-black/10 bg-white">
            <Image
              src={p.logo}
              alt={p.name}
              width={340}
              height={120}
              className="max-h-20 w-auto object-contain"
            />
          </div>

          {/* text block */}
          <div className="px-5 pt-5 pb-6">
            <h3 className="text-[20px] text-center font-semibold text-[#1b1d1e]">
              {p.name}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[#394046]">
              {p.short_description}
            </p>

            <div className="mt-3 text-center">
              <LearnMoreLink website={p.website} id={p.id} />
            </div>
          </div>
        </div>

        {/* LINKS (badges) — full width, evenly spaced */}
        <StoreBadges links={p.links} />
      </div>
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
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[55vh] sm:min-h-[60vh] lg:min-h-[65vh]">
          <Image
            src="/partners/partnersHeroBG.svg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(237,249,0,0.22),transparent_60%)]" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-6xl px-4">
              <motion.h1
                variants={topIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                className="text-center text-[clamp(34px,7vw,64px)] font-extrabold tracking-tight text-[#EDF900]"
              >
                Partner Directory
              </motion.h1>
              <motion.p
                variants={topIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ ...SPRING, delay: 0.08 }}
                className="mx-auto mt-3 max-w-3xl text-center text-[clamp(18px,2.6vw,20px)] leading-7 text-white/80"
              >
                We work alongside trusted partners who share our passion for
                innovation, quality, and excellence in sports. Together, we
                create impactful solutions that elevate the sports experience.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
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
              className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3"
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
