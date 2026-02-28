import HeroSection from "@/components/home/HeroSection";
import FeaturedArticle from "@/components/home/FeaturedArticle";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import CommunityServiceSection from "@/components/shared/CommunityServiceSection";
import CredentialsBadges from "@/components/shared/CredentialsBadges";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedArticle />
      <ServicesOverview />
      <StatsSection />

      {/* Credentials Strip */}
      <section className="py-14 bg-[#0F2A4A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8"
          >
            Professional Credentials
          </motion.p>
          <CredentialsBadges dark />
        </div>
      </section>

      <CommunityServiceSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}