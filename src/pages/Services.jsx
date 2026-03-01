import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Leaf, HardHat, ClipboardCheck, GraduationCap, Zap, Building,
  ArrowRight, CheckCircle2, Factory, Stethoscope, Activity,
  ChevronDown, ChevronUp
} from "lucide-react";

const services = [
  {
    id: "occupational_hygiene",
    icon: Leaf,
    title: "Occupational Hygiene & Exposure Risk Management",
    tagline: "Anticipation, recognition, evaluation & control",
    summary: "Characterize worker exposure to chemical, physical, and biological stressors using the AREC model — producing defensible exposure profiles benchmarked against Ontario OELs and ACGIH TLVs®.",
    bullets: ["SEG-based exposure assessment", "Personal breathing zone monitoring", "Bayesian statistical analysis", "Hierarchy-of-controls recommendations"],
    scope: "Applying the classical industrial hygiene paradigm — anticipation, recognition, evaluation, and control — to characterize worker exposure to chemical, physical, and biological stressors. We build defensible Similar Exposure Group (SEG) frameworks, apply AIHA-aligned qualitative and quantitative assessment strategies, and interpret monitoring data against Ontario O. Reg. 833 OELs and ACGIH TLVs®/BEIs® to inform meaningful risk decisions.",
    approach: "Each engagement begins with a thorough baseline walkthrough to identify exposure determinants, process variability, and control effectiveness. Measurement strategies are designed to characterize the upper tail of the exposure distribution. AIHA exposure banding and Bayesian statistical tools (IHDataAnalyst, IHSTAT) are used to quantify uncertainty and produce forward-looking exposure profiles that support due diligence.",
    deliverables: [
      "SEG inventory with documented exposure determinants and task profiles",
      "Personal breathing zone (PBZ) and area monitoring data packages",
      "Statistical exposure assessment with Bayesian risk quantification",
      "Benchmarking against O. Reg. 833 OELs and ACGIH TLVs®",
      "Exposure rating classifications and prioritized risk narratives",
      "Hierarchy-of-controls recommendations with implementation guidance"
    ],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/9375df2c5_20260301_0342_ImageGeneration_remix_01kjm8zs61fkyb4nb8xp3f491q.png"
  },
  {
    id: "noise_physical",
    icon: HardHat,
    title: "Noise & Physical Agents Assessment",
    tagline: "Acoustic, radiation & vibration hazard characterization",
    summary: "Quantitative evaluation of noise exposure, vibration, and radiation across Ontario workplaces — benchmarked against O. Reg. 381/15, CSA standards, and ACGIH TLVs®.",
    bullets: ["8-hour TWA noise dosimetry", "Ionizing & non-ionizing radiation surveys", "Hand-arm & whole-body vibration", "Hearing conservation program review"],
    scope: "Quantitative evaluation of occupational noise exposure (TWA, Ldn, NC, and PNC criteria), hand-arm and whole-body vibration, ionizing and non-ionizing radiation (RF, ELF-EMF, UV, laser), and other physical agents across Ontario workplaces — including manufacturing, film production, construction, healthcare, and office environments.",
    approach: "Personal noise dosimetry using calibrated Type 1/Type 2 instruments with full octave-band analysis for source characterization and noise control modelling. Radiation surveys conducted per applicable Ontario and federal regulatory frameworks. All dosimetric datasets are subjected to rigorous statistical treatment to distinguish true exposure variability from measurement uncertainty.",
    deliverables: [
      "8-hour TWA and Ldn noise exposure reports per O. Reg. 381/15",
      "Noise criteria (NC/PNC/RC) assessments for occupied space design",
      "Ionizing and non-ionizing radiation field survey reports",
      "Hand-arm and whole-body vibration exposure determinations",
      "Statistical analysis of dosimetry variability and exposure profile",
      "Hearing conservation program gap review with engineering control priorities"
    ],
    image: "https://images.unsplash.com/photo-1517090186835-e348b621c9ca?w=600&q=80"
  },
  {
    id: "heat_ergonomics",
    icon: Zap,
    title: "Heat Stress Monitoring & Ergonomics",
    tagline: "Thermal work limit & musculoskeletal risk evaluation",
    summary: "WBGT-based heat stress monitoring and evidence-based ergonomic assessments to protect workers from thermal and musculoskeletal hazards in Ontario.",
    bullets: ["WBGT monitoring (ISO 7243)", "Metabolic rate estimation", "RULA/REBA ergonomic assessments", "MSD hazard control recommendations"],
    scope: "Quantitative heat stress monitoring using wet-bulb globe temperature (WBGT) measurements, metabolic rate estimation, and clothing adjustment factors to evaluate thermal work limits — including foundries, outdoor construction, kitchens, and laundries. Ergonomics assessments address MSD hazard identification, job demands analysis, and workstation optimization.",
    approach: "WBGT monitoring conducted per ISO 7243 and ACGIH TLV® protocols with job-specific metabolic rate estimation per ISO 8996. Ergonomic evaluations draw on validated observational tools (RULA, REBA, NIOSH Lifting Equation, Strain Index) using a participatory approach that involves workers and supervisors.",
    deliverables: [
      "WBGT measurements across indoor and outdoor environments by shift and season",
      "Metabolic rate profiles for specific job classifications (ISO 8996)",
      "ACGIH TLV®-based thermal work limit determinations and acclimatization protocols",
      "Heat illness prevention program review and update recommendations",
      "MSD hazard inventory with quantified risk scores and control hierarchy",
      "Ergonomic intervention report with prioritized workstation modifications"
    ],
    image: "https://images.unsplash.com/photo-1548323990-8f3b4e1e8c2d?w=600&q=80"
  },
  {
    id: "iaq",
    icon: Building,
    title: "Indoor Air Quality, Odour & Microbial Investigations",
    tagline: "Indoor environmental quality & occupant health protection",
    summary: "Structured IAQ investigations, odour source characterization, vapour intrusion, microbial (mould, Legionella) assessments, and radon measurement programs across Ontario.",
    bullets: ["IAQ baseline assessments", "Odour & vapour intrusion investigations", "Mould & Legionella evaluations", "Radon measurement & mitigation"],
    scope: "Structured investigation of indoor environmental quality (IEQ) concerns across residential, commercial, institutional, and healthcare settings in Ontario. Services span IAQ baseline assessments, odour source characterization, sub-slab vapour intrusion investigations, microbial contamination evaluations, and radon measurement programs — all within the AREC framework.",
    approach: "Direct-reading instruments deployed for real-time characterization of CO₂, TVOC, PM₂.₅/PM₁₀, temperature, and relative humidity as first-tier screening. Confirmed by targeted analytical sampling where warranted. Ventilation reviewed against ASHRAE 62.1. Microbial investigations follow AIHA and ACGIH guidance. Radon testing aligned with Health Canada and CSA C828.",
    deliverables: [
      "Ventilation adequacy review benchmarked against ASHRAE 62.1 and NBC",
      "Contaminant source characterization reports for odour and chemical complaints",
      "Vapour intrusion pathway assessment with exposure risk characterization",
      "Microbial investigation report with sampling data, risk narrative, and remediation scope",
      "Radon measurement report with Health Canada guideline comparison and mitigation options",
      "Prioritized IEQ improvement plan with short- and long-term control recommendations"
    ],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e3ec8e48c_ChatGPTImageFeb28202604_23_54PM.png"
  },
  {
    id: "ehs_programs",
    icon: ClipboardCheck,
    title: "EH&S Programs, Policy & Safety Management",
    tagline: "Compliance architecture & due diligence frameworks",
    summary: "Development and gap analysis of written EH&S programs and safety management systems aligned with Ontario OHSA, ISO 45001, CSA Z1000, and COR™ frameworks.",
    bullets: ["Chemical Prestart reviews (O. Reg. 851)", "Written EH&S program development", "ISO 45001 / CSA Z1000 gap analysis", "JHSC-accessible program summaries"],
    scope: "Development, gap analysis, and revision of written EH&S programs and policies required under the Ontario OHSA — including Chemical Prestart Health & Safety Reviews under O. Reg. 851. Safety Management System (SMS) engagements are structured around ISO 45001, CSA Z1000, and COR™ to build durable, audit-ready compliance infrastructure.",
    approach: "Engagements begin with a legislated requirements inventory mapped against existing program documentation and hazard registers. Gap findings are translated into a compliance roadmap with prioritized actions scaled to organizational capacity. Written programs are developed in plain language accessible to workers and JHSCs — grounded in client-specific hazards and operations.",
    deliverables: [
      "Chemical Prestart Health & Safety Review report (O. Reg. 851, s. 7)",
      "Written EH&S program development or revision (OHSA-aligned)",
      "Safety Management System gap analysis against ISO 45001 or CSA Z1000",
      "Legislated requirements inventory with compliance status matrix",
      "Hazard identification and risk assessment (HIRA) framework documentation",
      "JHSC-accessible program summaries and worker communication materials"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training & Specialized Sector Support",
    tagline: "Applied IH training & high-sensitivity environment expertise",
    summary: "Competency-based OHS training for workers, supervisors, and JHSC members — plus specialized IH support for healthcare, film, pharmaceuticals, and Indigenous communities.",
    bullets: ["Worker & supervisor hazard training", "JHSC Part I & II facilitation", "Pharmaceutical & cleanroom IH", "Healthcare & remote site support"],
    scope: "Competency-based occupational health and safety training grounded in Ontario OHSA requirements and actual workplace hazard profiles. Specialized industrial hygiene support for high-sensitivity sectors: healthcare facilities, film and television production, Indigenous and remote communities, and educational institutions.",
    approach: "Training programs are developed from a task hazard analysis baseline, ensuring content reflects real exposure scenarios rather than generic checklists. Delivery is adapted to literacy, language, and operational context. Sector-specific assessments apply relevant regulatory and technical standards.",
    deliverables: [
      "Hazard-specific worker and supervisor training (needs analysis through delivery)",
      "JHSC Part I and Part II training facilitation",
      "Pharmaceutical facility and cleanroom IH exposure assessment reports",
      "Hospital and long-term care IH program support (Legionella, disinfectants, IAQ)",
      "Indigenous community and remote site EHS field assessment support",
      "Film and television production safety assessments and set IH evaluations"
    ],
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80"
  }
];

const industries = [
  { icon: Factory, name: "Manufacturing" },
  { icon: Building, name: "Construction" },
  { icon: Stethoscope, name: "Hospitals & Healthcare" },
  { icon: GraduationCap, name: "Educational Institutions" },
  { icon: Activity, name: "Production" },
  { icon: HardHat, name: "Pharmaceuticals" },
  { icon: Building, name: "Residential (Home Owner)" },
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

        <div className="flex items-center gap-3">
          <Link to={createPageUrl("Contact") + `?service=${service.id}`}>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm group">
              Discuss This Service
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-slate-500 hover:text-slate-800 text-sm rounded-full"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less detail" : "Full detail"}
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
                  className="rounded-xl shadow-md w-full h-48 object-cover mb-6"
                />
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Scope</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.scope}</p>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Our Approach</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{service.approach}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Key Deliverables</h4>
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
              Occupational Hygiene & EHS Services
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Defensible exposure assessments, regulatory compliance support, and practical risk control solutions — aligned with Ontario OHS legislation, CSA standards, and ACGIH TLVs®.
            </p>
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
              Ready to Replace Uncertainty with Evidence?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us to discuss your occupational hygiene or EHS needs across Ontario.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group">
                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}