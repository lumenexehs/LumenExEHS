import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { School, Factory, Building2, HeartPulse, HardHat, Home, ArrowRight } from "lucide-react";

const sectors = [
  { icon: School, name: "Educational Institutions", desc: "Schools, colleges, and boards of education", page: "SectorEducation" },
  { icon: Factory, name: "Manufacturing", desc: "Industrial facilities and production environments", page: "SectorManufacturing" },
  { icon: Building2, name: "Public Sector", desc: "Government, municipal, and crown agencies", page: "SectorPublicSector" },
  { icon: HeartPulse, name: "Healthcare", desc: "Hospitals, clinics, and long-term care", page: "SectorHealthcare" },
  { icon: HardHat, name: "Construction", desc: "Contractors and project site management", page: "SectorConstruction" },
  { icon: Home, name: "Residential Property Management", desc: "Property managers and building owners", page: "SectorResidential" }
];

export default function WhoWeHelp() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-3 mb-3">
            Who We Help
          </h2>
          <p className="text-slate-500 leading-relaxed">
            We support public, private, and non-profit organizations across Ontario.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex flex-col items-start gap-3 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#d4af7a]/40 transition-colors"
            >
              <div className="w-10 h-10 bg-[#1a3a52]/8 rounded-xl flex items-center justify-center">
                <sector.icon className="w-5 h-5 text-[#1a3a52]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1a3a52] text-sm mb-1">{sector.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{sector.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-400">
            Serving organizations across Ontario.
          </p>
        </motion.div>
      </div>
    </section>
  );
}