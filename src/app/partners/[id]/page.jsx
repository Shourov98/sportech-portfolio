import Image from "next/image";
import { notFound } from "next/navigation";
import partners from "@/data/partners.json" assert { type: "json" };

/* Helpers */
function getPartner(id) {
  return (partners || []).find((p) => p.id === id);
}

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/g) // split by blank line
    .map((t) => t.trim())
    .filter(Boolean);
}

/* Pre-render all partner ids */
export function generateStaticParams() {
  return (partners || []).map((p) => ({ id: p.id }));
}

/* SEO */
export function generateMetadata({ params }) {
  const p = getPartner(params.id);
  if (!p) return { title: "Partner not found" };
  return {
    title: `${p.name} — Partner`,
    description: p.short_description || "Partner overview",
  };
}

export default function PartnerDetailPage({ params }) {
  const p = getPartner(params.id);
  if (!p) notFound();

  const paragraphs = splitParagraphs(p.description);

  return (
    <main className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* subtle gradient glow like the mock */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(237,249,0,0.18),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-[clamp(26px,5vw,40px)] font-extrabold tracking-tight">
            {p.name}
          </h1>
          {p.tagline && (
            <p className="mt-2 text-white/90 text-[clamp(14px,2.4vw,18px)]">
              {p.tagline}
            </p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* LEFT: info card */}
          <aside className="md:col-span-5">
            <div className="rounded-2xl bg-white text-[#1b1d1e] shadow ring-1 ring-black/10 overflow-hidden">
              <div className="grid place-items-center bg-white px-6 pt-6">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={380}
                  height={140}
                  className="max-h-24 w-auto object-contain"
                  priority={false}
                />
              </div>

              <div className="px-6 pb-6 pt-4 space-y-5">
                {/* Visit website */}
                {p.website && p.website !== "#" && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#EDF900] px-5 py-2 font-semibold text-black shadow hover:brightness-95"
                  >
                    Visit Website{" "}
                    <span className="inline-grid size-5 place-items-center rounded-md bg-black/85 text-white">
                      »
                    </span>
                  </a>
                )}

                {/* Optional extra fields if you add them to JSON */}
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
          <div className="md:col-span-7">
            <h2 className="text-[clamp(18px,3vw,24px)] font-extrabold mb-4">
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
