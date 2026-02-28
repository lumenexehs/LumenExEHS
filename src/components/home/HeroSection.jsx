import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Canadian workplace"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/95 via-[#0F2A4A]/80 to-[#0F2A4A]/60" />
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6">

            <Shield className="w-5 h-5 text-[#d4af7a]" />
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm italic">
              🍁 Carer for Carers — Ontario-Based · 19+ Years of Field Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Making Invisible Hazards
            <span className="block text-[#d4af7a]">Visible — Before They Cause Harm</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-3 leading-relaxed">
            Independent occupational hygiene and EHS consulting across Ontario.
          </motion.p>

          {/* Safety Lamp Concept */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 pl-4 border-l-2 border-[#d4af7a]/60"
          >
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Like the miner's safety lamp — designed to detect invisible gases and warn of unseen danger — 
              we illuminate the hazards in your workplace before they cause harm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12">

            <Link to={createPageUrl("Contact")}>
              <Button
                size="lg"
                className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 py-6 text-lg rounded-full group">

                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("Services")}>
              <Button
                size="lg"
                variant="outline" className="bg-slate-200 text-[#d4af7a] px-8 py-6 text-lg font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-10 border-[#d4af7a]/50 hover:bg-[#d4af7a]/10">


                View Our Capabilities
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">

            {[
            "Certified Industrial Hygienist (CIH)",
            "Certified Safety Professionals (CSP)",
            "Canadian Registered Safety Professionals (CRSP)"].
            map((item, i) =>
            <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{item}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

}