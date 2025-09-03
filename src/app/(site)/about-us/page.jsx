import AboutUsHero from "@/components/hero/AboutUsHero";
import PartnersStrip from "@/components/PartnersStrip";
import ObjectivesSection from "@/components/sections/ObjectivesSection";
import AboutValueSection from "@/components/sections/AboutValueSection";
import TeamSection from "@/components/sections/TeamSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import FAQSection from "@/components/sections/FAQSection";

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

export default function AboutPage() {
  const logos = toLogos(partners);
  return (
    <>
      {/* your Navbar is already global */}
      <AboutUsHero
        bgSrc="/aboutUsHeroBg.svg" // <- your actual SVG
      />
      <PartnersStrip logos={logos} duration={28} />
      <ObjectivesSection />
      <AboutValueSection />
      <TeamSection />
      <FeedbackSection />
      <FAQSection />
    </>
  );
}
