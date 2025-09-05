// app/terms-conditions/page.jsx
import Image from "next/image";

export const metadata = {
  title: "Terms & Conditions — SporTech",
  description:
    "Review the terms and conditions for using SporTech's services. By accessing our platform, you agree to these terms and conditions.",
};

// Simple constants
const SLUG = "terms-and-conditions";
const BULLET_SECTIONS = new Set([
  "2. User Responsibilities",
  "3. Intellectual Property",
  "4. Limitation of Liability",
]);

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Convert API section to a consistent shape for rendering
function normalizeSection(sec) {
  const heading = sec?.heading ?? sec?.title ?? "";

  // already structured
  if (Array.isArray(sec?.paragraphs) || Array.isArray(sec?.bullets)) {
    return {
      heading,
      paragraphs: Array.isArray(sec?.paragraphs) ? sec.paragraphs : [],
      bullets: Array.isArray(sec?.bullets) ? sec.bullets : [],
    };
  }

  // string or array description
  let paragraphs = [];
  if (typeof sec?.description === "string") {
    paragraphs = sec.description
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  } else if (Array.isArray(sec?.description)) {
    paragraphs = sec.description.map(String).filter(Boolean);
  }

  // some headings are bullet lists
  if (BULLET_SECTIONS.has(heading)) {
    return { heading, paragraphs: [], bullets: paragraphs };
  }
  return { heading, paragraphs, bullets: [] };
}

async function getPolicy() {
  const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!BASE) {
    // Make the failure obvious in dev if env is missing
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Example: https://api.sportech.com.sa"
    );
  }

  const url = `${BASE}/policies/${encodeURIComponent(SLUG)}`;
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) {
    return { title: "Terms & Conditions", subtitle: "", sections: [] };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to load terms ${res.status}: ${text}`);
  }

  const data = await res.json();
  return {
    title: data?.title ?? "Terms & Conditions",
    subtitle: data?.subtitle ?? "",
    sections: Array.isArray(data?.sections)
      ? data.sections.map(normalizeSection)
      : [],
  };
}

export default async function TermsConditionsPage() {
  const policy = await getPolicy();

  return (
    <main className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/gradient.svg"
          alt=""
          fill
          priority
          className="pointer-events-none select-none object-cover object-center"
        />

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="pt-10 text-[clamp(28px,6vw,44px)] font-extrabold tracking-tight">
            {policy.title}
          </h1>
          {policy.subtitle && (
            <p className="mx-auto mt-3 max-w-3xl text-[clamp(14px,2.6vw,18px)] text-white/90">
              {policy.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl space-y-9 px-4 sm:px-6 lg:px-8">
          {policy.sections.map((sec) => {
            const id = slugify(sec.heading);
            return (
              <article key={id} id={id} className="scroll-mt-24">
                <h2 className="text-[clamp(18px,3.4vw,24px)] font-extrabold">
                  {sec.heading}
                </h2>

                {/* paragraphs */}
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={`p-${i}`}
                    className="mt-3 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90"
                  >
                    {p}
                  </p>
                ))}

                {/* bullets */}
                {sec.bullets.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 text-[clamp(13px,2.2vw,16px)] leading-7 text-white/90">
                    {sec.bullets.map((b, i) => (
                      <li key={`b-${i}`} className="mb-2">{b}</li>
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