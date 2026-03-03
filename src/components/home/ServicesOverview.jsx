import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Volume2, Wind, Layers, Thermometer, ClipboardList, BookOpen, Radio } from "lucide-react";
import { motion } from "framer-motion";

const hooks = [
  {
    id: "noise_physical",
    icon: Volume2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    accentColor: "border-blue-200",
    situation: "Workers must raise their voice to be heard at arm's length.",
    risk: "Noise levels may exceed Ontario's 85 dBA action level.",
    action: "Arrange a structured noise assessment.",
  },
  {
    id: "iaq",
    icon: Wind,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    accentColor: "border-teal-200",
    situation: "Occupants report headaches or odours that improve after leaving the building.",
    risk: "Ventilation deficiencies or contamination may be present.",
    action: "A targeted IAQ assessment clarifies the cause.",
  },
  {
    id: "occupational_hygiene",
    icon: Layers,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    accentColor: "border-amber-200",
    situation: "Cutting or grinding generates visible dust in the work area.",
    risk: "Respirable silica may remain airborne even when invisible.",
    action: "A structured exposure assessment provides defensible data.",
  },
  {
    id: "iaq",
    icon: Radio,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    accentColor: "border-purple-200",
    situation: "Facilities operating ionizing or non-ionizing equipment lack recent compliance records.",
    risk: "Regulatory compliance depends on measurement, not assumption.",
    action: "A radiation evaluation confirms exposure levels.",
  },
  {
    id: "heat_ergonomics",
    icon: Thermometer,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    accentColor: "border-orange-200",
    situation: "Workers report fatigue or dizziness during warm-weather or indoor hot work.",
    risk: "Heat strain elevates safety risk and regulatory exposure under OHSA general duty.",
    action: "Structured monitoring clarifies heat exposure levels.",
  },
  {
    id: "ehs_programs",
    icon: ClipboardList,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50",
    accentColor: "border-slate-200",
    situation: "Written EHS programs exist but have not been reviewed since a process or personnel change.",
    risk: "Outdated programs may not reflect current regulatory requirements.",
    action: "A compliance gap review identifies priority updates.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-[#1a3a52] text-xs font-semibold uppercase tracking-widest">
            Recognise the Situation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-2 mb-3">
            Observable Conditions That Warrant Assessment
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Many workplace health risks are identified through observable conditions before they become regulatory issues. 
            Use these indicators to determine whether professional measurement is warranted.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hooks.map((hook, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <Link
                to={createPageUrl("Services")}
                className={`group flex flex-col h-full bg-white rounded-xl border ${hook.accentColor} hover:shadow-md transition-all duration-300 p-6 relative overflow-hidden`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${hook.iconBg.replace("bg-", "bg-").replace("50", "400")} opacity-60`} />

                {/* Icon */}
                <div className={`w-10 h-10 ${hook.iconBg} rounded-lg flex items-center justify-center mb-4 flex-shrink-0`}>
                  <hook.icon className={`w-5 h-5 ${hook.iconColor}`} />
                </div>

                {/* Situation */}
                <p className="text-slate-800 text-sm font-medium leading-snug mb-3">
                  {hook.situation}
                </p>

                {/* Risk */}
                <p className="text-slate-500 text-xs leading-relaxed mb-4 border-l-2 border-slate-200 pl-3">
                  {hook.risk}
                </p>

                {/* Action */}
                <div className="mt-auto flex items-center gap-1.5 text-[#1a3a52] text-xs font-semibold group-hover:gap-2.5 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  {hook.action}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-left">
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a52] border border-[#1a3a52] px-6 py-2.5 rounded-full hover:bg-[#1a3a52] hover:text-white transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}