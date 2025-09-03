// src/app/service/[id]/page.jsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, slugify } from "@/data/services";
import AnimatedSwapButton from "@/components/AnimatedSwapButton";

// Optional local FAQ (or import your existing FAQ component)
const faqs = [
  {
    q: "What services does Sportech provide?",
    a: "We offer innovative sports technology solutions, including fan engagement tools, club management systems, data analytics, and custom interactive experiences.",
  },
  {
    q: "Do you only work with sports clubs?",
    a: "We primarily focus on sports organizations, but we also partner with media, influencers, and brands within the sports ecosystem.",
  },
  {
    q: "Can you create a custom solution for my needs?",
    a: "Yes. We regularly deliver custom builds tailored to your goals, tech stack, and budget.",
  },
  {
    q: "How long does it take to build a website or platform?",
    a: "Timelines vary by scope. We’ll provide a clear plan and milestones after a brief discovery session.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Absolutely. We offer maintenance, security updates, and performance tuning.",
  },
];

export function generateStaticParams() {
  return services.map((s) => ({ id: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.id);
  if (!service) return { title: "Service" };
  return {
    title: `${service.title} – Sportech`,
    description: service.short_description,
  };
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.id);
  if (!service) return notFound();

  const rightImage = "/service/title-image.png"; // e.g. /service/subscription-management-platform-image.png`
  const banner = "/service/service-banner.png";

  return (
    <div className="bg-[#262626] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services/service-banner.png"
            alt="Service banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="inline-block rounded-2xl bg-black/45 px-5 py-2 ring-1 ring-white/15 backdrop-blur">
            <h1 className="text-[clamp(22px,4.8vw,34px)] font-bold text-[#EDF900]">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO (left text + right image) */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h2 className="text-[#EDF900] text-[clamp(18px,2.6vw,28px)] font-extrabold leading-snug">
              {service.subtitle}
            </h2>

            <p className="mt-4 text-white/85 leading-7">
              {service.short_description}
            </p>

            <div className="mt-6">
              <AnimatedSwapButton href="#contact" size="md">
                Contact Us
              </AnimatedSwapButton>
            </div>
          </div>

          <div className="md:col-span-6">
            {/* Right image with graceful fallback */}
            {/* <ServiceRightImage
              src="/services/title-image.png"
              alt={service.title}
            /> */}
          </div>
        </div>
      </section>

      {/* LONG DESCRIPTION */}
      <section className="pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-[clamp(20px,3.2vw,28px)] font-bold mb-4">
            {service.title} for Sports Brands
          </h3>
          <article className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-white/90">
              {service.description}
            </pre>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-[clamp(22px,4vw,32px)] font-extrabold text-[#EDF900] mb-6">
            FAQ
          </h3>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="grid size-8 place-items-center rounded-full bg-white/10 text-white">
                    <span className="transition-transform group-open:rotate-45 text-xl">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-white/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- small client-y helper using a native <img> for reliable onError fallback ---
function ServiceRightImage({ src, alt }) {
  // Use a plain <img> to ensure onError works consistently with static assets
  return (
    <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/20">
      <img
        src="/services/title-image.png"
        alt={alt}
        className="block w-full h-auto"
        onError={(e) => {
          e.currentTarget.src = "/service/placeholder.png";
        }}
      />
    </div>
  );
}
