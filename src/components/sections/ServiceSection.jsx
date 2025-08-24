export default function ServicesSection({ services = defaultServices }) {
  return (
    <section
      id="services"
      className="relative bg-[#262626] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-bold text-[#e4ff25] tracking-tight text-[clamp(28px,5vw,56px)]">
            Services & Solutions
          </h2>
          <p className="mt-2 text-[clamp(14px,2.6vw,18px)] text-white/80">
            Comprehensive Digital Sports Solutions
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-[clamp(13px,2.2vw,16px)] leading-7 text-white/75">
            We offer a variety of tech solutions tailored to meet the needs of
            sports clubs and fans, ensuring the highest standards of quality and
            security.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* See more */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#e4ff25] px-6 py-3 text-base font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:brightness-95"
          >
            See More
            <span className="ml-1 grid size-7 place-items-center rounded-xl bg-black/85 text-white">
              »
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, excerpt, icon, bullets, width, height }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white ring-4 ring-white/90 shadow-md transition hover:shadow-xl">
      <div className="flex h-full flex-col p-4 sm:p-5">
        {/* Icon panel (full width, responsive height, icon perfectly centered) */}
        <div className="mb-4 w-full rounded-xl bg-[#262626] p-4 sm:p-6">
          {/* Keep a consistent visual height using an aspect box */}
          <div className="relative w-full aspect-[328/191] grid place-items-center">
            {/* Your SVG */}
            <img
              src={icon}
              alt=""
              /* If width/height are passed, they’ll be used, but never overflow */
              width={width}
              height={height}
              className="block max-h-[80%] max-w-[80%] object-contain"
            />
          </div>
        </div>

        {/* Title + copy */}
        <h3 className="text-[clamp(16px,2.6vw,20px)] font-bold text-[#1b1d1e]">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 text-[clamp(13px,2.2vw,15px)] leading-6 text-[#394046]">
            {excerpt}
          </p>
        )}

        {Array.isArray(bullets) && bullets.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-[clamp(13px,2.2vw,15px)] text-[#394046]">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* CTA pinned to bottom */}
        <div className="mt-auto pt-5">
          <a
            href="#"
            className="inline-flex w-full items-center justify-between rounded-xl bg-[#e4ff25] px-5 py-2 font-semibold text-black transition hover:brightness-95"
          >
            <span>View Details</span>
            <span className="ml-2 inline-grid size-6 place-items-center rounded-md bg-black/85 text-white">
              »
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------- Demo data (replace as needed) ------- */
const defaultServices = [
  {
    title: "Subscription Management Platform",
    excerpt:
      "Enable fans to interact with clubs and participate in decision-making.",
    icon: "/services/subscription.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Match Streaming with Augmented Reality",
    excerpt:
      "Watch matches through player cameras for a more immersive experience.",
    icon: "/services/streaming-ar.svg",
    width: 154,
    height: 82,
  },
  {
    title: "Digital Currency Management",
    excerpt:
      "A fan-exclusive digital currency to encourage platform engagement.",
    icon: "/services/digital-currency.svg",
    width: 154,
    height: 173,
  },
  {
    title: "Sports Data Analytics",
    excerpt:
      "Support clubs with precise strategic decisions using AI-powered insights.",
    icon: "/services/data-analytics.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Sports Cyber Security",
    excerpt:
      "Protect club platforms from cyber attacks and ensure data safety.",
    icon: "/services/cyber-security.svg",
    width: 154,
    height: 125,
  },
  {
    title: "Support Services",
    excerpt: "Annual maintenance and support services.",
    icon: "/services/support.svg",
    bullets: ["Annual Maintenance", "Support Services"],
    width: 154,
    height: 125,
  },
];
