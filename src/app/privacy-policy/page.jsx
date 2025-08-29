// Server Component (no "use client")
import policy from "@/data/privacy-policy.json";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — SporTech",
  description:
    "Learn how SporTech collects, uses, and protects your information. We collect only necessary data and do not share it without consent.",
};

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Titles that should show bullet lists (not paragraphs)
const BULLET_SECTIONS = new Set([
  "2. Information We Collect",
  "3. How We Use Your Information",
  "5. Sharing Your Information",
]);

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Background image (SVG/PNG) */}
        <Image
          src="/gradient.svg"
          alt=""
          fill
          priority
          className="object-cover object-center pointer-events-none select-none"
        />

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="pt-10 text-[clamp(28px,6vw,44px)] font-extrabold tracking-tight">
            {policy.title}
          </h1>
          {policy.subtitle && (
            <p className="mt-3 text-[clamp(14px,2.6vw,18px)] text-white/90 max-w-3xl mx-auto">
              {policy.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-9">
          {policy.sections?.map((sec) => {
            // Support both schemas:
            const heading = sec.heading ?? sec.title ?? "";
            const paragraphs =
              sec.paragraphs ??
              (BULLET_SECTIONS.has(heading) ? [] : sec.description) ??
              [];
            const bullets =
              sec.bullets ??
              (BULLET_SECTIONS.has(heading) ? sec.description : []) ??
              [];

            const id = slugify(heading);
            return (
              <article key={id} id={id} className="scroll-mt-24">
                <h2 className="text-[clamp(18px,3.4vw,24px)] font-extrabold">
                  {heading}
                </h2>

                {/* paragraphs */}
                {paragraphs.map((p, i) => (
                  <p
                    key={`p-${i}`}
                    className="mt-3 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90"
                  >
                    {p}
                  </p>
                ))}

                {/* bullets */}
                {bullets.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90">
                    {bullets.map((b, i) => (
                      <li key={`b-${i}`}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
