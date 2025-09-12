// src/components/sections/TeamSection.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useAppData } from "@/store/appData"; // ← your zustand store

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 },
  },
};

export default function TeamSection() {
  const rawTeam = useAppData((s) => s.team || []);

  // Normalize API → UI shape
  const team = useMemo(() => {
    return (
      (rawTeam || [])
        .map((m) => ({
          name: m.name || m.fullName || "",
          role: m.role || m.designation || "",
          src: m.photo || m.image || m.avatar || "/team/placeholder.png", // local fallback
        }))
        // keep only members that at least have a name + img
        .filter((m) => m.name && m.src)
    );
  }, [rawTeam]);

  return (
    <section className="relative bg-[#262626] py-8 md:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[clamp(28px,5vw,44px)] font-bold text-[#EDF900] tracking-tight">
            Our Professional Team
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base text-white/80">
            Our team is a blend of creative thinkers, strategic planners, and
            technology innovators who share one goal — to revolutionize the
            sports industry. With diverse expertise and a shared passion for
            excellence, we work together to deliver world-class digital
            solutions.
          </p>
        </div>

        {/* Grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          {team.length === 0 ? (
            <li className="text-white/70">No team members to display.</li>
          ) : (
            team.map((m, idx) => (
              <motion.li
                key={`${m.name}-${idx}`}
                variants={item}
                className="w-[min(90vw,320px)] sm:w-[300px]"
              >
                <figure className="group relative overflow-hidden">
                  {/* Image */}
                  <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[420px] bg-black/10">
                    <Image
                      src={m.src}
                      alt={m.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-contain transition duration-300"
                      priority={false}
                      onError={(e) => {
                        // graceful fallback if remote image fails
                        // @ts-ignore - next/image forwards to underlying <img>
                        e.currentTarget.src = "/team/placeholder.png";
                      }}
                    />
                    {/* Glass overlay + text on hover */}
                    <figcaption className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {/* glass layer */}
                      <div className="absolute inset-0 bg-white/10 supports-[backdrop-filter]:bg-white/15 backdrop-blur-md" />
                      {/* text block */}
                      <div className="relative mx-6 max-w-xs text-center">
                        <div className="text-white font-bold text-lg">
                          {m.name}
                        </div>
                        <div className="mt-2 h-px w-24 mx-auto bg-white/80" />
                        <div className="mt-2 text-white/90 text-sm">
                          {m.role}
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </motion.li>
            ))
          )}
        </motion.ul>
      </div>
    </section>
  );
}
