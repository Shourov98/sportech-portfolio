import Image from "next/image";
// If your project supports JSON imports without "assert", you can omit the assert:
import partners from "@/data/partners.json" assert { type: "json" };

/** Deduplicate by id and keep only items that have logo + name */
function getUniquePartners(data) {
  const seen = new Set();
  const out = [];
  for (const p of data ?? []) {
    if (!p?.id || seen.has(p.id)) continue;
    if (!p?.logo || !p?.name) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

function StoreBadge({ href, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-black ring-1 ring-black/10 shadow hover:brightness-95"
    >
      {label}
    </a>
  );
}

function LearnMoreLink({ website, id }) {
  const href = website && website !== "#" ? website : `/partners/${id}`; // if you create a detail page later
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1b1d1e] hover:underline"
      target={website && website !== "#" ? "_blank" : undefined}
      rel={website && website !== "#" ? "noopener noreferrer" : undefined}
    >
      {/* tiny arrow like the mock */}
      <span className="translate-y-[-1px]">↳</span> Learn more
    </a>
  );
}

function PartnerCard({ p }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 shadow-sm">
      {/* Logo area */}
      <div className="relative grid h-40 w-full place-items-center bg-white">
        <Image
          src={p.logo}
          alt={p.name}
          width={320}
          height={160}
          className="max-h-24 w-auto object-contain"
          priority={false}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 border-t border-black/5 bg-gray-50 px-4 py-4 sm:px-5">
        <h3 className="text-[17px] font-semibold text-[#1b1d1e]">{p.name}</h3>
        <p className="text-[13px] leading-5 text-[#394046] line-clamp-6">
          {p.short_description}
        </p>

        <LearnMoreLink website={p.website} id={p.id} />

        {/* Store badges */}
        {(p.links?.google_play ||
          p.links?.app_store ||
          p.links?.app_gallery) && (
          <div className="mt-3 flex flex-wrap gap-2">
            <StoreBadge
              href={p.links?.google_play}
              label="GET IT ON Google play"
            />
            <StoreBadge href={p.links?.app_store} label="Download App Store" />
            <StoreBadge
              href={p.links?.app_gallery}
              label="Download AppGallery"
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default function PartnersPage() {
  const data = getUniquePartners(partners);

  return (
    <main className="bg-[#262626]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/partners/partnersHeroBG.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          {/* soft dark overlay so text pops */}
          <div className="absolute inset-0 bg-black/35" />
          {/* faint radial glow behind heading */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(237,249,0,0.22),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 text-center">
          <h1 className="text-[clamp(28px,5.2vw,44px)] font-extrabold tracking-tight text-[#EDF900]">
            Partner Directory
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-[clamp(14px,2.6vw,16px)] leading-7 text-white/90">
            We work alongside trusted partners who share our passion for
            innovation, quality, and excellence in sports. Together, we create
            impactful solutions that elevate the sports experience for clubs,
            fans, and communities.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <PartnerCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
