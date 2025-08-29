// src/app/partners/[id]/page.jsx
import Image from "next/image";
import { notFound } from "next/navigation";
import partners from "@/data/partners.json" assert { type: "json" };

/* ---------- Helpers ---------- */
function getPartner(id) {
  return (partners || []).find((p) => p.id === id);
}

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/g) // split by blank line(s)
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ---------- Static params for prerender ---------- */
export function generateStaticParams() {
  return (partners || []).map((p) => ({ id: p.id }));
}

/* ---------- SEO ---------- */
export function generateMetadata({ params }) {
  const p = getPartner(params.id);
  if (!p) return { title: "Partner not found" };
  return {
    title: `${p.name} — Partner`,
    description: p.short_description || "Partner overview",
  };
}

/* ---------- Page ---------- */
export default function PartnerDetailPage({ params }) {
  const p = getPartner(params.id);
  if (!p) notFound();

  const paragraphs = splitParagraphs(p.description);

  return (
    <main className="bg-[#262626] text-white">
      {/* HERO (same geometry as Terms page: 423px) */}
      <section className="relative isolate h-[423px] overflow-hidden">
        {/* Background image — use your shared hero, e.g. /gradient.svg */}
        <Image
          src="/gradient.svg"
          alt=""
          fill
          priority
          className="pointer-events-none select-none object-cover object-center"
        />
        {/* optional soft overlay for readability */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-4 text-center">
          <div>
            <h1 className="text-[clamp(26px,5vw,40px)] font-extrabold tracking-tight">
              {p.name}
            </h1>
            {p.tagline && (
              <p className="mt-2 text-white/90 text-[clamp(14px,2.4vw,18px)]">
                {p.tagline}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT (pushed down a bit for nicer rhythm under the hero) */}
      <section className="relative pt-10 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* LEFT: info card */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-white text-[#1b1d1e] shadow ring-1 ring-black/10">
              {/* Logo */}
              <div className="grid place-items-center bg-white px-6 pt-6">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={380}
                  height={140}
                  className="w-auto max-h-24 object-contain"
                />
              </div>

              <div className="space-y-5 px-6 pb-6 pt-4">
                {/* Visit website */}
                {p.website && p.website !== "#" && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#EDF900] px-5 py-2 font-semibold text-black shadow transition hover:brightness-95"
                  >
                    Visit Website
                    <span className="inline-grid size-5 place-items-center rounded-md bg-black/85 text-white">
                      »
                    </span>
                  </a>
                )}

                {/* Optional fields if present in JSON */}
                {p.specialization && (
                  <div>
                    <h4 className="font-semibold">Specialization</h4>
                    <p className="mt-1 text-[13px] text-[#394046]">
                      {p.specialization}
                    </p>
                  </div>
                )}
                {p.region && (
                  <div>
                    <h4 className="font-semibold">Region</h4>
                    <p className="mt-1 text-[13px] text-[#394046]">
                      {p.region}
                    </p>
                  </div>
                )}
                {p.language && (
                  <div>
                    <h4 className="font-semibold">Language</h4>
                    <p className="mt-1 text-[13px] text-[#394046]">
                      {p.language}
                    </p>
                  </div>
                )}

                {/* Store badges */}
                {(p.links?.google_play ||
                  p.links?.app_store ||
                  p.links?.app_gallery) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.links?.google_play && (
                      <a
                        href={p.links.google_play}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-black/90 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        GET IT ON Google play
                      </a>
                    )}
                    {p.links?.app_store && (
                      <a
                        href={p.links.app_store}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-black/90 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Download App Store
                      </a>
                    )}
                    {p.links?.app_gallery && (
                      <a
                        href={p.links.app_gallery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-black/90 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Download AppGallery
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT: description */}
          <div className="lg:col-span-7">
            <h2 className="mb-4 text-[clamp(18px,3vw,24px)] font-extrabold">
              About Partner
            </h2>

            <div className="space-y-5 text-[15px] leading-7 text-white/90">
              {paragraphs.length ? (
                paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
              ) : (
                <p>{p.short_description}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
