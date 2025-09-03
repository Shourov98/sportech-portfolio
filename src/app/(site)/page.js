import HeroSection from "@/components/hero/HeroSection";
import ContactSection from "@/components/sections/ContactSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ServicesSection from "@/components/sections/ServiceSection";
import ValuesSection from "@/components/sections/ValueSection";

// ✅ Import your JSON (Next.js supports JSON imports in app dir)
import partners from "@/data/partners.json"; // [{ id, name, logo, ... }]

// Make sure we only pass { name, src } and remove duplicates by id
function toLogos(data) {
  const seen = new Set();
  return data.reduce((acc, p) => {
    if (!p?.logo || !p?.name || seen.has(p.id)) return acc;
    seen.add(p.id);
    acc.push({ name: p.name, src: p.logo });
    return acc;
  }, []);
}

export default function Page() {
  const logos = toLogos(partners);

  return (
    <>
      <HeroSection />
      <ValuesSection />

      {/* Partners — now sourced from JSON */}
      <PartnersSection logos={logos} />

      <ServicesSection
        title="Services & Solutions"
        subtitle="Comprehensive Digital Sports Solutions"
        description="We offer a variety of tech solutions tailored to meet the needs of sports clubs and fans, ensuring the highest standards of quality and security."
        footerCtas={[{ label: "See More", href: "/services#all" }]}
        gridClass="md:grid-cols-2 lg:grid-cols-3"
      />

      <ContactSection />
    </>
  );
}
