import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import HomeProducts from "@/components/HomeProducts";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import { fetchHomeData } from "@/lib/data-fetcher-server";

export default async function Home({ city = "", state = "", district = "" }) {
  const homeData = await fetchHomeData();

  return (
    <>
      <HeroSection city={city} state={state} district={district} initialData={homeData} />
      <TrustedBrands city={city} state={state} />
      <WhyChooseUs city={city} state={state} />
      <StatsSection city={city} state={state} />
      <ServicesPreview city={city} state={state} district={district} />
      <HomeProducts city={city} state={state} district={district} />
      <SeoContent city={city} state={state} />
      <Testimonials city={city} state={state} />
      <CTASection city={city} state={state} />
    </>
  );
}