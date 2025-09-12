// src/app/(site)/partners/[id]/page.jsx
"use client";

import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useAppData } from "@/store/appData";
import AnimatedSwapButton from "@/components/AnimatedSwapButton";

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
  const p = partners.find((x) => x.slug === id || x._id === id);
  if (!p) return notFound();

  const paragraphs = splitParagraphs(p.description);

  // normalize store links (always render, fallback to "#")
  const links = {
    google: p.googlePlay || "#",
    appstore: p.appStore || "#",
    appgallery: p.appGallery || "#",
  };

  console.log(p);

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
            <h1 className="text-[clamp(26px,5vw,50px)] font-bold tracking-tight">
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
            <div
              className="overflow-hidden rounded-2xl bg-white text-[#1b1d1e]
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        ring-2 ring-[#EDF900]/80"
            >
              {/* Logo area — no padding, full width */}
              <div className="grid h-[252px] w-full place-items-center bg-white rounded-t-2xl border-b border-black/10">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={420}
                  height={240}
                  className="w-auto max-h-40 object-contain"
                />
              </div>

              {/* Body */}
              <div className="space-y-6 px-6 py-6">
                {/* Visit Website FIRST — using your custom button */}
                <div>
                  <AnimatedSwapButton href={p.website || "#"}>
                    Visit Website
                  </AnimatedSwapButton>
                </div>

                {/* Specialization */}
                <div>
                  <h4 className="text-[17px] font-semibold">Specialization</h4>
                  <p className="mt-1 text-[14px] leading-6 text-[#394046]">
                    {p.specialization || "—"}
                  </p>
                </div>

                {/* Region */}
                <div>
                  <h4 className="text-[17px] font-semibold">Region</h4>
                  <p className="mt-1 text-[14px] leading-6 text-[#394046]">
                    {p.region || "—"}
                  </p>
                </div>

                {/* Language */}
                <div>
                  <h4 className="text-[17px] font-semibold">Language</h4>
                  <p className="mt-1 text-[14px] leading-6 text-[#394046]">
                    {p.language || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Store badges BELOW the card — always visible & full width */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <a
                href={links.google}
                target={links.google !== "#" ? "_blank" : undefined}
                rel={links.google !== "#" ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/partners/googlePlay.svg"
                  alt="Get it on Google Play"
                  className="block h-[clamp(30px,4vw,40px)] w-auto object-contain"
                />
              </a>

              <a
                href={links.appstore}
                target={links.appstore !== "#" ? "_blank" : undefined}
                rel={links.appstore !== "#" ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/partners/appleStore.svg"
                  alt="Download on the App Store"
                  className="block h-[clamp(30px,4vw,40px)] w-auto object-contain"
                />
              </a>

              <a
                href={links.appgallery}
                target={links.appgallery !== "#" ? "_blank" : undefined}
                rel={
                  links.appgallery !== "#" ? "noopener noreferrer" : undefined
                }
                className="inline-flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/partners/appGallery.svg"
                  alt="Download on AppGallery"
                  className="block h-[clamp(30px,4vw,40px)] w-auto object-contain"
                />
              </a>
            </div>
          </aside>

          {/* RIGHT: description */}
          <div className="lg:col-span-7">
            <h2 className="mb-4 text-[clamp(25px,3vw,30px)] text-center font-bold">
              About Partner
            </h2>

            <div className="space-y-5 text-[18px] leading-7 text-white/90">
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
