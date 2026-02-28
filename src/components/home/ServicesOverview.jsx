import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Leaf, 
  HardHat, 
  ClipboardCheck, 
  GraduationCap, 
  AlertTriangle, 
  FileCheck,
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Leaf,
    title: "Occupational Hygiene & Exposure Assessment",
    description: "Defensible exposure assessments with SEG design, personal monitoring, statistical analysis, and risk management across chemical, physical, and biological agents.",
    color: "emerald"
  },
  {
    icon: HardHat,
    title: "Noise, Radiation & Physical Agents",
    description: "Occupational noise (TWA, NC, PNC), ionizing and non-ionizing radiation evaluations, vibration, and physical hazard monitoring using validated protocols.",
    color: "amber"
  },
  {
    icon: AlertTriangle,
    title: "Heat Stress & Ergonomics",
    description: "WBGT-based heat stress monitoring, metabolic rate estimation, work-rest cycle development, and ergonomic risk assessments for Ontario workplaces.",
    color: "rose"
  },
  {
    icon: ClipboardCheck,
    title: "Indoor Air Quality & Microbial Investigations",
    description: "IAQ assessments, odour and vapour intrusion investigations, microbial contamination evaluations, and radon safety inspections.",
    color: "blue"
  },
  {
    icon: FileCheck,
    title: "EH&S Program & Policy Development",
    description: "Safety Management System development and review, Chemical Prestart Health & Safety Reviews, and comprehensive EH&S program and policy frameworks.",
    color: "cyan"
  },
  {
    icon: GraduationCap,
    title: "Training & Risk Assessment",
    description: "Workplace health and safety training, risk assessments across chemical, physical, and biological hazards, and regulatory compliance support across Ontario.",
    color: "purple"
  }
];

const colorClasses = {
  emerald: "bg-[#1a3a52]/5 text-[#1a3a52] group-hover:bg-[#1a3a52]/10",
  amber: "bg-[#d4af7a]/10 text-[#1a3a52] group-hover:bg-[#d4af7a]/20",
  blue: "bg-[#1a3a52]/5 text-[#1a3a52] group-hover:bg-[#1a3a52]/10",
  purple: "bg-[#d4af7a]/10 text-[#1a3a52] group-hover:bg-[#d4af7a]/20",
  rose: "bg-[#1a3a52]/5 text-[#1a3a52] group-hover:bg-[#1a3a52]/10",
  cyan: "bg-[#d4af7a]/10 text-[#1a3a52] group-hover:bg-[#d4af7a]/20"
};

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm italic">
            Anticipating Risk, Providing Clarity
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-3 mb-4">
            Environmental Health & Safety Services
          </h2>
          <p className="text-lg text-slate-600">
            Precise, cost-effective assessments that illuminate hazards and support 
            informed decision-making for worker health protection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl("Services")}
                className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-slate-100"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${colorClasses[service.color]}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#1a3a52] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-[#d4af7a] font-medium text-sm group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}