import Image from "next/image";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import AnimatedSwapButton from "@/components/AnimatedSwapButton";
import FAQSection from "@/components/sections/FAQSection";
import ServiceRightImage from "@/components/ServiceRightImage"; // client component

export function generateStaticParams() {
  return services.map((s) => ({ id: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.id);
  if (!service) {
    return { title: "Service – Sportech" };
  }
  return {
    title: `${service.title} – Sportech`,
    description: service.short_description,
  };
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.id);
  if (!service) return notFound();

  return (
    <div className="bg-[#262626] text-white">
      {/* HERO — glassy, angled ribbon, flush-left */}
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services/service-banner.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
          {/* Break out so the ribbon touches the left screen */}
          <div className="ml-[calc(50%-50vw)]">
            <div className="relative inline-block transform-gpu">
              {/* Skewed glass body (parallelogram) */}
              <div className="relative skew-x-[-25deg]">
                <div
                  className="
                    relative
                    bg-white/10 supports-[backdrop-filter]:bg-white/15
                    backdrop-blur-xl backdrop-saturate-150
                    ring-1 ring-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                    pl-5 pr-12 sm:pl-6 sm:pr-20 md:pl-8 md:pr-28
                    py-2.5 sm:py-3.5 md:py-4
                  "
                >
                  {/* sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/25 via-white/10 to-transparent opacity-40"
                  />
                  {/* Unskew content so text stays straight */}
                  <div className="skew-x-[25deg]">
                    <h1 className="text-left text-[clamp(20px,4.2vw,36px)] leading-tight font-extrabold text-[#EDF900] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                      {service.title}
                    </h1>
                  </div>
                </div>
              </div>
              {/* close: skew container */}
            </div>
            {/* close: inline-block wrapper */}
          </div>
          {/* close: breakout wrapper */}
        </div>
        {/* close: inner container */}
      </section>

      {/* INTRO (left text + right image) */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h2 className="text-[#EDF900] text-[clamp(18px,2.6vw,28px)] font-bold leading-snug">
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
            <ServiceRightImage
              src="/services/title-image.png"
              alt={service.title}
              className="rounded-2xl ring-1 ring-white/10 bg-black/20 overflow-hidden"
            />
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

      {/* FAQ (pass SSR snapshot → prevents hydration mismatch) */}
      <FAQSection faqs={service.faqs} />
    </div>
  );
}
