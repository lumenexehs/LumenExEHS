import { motion } from "framer-motion";
import { Search, BarChart2, ClipboardCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const pillars = [
  {
    icon: Search,
    number: "01",
    title: "Risk Identification",
    description: "IAQ, odour investigation, noise, heat stress, silica, diesel, radiation, and radon. We identify what is present and what requires attention.",
    tags: ["IAQ", "Odour", "Noise", "Heat", "Radon", "Radiation"]
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Strategic Exposure Assessment",
    description: "SEG design, integrated monitoring campaigns, and statistical interpretation. We quantify exposures with the precision required for defensible reporting.",
    tags: ["SEG Design", "Sampling", "Statistical Analysis"]
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Regulatory and Compliance Alignment",
    description: "Ontario and Federal OHS compliance, documentation, and audit-ready reporting. We map your obligations and fill the gaps.",
    tags: ["OHSA", "O. Reg. 381/15", "ACGIH TLVs", "CSA Standards"]
  },
  {
    icon: MessageSquare,
    number: "04",
    title: "Implementation and Communication",
    description: "Clear guidance written for workers, supervisors, JHSC members, and executive leadership. No jargon. Actionable next steps.",
    tags: ["JHSC Reports", "Worker Materials", "Executive Summaries"]
  }
];

export default function WhatWeDeliver() {
  return (
    <section className="py-20 bg-[#0F2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">
            Our Service Structure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            What We Deliver
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Four structured pillars that take you from uncertainty to defensible clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 bg-[#d4af7a]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-5 h-5 text-[#d4af7a]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-mono font-semibold">{pillar.number}</span>
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{pillar.description}</p>
              <div className="flex flex-wrap gap-2">
                {pillar.tags.map(tag => (
                  <span key={tag} className="text-xs text-[#d4af7a] bg-[#d4af7a]/10 border border-[#d4af7a]/20 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}