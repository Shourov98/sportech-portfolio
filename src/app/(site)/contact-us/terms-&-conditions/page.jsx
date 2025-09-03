// src/app/terms-and-conditions/page.jsx
import Image from "next/image";
import terms from "@/data/terms-and-conditions.json";

// SEO
export const metadata = {
  title: "Terms & Conditions — SporTech",
  description:
    "Read the terms and conditions for using SporTech's website, services, and products.",
};

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const BULLET_SECTIONS = new Set(["3. User Responsibilities"]);

// <<<—— Adjust this path to your asset if different
const HERO_SVG = "/terms/terms-hero.svg";

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-[#262626] text-white">
      {/* HERO with SVG background */}
      <section className="relative isolate h-[423px] overflow-hidden">
        {/* Background image (SVG/PNG) */}
        <Image
          src="/gradient.svg"
          alt=""
          fill
          priority
          className="object-cover object-center pointer-events-none select-none"
        />

        {/* Optional soft tint to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Centered heading content */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-4 text-center">
          <div>
            <h1 className="text-[clamp(28px,6vw,44px)] font-extrabold tracking-tight">
              {terms.title}
            </h1>
            {terms.subtitle && (
              <p className="mt-3 text-[clamp(14px,2.6vw,18px)] text-white/90 max-w-4xl mx-auto">
                {terms.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16 pt-5 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          {terms.sections?.map((sec) => {
            const heading = sec.title ?? "";
            const id = slugify(heading);
            const isBulleted =
              sec.bulleted === true || BULLET_SECTIONS.has(heading);

            return (
              <article key={id} id={id} className="scroll-mt-24">
                <h2 className="text-[clamp(18px,3.4vw,24px)] font-extrabold">
                  {heading}
                </h2>

                {isBulleted ? (
                  <ul className="mt-3 list-disc pl-5 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90">
                    {sec.description?.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  sec.description?.map((p, i) => (
                    <p
                      key={i}
                      className="mt-3 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90"
                    >
                      {p}
                    </p>
                  ))
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
