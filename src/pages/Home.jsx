import HeroSection from "@/components/home/HeroSection";
import FeaturedArticle from "@/components/home/FeaturedArticle";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedArticle />
      <ServicesOverview />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}