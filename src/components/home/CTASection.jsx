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
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&q=80"
          alt="Canadian industrial landscape"
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
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm italic mb-4 block">
            🍁 Ontario-Based · CIH-Led Practice
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Not Sure What's in Your Workplace Air?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            We help you find out — and what to do about it. Free consultation with an Ontario-based CIH.
          </p>

          <Link to={createPageUrl("Contact")}>
            <Button
              size="lg"
              className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-10 py-6 text-lg rounded-full group"
            >
              Request a Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}