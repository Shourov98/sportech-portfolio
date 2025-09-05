// src/app/(site)/partners/[id]/page.jsx
"use client";

import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useAppData } from "@/store/appData";

/* ---------- Helpers ---------- */
function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/g) // split by blank line(s)
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ---------- Page ---------- */
export default function PartnerDetailPage() {
  const { id } = useParams(); // dynamic slug
  const partners = useAppData((s) => s.partners || []);

  // find by slug or fallback to _id
  const p = partners.find((p) => p.slug === id || p._id === id);
  if (!p) return notFound();

  const paragraphs = splitParagraphs(p.description);

  return (
    <main className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate h-[423px] overflow-hidden">
        <Image
          src="/gradient.svg"
          alt=""
          fill
          priority
          className="pointer-events-none select-none object-cover object-center"
        />
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

      {/* CONTENT */}
      <section className="relative pt-10 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* LEFT: info card */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-white text-[#1b1d1e] shadow ring-1 ring-black/10">
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

                {(p.googlePlay || p.appStore || p.appGallery) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.googlePlay && (
                      <a
                        href={p.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-black/90 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        GET IT ON Google Play
                      </a>
                    )}
                    {p.appStore && (
                      <a
                        href={p.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-black/90 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Download App Store
                      </a>
                    )}
                    {p.appGallery && (
                      <a
                        href={p.appGallery}
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
                <p>{p.shortDesc}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
