"use client";
import { motion } from "framer-motion";

const SPRING = {
  type: "spring",
  stiffness: 100, // lower = slower
  damping: 32, // higher = smoother settle
  mass: 1.1,
  bounce: 0.05,
  restDelta: 0.001,
};

const leftIn = {
  hidden: { opacity: 0, x: -160, y: -60 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

const rightIn = {
  hidden: { opacity: 0, x: 120, y: -60 },
  show: { opacity: 1, x: 0, transition: SPRING },
};

const downIn = {
  hidden: { opacity: 0, y: -60 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#262626] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          className="text-center font-bold pb-5 text-[#EDF900] tracking-tight text-[clamp(32px,5.6vw,64px)] leading-[1.15]"
          variants={downIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Contact Us
        </motion.h2>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {/* Left: Get in touch */}
          <motion.div
            className="rounded-2xl border border-black/5 bg-white/5 p-5 sm:p-6 lg:p-7 backdrop-blur-3xl"
            variants={leftIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-white text-[clamp(22px,3.4vw,36px)] font-bold">
                  Get in touch
                </h3>

                <ul className="space-y-4 text-white">
                  <li className="flex items-start gap-3">
                    <IconBadge>
                      {/* replace with your own SVG */}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="#EDF900"
                        strokeWidth="1.5"
                      >
                        <path d="M12 22s8-4.5 8-11A8 8 0 1 0 4 11c0 6.5 8 11 8 11Z" />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    </IconBadge>
                    <p className="text-[clamp(15px,2.6vw,18px)] leading-relaxed">
                      Riyadh, Saudi Arabia
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconBadge>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="#EDF900"
                        strokeWidth="1.5"
                      >
                        <path d="M4 7l8 5 8-5" />
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                      </svg>
                    </IconBadge>
                    <a
                      href="mailto:contact@sportech.com.sa"
                      className="text-[clamp(15px,2.6vw,18px)] leading-relaxed underline"
                    >
                      contact@sportech.com.sa
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconBadge>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="#EDF900"
                        strokeWidth="1.5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.78.6 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.16a2 2 0 0 1 2.11-.45c.85.28 1.73.48 2.63.6A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </IconBadge>
                    <a
                      href="tel:+966114222225"
                      className="text-[clamp(15px,2.6vw,18px)] leading-relaxed"
                    >
                      +966114222225
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-[clamp(22px,3.4vw,36px)] font-bold">
                  Follow our social media
                </h3>
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Replace placeholders with your SVG icons */}
                  <SocialBox ariaLabel="Facebook">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="currentColor"
                    >
                      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.41.67-1.41 1.36V12h2.4l-.38 2.9h-2.02v7A10 10 0 0 0 22 12Z" />
                    </svg>
                  </SocialBox>
                  <SocialBox ariaLabel="TikTok">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="currentColor"
                    >
                      <path d="M16 8.04c1.28.93 2.84 1.48 4.54 1.48V7.03a6.73 6.73 0 0 1-4.56-1.77V3h-3.6v12.1a2.5 2.5 0 1 1-2.1-2.45v-3.6A6.1 6.1 0 1 0 14.38 19V8.04H16Z" />
                    </svg>
                  </SocialBox>
                  <SocialBox ariaLabel="Instagram">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="currentColor"
                    >
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm8 3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-3 3.8A3.2 3.2 0 1 1 8.8 12 3.2 3.2 0 0 1 12 8.8Zm5.1-.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
                    </svg>
                  </SocialBox>
                  <SocialBox ariaLabel="YouTube">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="currentColor"
                    >
                      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5a3 3 0 0 0-2.1 2.1A31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 14.7V9.3L15.2 12 10 14.7Z" />
                    </svg>
                  </SocialBox>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="rounded-2xl border border-black/5 bg-white/5 p-5 sm:p-6 lg:p-7 backdrop-blur-3xl"
            variants={rightIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="mx-auto max-w-xl">
              <h3 className="text-center text-white text-[clamp(22px,3.4vw,36px)] font-bold">
                Send us message
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault(); /* handle submit */
                }}
                className="mt-6 space-y-4"
              >
                {/* Names */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Last Name">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="First Name">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email">
                  <input
                    type="email"
                    placeholder="Email"
                    className={inputCls}
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className={inputCls}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className={inputCls + " resize-none"}
                  />
                </Field>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#EDF900] px-6 py-3 font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:brightness-95"
                >
                  Submit
                  <span className="inline-grid size-6 place-items-center rounded-md bg-black/85 text-white">
                    »
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-white/60 outline-none focus-visible:border-[#EDF900] focus-visible:ring-2 focus-visible:ring-[#EDF900]/40";

function Field({ label, children }) {
  return (
    <label className="block text-white/70">
      <span className="mb-1 inline-block text-sm">{label}</span>
      {children}
    </label>
  );
}

function IconBadge({ children }) {
  return (
    <span className="mt-1 grid size-8 place-items-center rounded-full border border-[#EDF900]/60 text-[#EDF900]">
      {children}
    </span>
  );
}

function SocialBox({ children, ariaLabel }) {
  return (
    <button
      aria-label={ariaLabel}
      className="inline-flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#FCFED9] text-black transition hover:brightness-95"
      type="button"
    >
      {children}
    </button>
  );
}
