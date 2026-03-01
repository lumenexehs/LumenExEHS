import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Anticipate & Recognize",
    descs: [
      "Walk the workplace, understand the work, and identify what could be harming workers — before taking any measurements.",
      "Review process flows, chemical inventories, and job tasks to anticipate exposure pathways.",
      "Interview workers and supervisors to capture real conditions, not just documented procedures."
    ]
  },
  {
    step: "02",
    title: "Design & Evaluate",
    descs: [
      "Design a targeted sampling strategy that captures real exposure levels for the workers most at risk.",
      "Select measurement methods and instruments calibrated to detect the agents of concern.",
      "Structure Similar Exposure Groups (SEGs) to maximize the efficiency of monitoring campaigns."
    ]
  },
  {
    step: "03",
    title: "Analyse & Interpret",
    descs: [
      "Turn monitoring data into clear exposure profiles — with a risk verdict you can act on and defend.",
      "Apply Bayesian statistical analysis to quantify uncertainty and characterize the upper exposure tail.",
      "Benchmark findings against Ontario OELs, ACGIH TLVs®, and relevant CSA standards."
    ]
  },
  {
    step: "04",
    title: "Control & Communicate",
    descs: [
      "Provide practical, ranked recommendations in plain language — for workers, supervisors, and safety committees.",
      "Prioritize controls using the hierarchy: elimination, substitution, engineering, administrative, PPE.",
      "Deliver findings in formats accessible to JHSCs, management, and frontline staff."
    ]
  }
];

function StepCard({ item, index }) {
  const [descIndex, setDescIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDescIndex((prev) => (prev + 1) % item.descs.length);
    }, 2800 + index * 400);
    return () => clearInterval(interval);
  }, [item.descs.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col"
    >
      <div className="text-4xl font-bold text-emerald-100 mb-4">{item.step}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{item.title}</h3>
      <div className="relative flex-1 min-h-[72px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={descIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-slate-600 text-sm leading-relaxed absolute inset-0"
          >
            {item.descs[descIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1 mt-6">
        {item.descs.map((_, i) => (
          <button
            key={i}
            onClick={() => setDescIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === descIndex ? "w-6 bg-emerald-500" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ApproachSteps() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((item, index) => (
        <StepCard key={item.step} item={item} index={index} />
      ))}
    </div>
  );
}