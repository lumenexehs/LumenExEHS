import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, Thermometer, Wind, Truck, ClipboardCheck } from "lucide-react";

const challenges = [
{ icon: Volume2, text: "Noise exposure levels that are uncertain or undocumented, creating hearing loss liability" },
{ icon: Thermometer, text: "Heat stress risks during peak production cycles, particularly in summer months" },
{ icon: Wind, text: "Silica, metal dust, or process chemical exposures without current sampling data" },
{ icon: Truck, text: "Diesel exhaust from internal combustion forklifts in enclosed production or warehouse areas" },
{ icon: ClipboardCheck, text: "Ministry of Labour inspections or compliance audits with gaps in written programs" }];


const pillars = [
{
  num: "01",
  title: "Risk Identification",
  body: "We map exposure pathways by worker group, task, and area — identifying where documentation gaps create the greatest legal and health risk before an incident occurs."
},
{
  num: "02",
  title: "Strategic Exposure Assessment",
  body: "Personal breathing zone sampling and noise dosimetry are conducted with minimal disruption to production, delivering results benchmarked against Ontario OELs and ACGIH TLVs."
},
{
  num: "03",
  title: "Regulatory Alignment",
  body: "We align findings with O. Reg. 381/15 (noise), O. Reg. 833 (chemical agents), and OHSA requirements, supporting audit-ready documentation and JHSC communication."
},
{
  num: "04",
  title: "Practical Control and Communication",
  body: "We prioritize controls by feasibility and risk level, producing actionable recommendations that supervisors and workers can apply without disrupting operations."
}];


export default function SectorManufacturing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#0F2A4A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Manufacturing Sector</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Occupational Health Solutions for Manufacturing
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-2">
              Science-based clarity for complex workplace exposure challenges.
            </p>
            <p className="text-slate-400 text-base">Serving manufacturers and industrial facilities across Ontario.</p>
            <div className="mt-8">
              <Link to={`${createPageUrl("Contact")}?service=risk_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Schedule a Manufacturing Exposure Review
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
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2 mb-4">Common Challenges in Manufacturing</h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Manufacturing environments require integrated exposure assessment that minimizes disruption while strengthening compliance defensibility. Undocumented exposures accumulate into long-term liability.
            </p>
          </motion.div>
          <div className="space-y-4">
            {challenges.map((c, i) =>
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">{c.text}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">Our Approach</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2">How We Help Manufacturing Organizations</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) =>
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                <span className="text-[#d4af7a] font-bold text-sm">{p.num}</span>
                <h3 className="text-[#1a3a52] font-bold text-lg mt-2 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Safety Lamp Statement */}
      <section className="py-14 bg-[#f9f8f6] border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-2xl text-[#1a3a52] font-light leading-relaxed italic">
              "Like a safety lamp detecting invisible hazards before harm occurs, LumenEx EHS helps manufacturing organizations identify unseen occupational health risks early and act with confidence."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-3">Exposure data before the audit. Not after.</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              If your facility has exposure uncertainties, compliance gaps, or unresolved Ministry concerns, we deliver the data and documentation you need to act decisively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=risk_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Schedule a Manufacturing Exposure Review
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Services")}>
                <Button size="lg" variant="outline" className="bg-sky-700 text-white px-8 text-sm font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-10 border-white/30 hover:bg-white/10">
                  View All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

}