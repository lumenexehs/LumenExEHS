import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, School, Wind, AlertTriangle, Shield, Radio, MessageSquare } from "lucide-react";
import IAQImagePanel from "@/components/education/IAQImagePanel";

const challenges = [
{ icon: Wind, text: "Recurring odour complaints in classrooms with no identified source" },
{ icon: AlertTriangle, text: "Teachers and staff reporting headaches, fatigue, or discomfort" },
{ icon: School, text: "Construction dust infiltrating occupied areas during renovations" },
{ icon: Radio, text: "Radon accumulation in lower-level classrooms and storage rooms" },
{ icon: MessageSquare, text: "Pressure to communicate credibly with parents, boards, and unions" }];


const pillars = [
{
  num: "01",
  title: "Risk Identification",
  body: "We assess air quality, ventilation performance, and contaminant pathways specific to school and college environments. Our process targets the source, not just the symptom."
},
{
  num: "02",
  title: "Strategic Exposure Assessment",
  body: "From radon measurement to breathing zone sampling near renovation zones, we quantify real exposures and compare them against Health Canada and Ontario standards."
},
{
  num: "03",
  title: "Regulatory Alignment",
  body: "We align findings with applicable Ontario guidelines and support duty-of-care documentation for school boards and administrators."
},
{
  num: "04",
  title: "Practical Control and Communication",
  body: "We prepare plain-language summaries suitable for board presentations, union inquiries, and parent communications — translating data into clear next steps."
}];


export default function SectorEducation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0b309d691_ChatGPTImageMar4202612_04_48PM.png" alt="" className="w-full h-full object-contain bg-[#0F2A4A]" />
          <div className="absolute inset-0 bg-[#0F2A4A]/80" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Education Sector</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Occupational Health Solutions for Educational Institutions
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-2">
              Science-based clarity for complex workplace exposure challenges.
            </p>
            <p className="text-slate-400 text-base">Serving schools, colleges, and boards of education across Ontario.</p>
            <div className="mt-8">
              <Link to={`${createPageUrl("Contact")}?service=environmental_audit`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Book an IAQ Investigation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IAQ Image Panel */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <IAQImagePanel />
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">Sector Reality</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2 mb-4">Common Challenges in Education</h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Educational institutions require not just testing, but defensible answers and clear communication. Occupants cannot be relocated indefinitely, and uncertainty creates institutional risk.
            </p>
          </motion.div>
          <div className="space-y-4">
            {challenges.map((c, i) =>
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-4 h-4 text-emerald-600" />
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
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2">How We Help Education Organizations</h2>
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
              "Like a safety lamp detecting invisible hazards before harm occurs, LumenEx EHS helps education organizations identify unseen occupational health risks early and act with confidence."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-3">Resolve the concern. Protect your occupants.</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              If your institution is managing an unresolved air quality concern, a radon question, or a complaint you cannot explain, we can help you find a defensible answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=environmental_audit`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  Book an IAQ Investigation
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