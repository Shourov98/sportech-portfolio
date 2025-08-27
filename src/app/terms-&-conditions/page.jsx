// src/app/terms-and-conditions/page.jsx
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

// Sections that should display as bullet lists
const BULLET_SECTIONS = new Set(["3. User Responsibilities"]);

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* soft green halo */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(237,249,0,0.22),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-[clamp(28px,6vw,44px)] font-extrabold tracking-tight">
            {terms.title}
          </h1>
          {terms.subtitle && (
            <p className="mt-3 text-[clamp(14px,2.6vw,18px)] text-white/90 max-w-4xl mx-auto">
              {terms.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
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

                {/* If the section is marked for bullets, render as list; else paragraphs */}
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
