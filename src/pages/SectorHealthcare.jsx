import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical, Wind, Shield, FileText, Microscope } from "lucide-react";

const challenges = [
  { icon: FlaskConical, text: "Chemical disinfectant and cleaning agent exposure without current air monitoring data" },
  { icon: Wind, text: "Fume hood and local exhaust ventilation performance that has not been verified recently" },
  { icon: Microscope, text: "New process chemicals or pharmaceuticals introduced without formal exposure assessment" },
  { icon: Shield, text: "Respiratory protection program gaps including fit testing records and medical clearance documentation" },
  { icon: FileText, text: "Regulatory documentation requirements under the Ontario OHSA and accreditation standards" },
];

const pillars = [
  {
    num: "01",
    title: "Risk Identification",
    body: "We assess chemical and biological exposure pathways in clinical and laboratory environments, identifying vulnerabilities that standard infection control programs do not address.",
  },
  {
    num: "02",
    title: "Strategic Exposure Assessment",
    body: "Personal breathing zone sampling, ventilation verification, and bioaerosol assessments are conducted using methods appropriate for healthcare and laboratory settings.",
  },
  {
    num: "03",
    title: "Regulatory Alignment",
    body: "We align findings with Ontario OHS legislation, WHMIS obligations, and healthcare accreditation requirements, supporting documentation that withstands Ministry and accreditor review.",
  },
  {
    num: "04",
    title: "Practical Control and Communication",
    body: "We deliver control recommendations and plain-language summaries for occupational health teams, infection control committees, and senior leadership.",
  },
];

export default function SectorHealthcare() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/64b1581fb_ChatGPTImageMar4202601_56_26PM.png" alt="" className="w-full h-full object-contain bg-[#0F2A4A]" />
          <div className="absolute inset-0 bg-[#0F2A4A]/80" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Healthcare and Laboratories</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Occupational Health Solutions for Healthcare and Laboratories
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-2">
              Science-based clarity for complex workplace exposure challenges.
            </p>
            <p className="text-slate-400 text-base">Serving hospitals, clinics, laboratories, and long-term care across Ontario.</p>
            <div className="mt-8">
              <Link to={`${createPageUrl("Contact")}?service=safety_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Request a Healthcare Exposure Review
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
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2 mb-4">Common Challenges in Healthcare and Laboratories</h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Healthcare and laboratory environments demand rigorous exposure evaluation and preventive control validation. The complexity of chemical and biological agents used daily makes systematic assessment essential, not optional.
            </p>
          </motion.div>
          <div className="space-y-4">
            {challenges.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="w-9 h-9 bg-rose-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-4 h-4 text-rose-600" />
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
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2">How We Help Healthcare and Laboratory Organizations</h2>
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
              "Like a safety lamp detecting invisible hazards before harm occurs, LumenEx EHS helps healthcare organizations identify unseen chemical and biological exposure risks early and act with confidence."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-3">Rigorous evaluation. Preventive clarity.</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              If your organization has unverified exposures, aging ventilation assessments, or respiratory program gaps, we provide the evaluation and documentation your team needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=safety_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Request a Healthcare Exposure Review
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