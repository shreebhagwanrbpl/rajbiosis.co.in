import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import HomeProducts from "@/components/HomeProducts";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
export default function Home({ city = "", district = "" }) {
  return (
    <>
      <HeroSection city={city} />
      <TrustedBrands city={city} />
      <WhyChooseUs city={city} />
      <StatsSection city={city} />
      <ServicesPreview city={city} />
      <HomeProducts city={city} district={district} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </>
  );
}