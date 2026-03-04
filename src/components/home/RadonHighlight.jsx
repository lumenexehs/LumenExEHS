import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RadonHighlight() {
  return (
    <section className="py-14 bg-[#f4f1eb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-white rounded-2xl px-8 py-8 border border-slate-200 shadow-sm"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1a3a52]/10 flex items-center justify-center text-2xl">
            ☢️
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#d4af7a] uppercase tracking-widest mb-1">
              Rising Public Awareness
            </p>
            <h3 className="text-lg font-bold text-[#1a3a52] mb-2">
              Radon is invisible and odourless. It is also measurable.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Radon is the second leading cause of lung cancer in Canada. Health Canada has set a clear guideline. Our inspections provide documented results and practical guidance that meet that standard.
            </p>
            <p className="text-slate-400 text-xs mt-2 italic border-l-2 border-[#d4af7a]/40 pl-3">
              Properties without radon data carry an unquantified and undisclosed health risk.
            </p>
          </div>
          <Link
            to={createPageUrl("Services")}
            className="flex items-center gap-2 text-sm font-semibold text-[#1a3a52] hover:text-[#d4af7a] transition-colors whitespace-nowrap flex-shrink-0 group"
          >
            Radon Safety Inspection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}