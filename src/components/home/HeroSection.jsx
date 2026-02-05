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
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Industrial facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/95 via-[#0F2A4A]/80 to-[#0F2A4A]/60" />
      </div>

      {/* Floating Elements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium tracking-wide uppercase text-sm">
              Science-Based Industrial Hygiene Since 2005
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Defensible Exposure Assessment
            <span className="block text-emerald-400">& Decision-Ready Reporting</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed"
          >
            Rigorous industrial hygiene assessments, exposure characterization, 
            and scientifically-grounded interpretations aligned with OSHA, NIOSH, 
            and AIHA best practice standards.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group"
              >
                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("Services")}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
              >
                View Our Capabilities
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300"
          >
            {[
              "CIH-Led Assessments",
              "AIHA Member",
              "Peer-Reviewed Methods"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}