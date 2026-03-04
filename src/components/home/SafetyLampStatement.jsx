import { motion } from "framer-motion";

export default function SafetyLampStatement() {
  return (
    <section className="py-16 bg-[#f9f8f6] border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start gap-8"
        >
          <div className="flex-shrink-0 text-4xl md:text-5xl mt-1">🪔</div>
          <div>
            <p className="text-xs font-semibold text-[#d4af7a] uppercase tracking-widest mb-3">
              Our Founding Principle
            </p>
            <p className="text-[#1a3a52] text-lg md:text-xl font-medium leading-relaxed mb-3">
              Like the traditional safety lamp that revealed invisible gas hazards in underground mines, LumenEx EHS illuminates hidden occupational health risks so organizations can act before harm occurs.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-[#d4af7a]/40 pl-4">
              That lamp did not create alarm. It provided evidence. Our work operates on the same principle: science-based detection, clearly communicated.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}