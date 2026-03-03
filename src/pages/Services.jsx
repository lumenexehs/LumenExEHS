import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Leaf, HardHat, ClipboardCheck, GraduationCap, Zap, Building,
  ArrowRight, CheckCircle2, Factory, Stethoscope, Activity,
  ChevronDown, ChevronUp, Home, Building2, Users, HeartPulse
} from "lucide-react";

const audienceMap = {
  home: { icon: Home, label: "Homeowners" },
  business: { icon: Factory, label: "Businesses" },
  facility: { icon: Building2, label: "Facilities" },
  public: { icon: HeartPulse, label: "Public Sector" },
  ngo: { icon: Users, label: "NGOs" },
};

const services = [
  {
    id: "iaq",
    icon: Building,
    title: "Indoor Air Quality, Odour & Mould",
    tagline: "Indoor Air · Radon · Microbial",
    situation: "Occupants report persistent headaches, stale air, or odours that improve upon leaving the building. A recent flood, renovation, or HVAC change preceded the complaints.",
    risk: "Ventilation deficiencies, microbial growth, or chemical off-gassing may be present. Unverified IAQ issues carry productivity and liability implications.",
    action: "A targeted IAQ assessment identifies the source and provides a remediation pathway.",
    summary: "Occupants report persistent headaches, stale air, or odours that improve upon leaving the building. A recent flood, renovation, or HVAC change preceded the complaints.",
    bullets: ["Mould & Legionella testing", "Radon measurement", "Odour source investigation", "Ventilation assessment"],
    audiences: ["home", "facility", "public", "ngo"],
    triggers: ["Musty smell or visible mould", "Occupant health complaints", "Real estate transaction", "Post-flood or renovation"],
    deliverables: ["Contaminant source report", "Radon levels vs. Health Canada guidelines", "Mould remediation scope", "Ventilation improvement plan"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e3ec8e48c_ChatGPTImageFeb28202604_23_54PM.png"
  },
  {
    id: "occupational_hygiene",
    icon: Leaf,
    title: "Chemical & Biological Exposure Assessment",
    tagline: "Dust · Chemicals · Bioaerosols",
    situation: "Workers are handling chemicals, cutting or grinding materials, or working near biological sources. Visible dust is present, or new substances have been introduced without updated SDS review.",
    risk: "Respirable particles and chemical vapours may remain hazardous even when not visible. Unmeasured exposure creates regulatory and health liability.",
    action: "A personal breathing zone assessment provides defensible exposure data benchmarked against Ontario OELs.",
    summary: "Workers are handling chemicals, cutting or grinding materials, or working near biological sources without documented exposure data.",
    bullets: ["Personal breathing zone sampling", "SEG exposure profiles", "Bayesian risk analysis", "Control recommendations"],
    audiences: ["business", "facility", "public"],
    triggers: ["Chemical or dust concerns", "Ministry of Labour audit", "New process or substance introduced"],
    deliverables: ["Exposure profiles vs. Ontario OELs & ACGIH TLVs®", "Risk ratings by worker group", "Prioritized control plan", "Audit-ready report"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/9375df2c5_20260301_0342_ImageGeneration_remix_01kjm8zs61fkyb4nb8xp3f491q.png"
  },
  {
    id: "noise_physical",
    icon: HardHat,
    title: "Noise, Radiation & Physical Agents",
    tagline: "Noise · Vibration · Radiation",
    situation: "Workers must raise their voice to be heard at arm's length, or facilities operate ionizing or non-ionizing equipment without recent compliance verification.",
    risk: "Noise-induced hearing loss develops gradually and is irreversible. Radiation compliance depends on measurement, not assumption.",
    action: "A structured noise and radiation survey provides regulatory-defensible results.",
    summary: "Workers must raise their voice to be heard at arm's length, or ionizing equipment operates without recent compliance verification.",
    bullets: ["8-hour TWA noise dosimetry", "Vibration (hand-arm & whole-body)", "Radiation field surveys", "Hearing program review"],
    audiences: ["business", "facility", "public"],
    triggers: ["Workers reporting hearing issues", "Loud equipment added", "JHSC noise concerns"],
    deliverables: ["Noise exposure report vs. O. Reg. 381/15", "Radiation survey findings", "Engineering control priorities", "Hearing conservation gaps"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e69f0a4a0_20260301_0400_ImageGeneration_remix_01kjma0etbfg2bskz604ancbdh.png"
  },
  {
    id: "heat_ergonomics",
    icon: Zap,
    title: "Heat Stress & Ergonomics",
    tagline: "Heat · Ergonomics · MSD Prevention",
    summary: "Hot workplaces or repetitive injury risks? We assess thermal limits and ergonomic hazards before workers get hurt.",
    bullets: ["WBGT heat monitoring (ISO 7243)", "Metabolic rate estimation", "RULA/REBA ergonomic review", "MSD control recommendations"],
    audiences: ["business", "facility"],
    triggers: ["Summer outdoor or hot indoor work", "MSD injury spike", "New production line or task"],
    deliverables: ["Heat exposure vs. ACGIH TLV® limits", "Acclimatization protocols", "Ergonomic risk scores", "Workstation modification plan"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/4b6becd0c_20260301_0417_ImageGeneration_remix_01kjmazxpre3xrr473txxxqw5z.png"
  },
  {
    id: "ehs_programs",
    icon: ClipboardCheck,
    title: "Compliance & Safety Management",
    tagline: "Programs · Policies · Audits",
    summary: "Not sure if you're compliant? Need written programs that will hold up to an audit? We build them in plain language — for workers and managers alike.",
    bullets: ["Chemical Prestart reviews (O. Reg. 851)", "Written EH&S program development", "ISO 45001 / CSA Z1000 gap analysis", "JHSC-ready summaries"],
    audiences: ["business", "facility", "public"],
    triggers: ["Ministry of Labour inspection", "New chemicals or processes", "Program never updated"],
    deliverables: ["Compliance gap report", "Written programs (OHSA-aligned)", "Safety management system framework", "JHSC communication materials"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training & Specialized Sector Support",
    tagline: "Training · Healthcare · Film · Indigenous Communities",
    summary: "Need training that reflects real hazards — not a generic slide deck? We deliver competency-based OHS training and sector-specific IH support.",
    bullets: ["Worker & supervisor hazard training", "JHSC Part I & II facilitation", "Healthcare & pharmaceutical IH", "Indigenous & remote site support"],
    audiences: ["business", "public", "ngo"],
    triggers: ["JHSC training due", "New workforce or high turnover", "Specialized sector assessment needed"],
    deliverables: ["Custom hazard training (needs analysis → delivery)", "JHSC certification facilitation", "Sector-specific IH assessment report", "Plain-language worker materials"],
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80"
  }
];

const industries = [
  { icon: Home, name: "Homeowners" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Building2, name: "Facility Managers" },
  { icon: HeartPulse, name: "Hospitals & Healthcare" },
  { icon: GraduationCap, name: "Schools" },
  { icon: HardHat, name: "Pharmaceuticals" },
  { icon: Users, name: "NGOs" },
  { icon: ClipboardCheck, name: "Public Services" }
];

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
    >
      {/* Top-level summary */}
      <div className="p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <service.icon className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
            <span className="text-emerald-600 text-sm font-medium">{service.tagline}</span>
          </div>
        </div>

        <p className="text-slate-600 mb-5 leading-relaxed">{service.summary}</p>

        <ul className="grid grid-cols-2 gap-2 mb-6">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* When you need it */}
        {service.triggers && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">When you need it</p>
            <div className="flex flex-wrap gap-2">
              {service.triggers.map(t => (
                <span key={t} className="bg-amber-50 border border-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Who it helps */}
        {service.audiences && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Who it helps</p>
            <div className="flex flex-wrap gap-2">
              {service.audiences.map(a => {
                const info = audienceMap[a];
                if (!info) return null;
                return (
                  <span key={a} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-full">
                    <info.icon className="w-3 h-3 text-emerald-500" />{info.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link to={createPageUrl("Contact") + `?service=${service.id}`}>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm group">
              Book a Free Consult
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-slate-500 hover:text-slate-800 text-sm rounded-full"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less detail" : "What we deliver"}
            {expanded ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50 px-8 py-8 grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl shadow-md w-full h-48 object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">What We Deliver</h4>
                <ul className="space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0F2A4A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              Ontario EHS Consulting
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
              What We Solve
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              Air quality issues. Noise. Odours. Mould. Workplace exposures. Compliance gaps. — We assess, measure, and give you clear answers.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Indoor Air & Odours", "Exposure Assessment", "Heat & Noise", "Compliance Support", "Training"].map(tag => (
                <span key={tag} className="bg-white/10 border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-10 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <span className="text-slate-500 font-medium text-sm">Sectors Across Ontario:</span>
            {industries.map((industry) => (
              <div key={industry.name} className="flex items-center gap-2 text-slate-700">
                <industry.icon className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-sm">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What We Do</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Click "Full detail" on any service to explore scope, methodology, and deliverables.</p>
          </motion.div>
          <div className="space-y-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Tell us your concern. We'll point you in the right direction — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=general`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 py-6 text-base rounded-full group">
                  📅 Book a Free 15-Min Consult
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full">
                  Get an Assessment Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}