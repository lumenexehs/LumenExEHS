import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Indoor Air, Mould & Radon",
    description: "Persistent odours or occupant complaints often indicate a measurable source. Unidentified air quality issues carry health and liability consequences over time.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e3ec8e48c_ChatGPTImageFeb28202604_23_54PM.png",
  },
  {
    title: "Chemical & Dust Exposure",
    description: "Airborne hazards are not always visible. We measure real exposures and benchmark them against Ontario occupational exposure limits.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/9375df2c5_20260301_0342_ImageGeneration_remix_01kjm8zs61fkyb4nb8xp3f491q.png",
  },
  {
    title: "Noise, Radiation & Physical Agents",
    description: "Prolonged physical agent exposure leads to irreversible harm. We quantify levels, identify regulatory obligations, and recommend proportionate controls.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/63355d785_20260301_0400_ImageGeneration_remix_01kjma0etbfg2bskz604ancbdh.png",
  },
  {
    title: "Heat Stress & Ergonomics",
    description: "Thermal and ergonomic risks are underestimated until incidents occur. We assess conditions early and provide structured recommendations.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e1febeb2d_20260301_0417_ImageGeneration_remix_01kjmazxpre3xrr473txxxqw5z.png",
  },
  {
    title: "Compliance & Safety Programs",
    description: "Gaps in EHS programs create legal exposure. We develop written systems and audit-ready documentation aligned with Ontario OHS requirements.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  },
  {
    title: "Training & Sector Support",
    description: "Generic training rarely addresses real-world hazards. We deliver competency-based sessions tailored to your sector and workforce.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">
            Serving Organizations Across Ontario
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-3 mb-3">
            What We Assess and Resolve
          </h2>
          <p className="text-slate-500 leading-relaxed">
            From indoor air quality to regulatory compliance, we provide science-based assessments that support defensible decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={createPageUrl("Services")}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 h-full"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-semibold text-base drop-shadow">
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-[#d4af7a] font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}