import HeroSection from "@/components/hero/HeroSection";
import ContactSection from "@/components/sections/ContactSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ServicesSection from "@/components/sections/ServiceSection";
import ValuesSection from "@/components/sections/ValueSection";

const logos = [
  { name: "Athlete Lab", src: "/partners/image1.png" },
  { name: "Playtech", src: "/partners/image2.png" },
  { name: "Fanatics", src: "/partners/image3.png" },
  { name: "GameChanger", src: "/partners/image4.png" },
];
<PartnersSection logos={logos} />;

export default function Page() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
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
