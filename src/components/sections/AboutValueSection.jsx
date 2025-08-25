"use client";
import { motion } from "framer-motion";

const SPRING = {
  type: "spring",
  stiffness: 110,
  damping: 28,
  mass: 1,
  bounce: 0.04,
};

const topIn = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const bottomIn = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export default function AboutValuesSection({
  title = "Our Values",
  subtitle = "", // optional – add text if you want a subtitle
  items = defaultItems,
}) {
  return (
    <section className="relative bg-[#262626] py-16 sm:py-20 lg:py-28">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={topIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-[#e4ff25] font-extrabold tracking-tight text-[clamp(32px,6vw,56px)]"
        >
          {title}
        </motion.h2>

        {subtitle ? (
          <motion.p
            variants={topIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-2 text-white/90 text-[clamp(14px,3.2vw,18px)]"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 md:mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 justify-items-center">
          {items.map((it, idx) => {
            // On md screens only, center the 3rd card on its own row:
            const mdCenterThird =
              idx === 2
                ? "md:col-span-2 md:justify-self-center lg:col-span-1"
                : "";

            return (
              <div
                key={idx}
                className={`w-full flex flex-col items-center ${mdCenterThird}`}
              >
                {/* Frame (text) */}
                <motion.img
                  src={it.frame}
                  alt={it.titleAlt || ""}
                  variants={topIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...SPRING, delay: 0.05 + idx * 0.08 }}
                  className="block w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[400px] h-auto"
                />

                {/* Icon with soft circular badge */}
                <motion.div
                  variants={bottomIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...SPRING, delay: 0.12 + idx * 0.08 }}
                  className="mt-6 grid place-items-center"
                >
                  <div
                    className="relative grid place-items-center rounded-full
                  bg-white/6 ring-1 ring-white/10
                  w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
                  >
                    {/* subtle outer glow (optional) */}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full
                     bg-[#e4ff25]/10 blur-xl"
                    />
                    {/* the icon itself */}
                    <img
                      src={it.icon}
                      alt={`${it.titleAlt || ""} icon`}
                      className="relative w-12 h-auto sm:w-14 lg:w-16"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Default items using your paths */
const defaultItems = [
  {
    frame: "/values/Frame66.svg",
    icon: "/values/Innovation.svg",
    titleAlt: "Innovation",
  },
  {
    frame: "/values/Frame68.svg",
    icon: "/values/Transparency.svg",
    titleAlt: "Transparency",
  },
  {
    frame: "/values/Frame70.svg",
    icon: "/values/Innovation.svg", // you asked for Innovation.svg again
    titleAlt: "Partnership",
  },
];
