import { motion } from "framer-motion";
import { School, Factory, Building2, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const cards = [
  {
    icon: School,
    sector: "Education and Offices",
    symptom: "Staff reporting odours or headaches.",
    consequence: "Without a documented assessment, the source remains unknown and complaints continue to escalate.",
    color: "border-amber-200",
    page: "SectorEducation",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0b309d691_ChatGPTImageMar4202612_04_48PM.png",
    overlayLabel: "Education Sector",
    overlayTitle: "Indoor Air Quality Monitoring",
    overlayDesc: "Professional monitoring for hidden environmental factors in schools."
  },
  {
    icon: Factory,
    sector: "Manufacturing and Industrial",
    symptom: "Uncertainty about noise, heat, dust, diesel, or chemical exposure levels.",
    consequence: "Undocumented exposures create regulatory risk and complicate worker compensation decisions.",
    color: "border-blue-200",
    page: "SectorManufacturing",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/434dcad8c_ChatGPTImageMar4202612_50_13PM.png",
    overlayLabel: "Manufacturing Sector",
    overlayTitle: "Noise, Dust & Chemical Exposure",
    overlayDesc: "Quantified exposure assessments to protect workers and reduce regulatory risk."
  },
  {
    icon: Building2,
    sector: "Public Sector",
    symptom: "Long-term exposure concerns with no documented baseline.",
    consequence: "Absence of evidence is not evidence of absence. Defensible records protect both workers and organizations.",
    color: "border-emerald-200",
    page: "SectorPublicSector",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/3a48e842c_ChatGPTImageMar4202601_45_04PM.png",
    overlayLabel: "Public Sector",
    overlayTitle: "Noise & Exposure at Training Facilities",
    overlayDesc: "Documented baseline assessments for public sector and law enforcement training environments."
  },
  {
    icon: Home,
    sector: "Residential and Property Management",
    symptom: "Recurring air quality complaints and radon concerns.",
    consequence: "Repeated unresolved complaints carry legal and reputational consequences for property managers.",
    color: "border-rose-200",
    page: "SectorResidential",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/88d7c6159_ChatGPTImageMar4202601_28_53PM.png",
    overlayLabel: "Residential Sector",
    overlayTitle: "Radon, Mould & Indoor Air Quality",
    overlayDesc: "Science-based home assessments that resolve complaints and protect property value."
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
            >
              <Link to={createPageUrl(card.page)} onClick={() => window.scrollTo(0, 0)} className={`block bg-slate-50 rounded-2xl overflow-hidden border-l-4 ${card.color} border border-slate-100 hover:shadow-md transition-shadow group`}>
                {card.image && (
                  <div className="relative w-full h-44 overflow-hidden">
                    <img src={card.image} alt={card.sector} className="w-full h-full object-contain bg-white" />
                    <div className="absolute inset-0 bg-[#0F2A4A]/0 group-hover:bg-[#0F2A4A]/70 transition-all duration-300 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                      <p className="text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-1">{card.overlayLabel}</p>
                      <p className="text-white text-sm font-semibold leading-snug">{card.overlayTitle}</p>
                      <p className="text-white/75 text-xs mt-1 leading-relaxed">{card.overlayDesc}</p>
                    </div>
                  </div>
                )}
                <div className="p-7">
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
                </div>
              </Link>
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