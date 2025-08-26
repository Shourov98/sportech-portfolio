import AboutUsHero from "@/components/hero/AboutUsHero";
import PartnersStrip from "@/components/PartnersStrip";
import ObjectivesSection from "@/components/sections/ObjectivesSection";
import AboutValueSection from "@/components/sections/AboutValueSection";
import TeamSection from "@/components/sections/TeamSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import FAQSection from "@/components/sections/FAQSection";

const logos = [
  { src: "/partners/image1.png", alt: "Athlete Lab" },
  { src: "/partners/image2.png", alt: "Playtech" },
  { src: "/partners/image3.png", alt: "Fanatics" },
  { src: "/partners/image4.png", alt: "GameChanger Studio" },
];

export default function AboutPage() {
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
