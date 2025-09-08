import ServicesHero from "@/components/hero/ServicesHero";
import ServicesSection from "@/components/sections/ServiceSection";

export const metadata = {
  title: "Services & Solutions | Sportech",
  description: "Innovative solutions tailored to your business needs.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#262626]">
      <ServicesHero
        title="Welcome to Our Services & Solutions"
        subtitle="Innovative solutions tailored to your business needs."
      />
      <ServicesSection
        title={
          <>
            Our <span className="text-[#e4ff25] font-extrabold">All</span>{" "}
            Services to Solutions
          </>
        }
        subtitle="Comprehensive Digital Sports Solutions"
        description={undefined} // hide long blurb on home
        footerCtas={[
          { label: "View More Services & Solutions", href: "/service" },
          { label: "Contact Us", href: "/contact-us" },
        ]}
        gridClass="md:grid-cols-2 lg:grid-cols-3" // default, can omit
      />
    </main>
  );
}
