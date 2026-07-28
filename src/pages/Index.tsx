import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import PriceCalculator from "@/components/PriceCalculator";
import HostingSection from "@/components/HostingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: "https://webcrafthub.ro/" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="WebCraft — Web Design Premium România"
        description="Agenție de web design din România. Site-uri premium pentru afaceri locale și branduri personale. Hosting și suport incluse."
        path="/"
        jsonLd={breadcrumb}
      />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <PriceCalculator />
      <HostingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
