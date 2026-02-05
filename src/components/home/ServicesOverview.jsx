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
    title: "Exposure Assessment",
    description: "Quantitative and qualitative exposure characterization using validated sampling and analytical methods.",
    color: "emerald"
  },
  {
    icon: HardHat,
    title: "Occupational Hygiene Surveys",
    description: "Systematic workplace evaluations for chemical, physical, and biological agents following AIHA strategies.",
    color: "amber"
  },
  {
    icon: ClipboardCheck,
    title: "Regulatory Compliance Review",
    description: "Technical analysis of OSHA, EPA, and state regulatory requirements with gap identification.",
    color: "blue"
  },
  {
    icon: GraduationCap,
    title: "Technical Training",
    description: "Evidence-based training on exposure controls, PPE selection, and hazard recognition protocols.",
    color: "purple"
  },
  {
    icon: AlertTriangle,
    title: "Health Hazard Evaluation",
    description: "Systematic hazard identification, exposure modeling, and risk characterization aligned with OELs.",
    color: "rose"
  },
  {
    icon: FileCheck,
    title: "Program Development",
    description: "Written programs for respiratory protection, hearing conservation, and hazard communication per regulatory standards.",
    color: "cyan"
  }
];

const colorClasses = {
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
  purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
  rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
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
            Industrial Hygiene Services
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
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-emerald-600 font-medium text-sm group-hover:gap-2 transition-all">
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