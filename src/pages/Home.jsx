import HeroSection from "@/components/home/HeroSection";
import FeaturedArticle from "@/components/home/FeaturedArticle";
import ServicesOverview from "@/components/home/ServicesOverview";
import CanadaSceneStrip from "@/components/home/CanadaSceneStrip";
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
      <CanadaSceneStrip />
      <StatsSection />

      {/* Credentials Strip */}
      <section className="relative py-24 bg-[#060f1a] overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af7a]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#d4af7a] text-xs uppercase tracking-[0.25em] font-semibold mb-2"
          >
            Professional Credentials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white text-2xl font-bold mb-10"
          >
            Recognised. Certified. Trusted.
          </motion.h2>
          <CredentialsBadges dark />
        </div>
      </section>

      <CommunityServiceSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}