import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, HardHat, Thermometer, Volume2, ClipboardCheck } from "lucide-react";

const challenges = [
  { icon: Wind, text: "Silica, asbestos, and lead dust exposures on renovation and demolition sites without current air monitoring" },
  { icon: HardHat, text: "Personal protective equipment programs that are assumed compliant but have not been formally evaluated" },
  { icon: Thermometer, text: "Heat stress risks on outdoor or enclosed construction sites during summer months" },
  { icon: Volume2, text: "Noise from equipment and trades operating simultaneously without documented exposure assessment" },
  { icon: ClipboardCheck, text: "Ministry of Labour constructor obligations that require documented hazard control and worker training" },
];

const pillars = [
  {
    num: "01",
    title: "Risk Identification",
    body: "We assess site-specific hazard profiles by trade, task, and phase of construction, identifying where legacy materials, process changes, or concurrent trades create compounding exposures.",
  },
  {
    num: "02",
    title: "Strategic Exposure Assessment",
    body: "Air sampling for silica, asbestos fibres, lead, and noise dosimetry are conducted with minimal site disruption and benchmarked against Ontario regulatory limits.",
  },
  {
    num: "03",
    title: "Regulatory Alignment",
    body: "Findings are structured to support constructor compliance under Ontario Regulation 278/05, O. Reg. 213/91, and OHSA hazardous substance requirements.",
  },
  {
    num: "04",
    title: "Practical Control and Communication",
    body: "We deliver worker-ready hazard information and supervisor-ready documentation that supports both safe work procedures and Ministry-facing compliance records.",
  },
];

export default function SectorConstruction() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#0F2A4A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-80 h-80 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Construction Sector</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Occupational Health Solutions for Construction
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-2">
              Science-based clarity for complex workplace exposure challenges.
            </p>
            <p className="text-slate-400 text-base">Serving contractors, constructors, and project site management across Ontario.</p>
            <div className="mt-8">
              <Link to={`${createPageUrl("Contact")}?service=safety_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Request a Construction Site Exposure Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">Sector Reality</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2 mb-4">Common Challenges in Construction</h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Construction sites combine multiple hazard sources, compressed timelines, and high Ministry scrutiny. Without documented exposure data, constructors cannot demonstrate compliance or defend against incident investigations.
            </p>
          </motion.div>
          <div className="space-y-4">
            {challenges.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">Our Approach</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2">How We Help Construction Organizations</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                <span className="text-[#d4af7a] font-bold text-sm">{p.num}</span>
                <h3 className="text-[#1a3a52] font-bold text-lg mt-2 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Lamp Statement */}
      <section className="py-14 bg-[#f9f8f6] border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-2xl text-[#1a3a52] font-light leading-relaxed italic">
              "Like a safety lamp detecting invisible hazards before harm occurs, LumenEx EHS helps construction organizations identify unseen site exposure risks early and act with confidence."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-3">Document the exposure. Support the defense.</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Whether you are preparing for a Ministry inspection, responding to a worker complaint, or assessing a legacy material concern, we provide the assessment your project needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=safety_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Request a Construction Site Exposure Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Services")}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 rounded-full">
                  View All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}