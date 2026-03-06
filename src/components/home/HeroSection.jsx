import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Occupational health and safety"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/95 via-[#0F2A4A]/80 to-[#0F2A4A]/50" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl pointer-events-none" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28 w-full">
        {/* Eyebrow */}
        











        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }} className="text-white mb-5 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl max-w-3xl">


          Making Invisible Hazards
          <span className="block text-[#d4af7a] mt-1">Visible.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-300 mb-3 max-w-xl leading-relaxed">

          Science-based occupational hygiene for organizations that need clarity, compliance, and confidence.
        </motion.p>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="text-sm text-slate-400 mb-10 max-w-md italic border-l-2 border-[#d4af7a]/40 pl-4">

          When symptoms rise but answers do not, we bring defensible evidence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-col sm:flex-row gap-4">

          <Link to={`${createPageUrl("Contact")}?service=general`}>
            <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 py-6 text-base rounded-full group w-full sm:w-auto">
              Book a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1a3a52] px-8 py-6 text-base font-medium rounded-full w-full sm:w-auto transition-colors">
              Request an Assessment
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>);

}