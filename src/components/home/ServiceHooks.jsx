import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const hooks = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#1a3a52" strokeWidth="1.5" />
        <path d="M14 24 Q20 12 26 24" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 20 Q20 15 23 20" stroke="#d4af7a" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="27" r="1.5" fill="#1a3a52" />
      </svg>
    ),
    category: "Noise Exposure",
    situation: "Workers must raise their voices to be heard at arm's length.",
    risk: "Noise levels may exceed the 85 dBA regulatory threshold under O. Reg 381/15.",
    action: "Arrange a structured noise assessment.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="4" y="10" width="32" height="22" rx="3" stroke="#1a3a52" strokeWidth="1.5" />
        <path d="M4 16 h32" stroke="#1a3a52" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M12 24 Q16 18 20 24 Q24 30 28 24" stroke="#d4af7a" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="10" r="2" fill="#1a3a52" />
        <path d="M20 8 V4" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    category: "Indoor Air Quality",
    situation: "Occupants report headaches or stale air that clears after leaving the building.",
    risk: "Ventilation deficiencies or contamination sources may be present and unverified.",
    action: "A targeted IAQ assessment identifies the cause.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M10 32 L20 8 L30 32" stroke="#1a3a52" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 24 h12" stroke="#1a3a52" strokeWidth="1" />
        <circle cx="20" cy="19" r="2" fill="#d4af7a" />
        <path d="M8 36 h24" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 15 Q30 12 34 16" stroke="#d4af7a" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    category: "Dust & Silica",
    situation: "Cutting or grinding generates visible dust clouds during regular operations.",
    risk: "Respirable silica particles remain airborne even when not visible to the naked eye.",
    action: "A structured exposure assessment provides defensible compliance data.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M6 20 Q10 14 14 20 Q18 26 22 20 Q26 14 30 20 Q33 24 36 20" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="20" r="2" fill="#d4af7a" />
        <path d="M8 28 Q14 22 20 28" stroke="#d4af7a" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
        <rect x="2" y="30" width="36" height="4" rx="1" stroke="#1a3a52" strokeWidth="1" />
      </svg>
    ),
    category: "Odour Complaints",
    situation: "Recurring tenant or staff odour complaints persist despite routine cleaning.",
    risk: "Without source identification, reactive remediation is unlikely to resolve the issue.",
    action: "A vapour and IAQ investigation prevents escalation.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="20" cy="20" r="10" stroke="#1a3a52" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" stroke="#d4af7a" strokeWidth="1.5" />
        <path d="M20 4 V8 M20 32 V36 M4 20 H8 M32 20 H36" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.7 8.7 l2.8 2.8 M28.5 28.5 l2.8 2.8 M8.7 31.3 l2.8-2.8 M28.5 11.5 l2.8-2.8" stroke="#1a3a52" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    category: "Radiation",
    situation: "Ionizing or non-ionizing equipment is operated without recent compliance verification.",
    risk: "Regulatory compliance is established through measurement, not assumption alone.",
    action: "A radiation evaluation confirms current exposure levels.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M20 6 Q30 10 30 20 Q30 32 20 36 Q10 32 10 20 Q10 10 20 6Z" stroke="#1a3a52" strokeWidth="1.5" />
        <path d="M15 22 Q17 18 20 22 Q23 26 25 22" stroke="#d4af7a" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 14 V18" stroke="#1a3a52" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="12" r="1.5" fill="#1a3a52" />
      </svg>
    ),
    category: "Heat Stress",
    situation: "Workers report fatigue or dizziness in warm environments during normal activity.",
    risk: "Symptoms may indicate proximity to heat stress thresholds, increasing safety and productivity risk.",
    action: "Structured monitoring clarifies exposure levels before harm occurs.",
  },
];

export default function ServiceHooks() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[#d4af7a] text-xs font-semibold uppercase tracking-widest">
            Recognise the Situation
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a3a52] mt-2 mb-2">
            Common Workplace Indicators
          </h2>
          <p className="text-slate-500 text-sm max-w-xl">
            Observable conditions that may warrant professional assessment. If any of these describe your workplace, a structured evaluation provides clarity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hooks.map((h, i) => (
            <motion.div
              key={h.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Icon + Category */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">{h.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1a3a52]">
                  {h.category}
                </span>
              </div>

              {/* Situation */}
              <div>
                <p className="text-slate-800 text-sm font-medium leading-snug">{h.situation}</p>
              </div>

              {/* Risk — subtle emphasis */}
              <div className="border-l-2 border-[#d4af7a]/60 pl-3">
                <p className="text-slate-500 text-xs leading-relaxed">{h.risk}</p>
              </div>

              {/* Action */}
              <Link
                to={createPageUrl("Contact")}
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a3a52] hover:text-[#d4af7a] transition-colors group"
              >
                {h.action}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}