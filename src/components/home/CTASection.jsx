import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1920&q=80"
          alt="Woman concerned about air quality in workplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/95 via-[#0F2A4A]/80 to-[#0F2A4A]/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase tracking-widest mb-4 block">
            Ontario-Based · CIH-Led Practice
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Uncertainty creates risk.
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-[#d4af7a] mb-6">
            Clarity creates control.
          </h3>
          <p className="text-base text-slate-300 mb-10 max-w-md mx-auto leading-relaxed">
            Start with a confidential consultation. We will identify the right assessment approach for your organization.
          </p>

          <Link to={createPageUrl("Contact")}>
            <Button
              size="lg"
              className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-10 py-6 text-lg rounded-full group"
            >
              Start Your Risk Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}