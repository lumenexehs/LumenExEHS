import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, AlertTriangle, FileText, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    label: "Tenant Complaint",
    desc: "Recurring odour or air quality concern raised",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    dotColor: "bg-amber-400",
  },
  {
    icon: AlertTriangle,
    label: "Unresolved Risk",
    desc: "Source unknown — liability compounds over time",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    dotColor: "bg-red-400",
  },
  {
    icon: FileText,
    label: "LumenEx Assessment",
    desc: "Science-based investigation with documented findings",
    color: "bg-[#1a3a52]/5 border-[#1a3a52]/20",
    iconColor: "text-[#1a3a52]",
    dotColor: "bg-[#1a3a52]",
  },
  {
    icon: CheckCircle2,
    label: "Resolved & Defensible",
    desc: "Clear path forward — asset protected, tenant satisfied",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
];

export default function TenantJourneyAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setActive(i);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="mb-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5 text-center"
      >
        The Unresolved Complaint Lifecycle
      </motion.p>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={active >= i ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.45, type: "spring", stiffness: 200 }}
              className={`flex-1 rounded-2xl border p-4 ${step.color} flex flex-col items-center text-center gap-2`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm`}>
                <step.icon className={`w-5 h-5 ${step.iconColor}`} />
              </div>
              <p className="text-[#1a3a52] font-semibold text-xs leading-snug">{step.label}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={active >= i ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ originX: 0 }}
                className="flex items-center px-1"
              >
                <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="sm:hidden flex flex-col gap-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -16 }}
            animate={active >= i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, type: "spring" }}
            className={`flex items-start gap-3 rounded-xl border p-4 ${step.color}`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm flex-shrink-0`}>
              <step.icon className={`w-4 h-4 ${step.iconColor}`} />
            </div>
            <div>
              <p className="text-[#1a3a52] font-semibold text-sm">{step.label}</p>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}