"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function TeamSection({ team = defaultTeam }) {
  return (
    <section className="relative bg-[#262626] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[clamp(28px,5vw,44px)] font-extrabold text-[#EDF900] tracking-tight">
            Our Professional Team
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base text-white/80">
            A diverse group of builders, strategists, and creators dedicated to
            delivering world-class digital sports solutions.
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
          {team.map((m) => (
            <motion.li
              key={m.name}
              variants={item}
              className="w-[min(90vw,320px)] sm:w-[300px]"
            >
              <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/10">
                {/* Image */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={m.src}
                    alt={m.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    priority={false}
                  />
                </div>

                {/* Glass overlay on hover */}
                <figcaption
                  className="
                    pointer-events-none absolute inset-0 grid place-items-center
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                  "
                >
                  <div
                    className="
                      mx-6 w-full max-w-xs rounded-2xl
                      bg-white/10 backdrop-blur-md
                      ring-1 ring-white/20
                      shadow-[0_20px_60px_rgba(0,0,0,.45)]
                      px-6 py-5 text-center
                    "
                  >
                    <div className="text-white font-bold text-lg">{m.name}</div>
                    <div className="mt-2 h-px w-24 mx-auto bg-white/80" />
                    <div className="mt-2 text-white/90 text-sm">{m.role}</div>
                  </div>
                </figcaption>

                {/* Subtle neon edge on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#b7a6ff]/60 transition" />
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* --------- Example data (replace src with your actual images in /public/team/...) --------- */
const defaultTeam = [
  { name: "Fahad Al-Mutairi", role: "Founder & CEO", src: "/team/Team1.png" },
  { name: "Sara Al-Hassan", role: "Head of Product", src: "/team/Team2.png" },
  { name: "Omar Al-Harbi", role: "Engineering Lead", src: "/team/Team3.png" },
  { name: "Lina Al-Qahtani", role: "UX Lead", src: "/team/Team4.png" },
  { name: "Maya Al-Anazi", role: "Marketing Manager", src: "/team/Team5.png" },
];
