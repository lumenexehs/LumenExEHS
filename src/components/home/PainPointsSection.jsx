import { motion } from "framer-motion";
import { School, Factory, Building2, Home } from "lucide-react";

const cards = [
  {
    icon: School,
    sector: "Education and Offices",
    symptom: "Staff reporting odours or headaches.",
    consequence: "Without a documented assessment, the source remains unknown and complaints continue to escalate.",
    color: "border-amber-200"
  },
  {
    icon: Factory,
    sector: "Manufacturing and Industrial",
    symptom: "Uncertainty about noise, heat, dust, diesel, or chemical exposure levels.",
    consequence: "Undocumented exposures create regulatory risk and complicate worker compensation decisions.",
    color: "border-blue-200"
  },
  {
    icon: Building2,
    sector: "Public Sector and Training Facilities",
    symptom: "Long-term exposure concerns with no documented baseline.",
    consequence: "Absence of evidence is not evidence of absence. Defensible records protect both workers and organizations.",
    color: "border-emerald-200"
  },
  {
    icon: Home,
    sector: "Residential and Property Management",
    symptom: "Recurring air quality complaints and radon concerns.",
    consequence: "Repeated unresolved complaints carry legal and reputational consequences for property managers.",
    color: "border-rose-200"
  }
];

export default function PainPointsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">
            Recognizing the Pattern
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-3 mb-3">
            Do Any of These Sound Familiar?
          </h2>
          <p className="text-slate-500 leading-relaxed">
            These are among the most common occupational health challenges organizations face across Ontario.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.sector}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-slate-50 rounded-2xl p-7 border-l-4 ${card.color} border border-slate-100`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a3a52]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-5 h-5 text-[#1a3a52]" />
                </div>
                <h3 className="font-bold text-[#1a3a52] text-base">{card.sector}</h3>
              </div>
              <p className="text-slate-700 text-sm font-medium mb-2">{card.symptom}</p>
              <p className="text-slate-400 text-xs leading-relaxed italic border-t border-slate-200 pt-3 mt-3">
                {card.consequence}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-[#1a3a52] text-white px-8 py-5 rounded-2xl">
            <span className="text-sm font-medium">We identify the source.</span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span className="text-sm font-medium">We quantify the risk.</span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span className="text-sm font-medium text-[#d4af7a]">We provide defensible solutions.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}