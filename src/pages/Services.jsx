import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Leaf, 
  HardHat, 
  ClipboardCheck, 
  GraduationCap, 
  AlertTriangle, 
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Factory,
  Zap,
  Stethoscope,
  Building,
  Activity
} from "lucide-react";

const services = [
  {
    id: "occupational_hygiene",
    icon: Leaf,
    title: "Occupational Hygiene & Exposure Risk Management",
    shortDesc: "Anticipation, recognition, evaluation & control",
    scope: "Applying the classical industrial hygiene paradigm — anticipation, recognition, evaluation, and control — to characterize worker exposure to chemical, physical, and biological stressors. We build defensible Similar Exposure Group (SEG) frameworks, apply AIHA-aligned qualitative and quantitative assessment strategies, and interpret monitoring data against Ontario O. Reg. 833 OELs and ACGIH TLVs®/BEIs® to inform meaningful risk decisions.",
    approach: "Each engagement begins with a thorough baseline walkthrough to identify exposure determinants, process variability, and control effectiveness. Measurement strategies are designed to characterize the upper tail of the exposure distribution — not just point-in-time snapshots. LOEL, AIHA exposure banding, and Bayesian statistical tools (IHDataAnalyst, IHSTAT) are used to quantify uncertainty and produce forward-looking exposure profiles that support due diligence.",
    deliverables: [
      "SEG inventory with documented exposure determinants and task profiles",
      "Personal breathing zone (PBZ) and area monitoring data packages",
      "Statistical exposure assessment with Bayesian risk quantification (IHSTAT/IHDataAnalyst)",
      "Benchmarking against O. Reg. 833 OELs and ACGIH TLVs®",
      "Exposure rating classifications and prioritized risk narratives",
      "Hierarchy-of-controls recommendations with implementation guidance"
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"
  },
  {
    id: "noise_physical",
    icon: HardHat,
    title: "Noise & Physical Agents Assessment",
    shortDesc: "Acoustic, radiation & vibration hazard characterization",
    scope: "Quantitative evaluation of occupational noise exposure (TWA, Ldn, NC, and PNC criteria), hand-arm and whole-body vibration, ionizing and non-ionizing radiation (RF, ELF-EMF, UV, laser), and other physical agents across Ontario workplaces — including manufacturing, film production, construction, healthcare, and office environments. Assessments are benchmarked against Ontario O. Reg. 381/15, CSA standards, ACGIH TLVs®, and applicable federal guidelines.",
    approach: "Personal noise dosimetry using calibrated Type 1/Type 2 instruments with full octave-band and one-third octave analysis for source characterization and noise control modelling. Radiation surveys conducted per applicable Ontario and federal regulatory frameworks. All dosimetric datasets are subjected to rigorous statistical treatment to distinguish true exposure variability from measurement uncertainty — ensuring defensible, actionable conclusions.",
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
    title: "Heat Stress Monitoring & Ergonomics Assessment",
    shortDesc: "Thermal work limit & musculoskeletal risk evaluation",
    scope: "Quantitative heat stress monitoring using wet-bulb globe temperature (WBGT) measurements, metabolic rate estimation, and clothing adjustment factors to evaluate thermal work limits for Ontario workplaces — including foundries, outdoor construction, kitchens, and laundries. Ergonomics assessments address MSD hazard identification, job demands analysis, and workstation optimization for both physical and cognitive task demands.",
    approach: "WBGT monitoring conducted per ISO 7243 and ACGIH TLV® protocols with job-specific metabolic rate estimation per ISO 8996. Ergonomic evaluations draw on validated observational tools (RULA, REBA, NIOSH Lifting Equation, Strain Index) and task demands analysis, applying a participatory approach that involves workers and supervisors in identifying feasible, sustainable controls.",
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
    title: "Indoor Air Quality, Odour, Vapour & Microbial Investigations",
    shortDesc: "Indoor environmental quality & occupant health protection",
    scope: "Structured investigation of indoor environmental quality (IEQ) concerns across residential, commercial, institutional, and healthcare settings in Ontario. Services span IAQ baseline assessments, odour source characterization, sub-slab vapour intrusion investigations, microbial (mould, Legionella, endotoxin) contamination evaluations, and radon measurement programs — all framed within the occupational hygiene anticipation-recognition-evaluation-control model.",
    approach: "Direct-reading instruments deployed for real-time characterization of CO₂, TVOC, PM₂.₅/PM₁₀, temperature, and relative humidity as a first-tier screening step. Confirmed by targeted analytical sampling where warranted. Ventilation system adequacy reviewed against ASHRAE 62.1 and Ontario Building Code requirements. Microbial investigations follow AIHA and ACGIH guidance. Radon testing protocols aligned with Health Canada and CSA C828.",
    deliverables: [
      "Ventilation adequacy review benchmarked against ASHRAE 62.1 and NBC",
      "Contaminant source characterization reports for odour and chemical complaints",
      "Vapour intrusion pathway assessment with exposure risk characterization",
      "Microbial investigation report with sampling data, risk narrative, and remediation scope",
      "Radon measurement report with Health Canada guideline comparison and mitigation options",
      "Prioritized IEQ improvement plan with short- and long-term control recommendations"
    ],
    image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600&q=80"
  },
  {
    id: "ehs_programs",
    icon: ClipboardCheck,
    title: "EH&S Programs, Policy & Safety Management Systems",
    shortDesc: "Compliance architecture & due diligence frameworks",
    scope: "Development, gap analysis, and revision of written EH&S programs and policies required under the Ontario Occupational Health and Safety Act (OHSA) and its regulations — including Chemical Prestart Health & Safety Reviews under O. Reg. 851. Safety Management System (SMS) engagements are structured around recognized frameworks (ISO 45001, CSA Z1000, COR™) to build durable, audit-ready compliance infrastructure for Ontario public and private sector employers.",
    approach: "Engagements begin with a legislated requirements inventory mapped against existing program documentation, hazard registers, and management system elements. Gap findings are translated into a compliance roadmap with prioritized actions scaled to organizational capacity. Practical written programs are developed in plain language accessible to workers and JHSCs — not boilerplate, but defensible documentation grounded in the specific hazards and operations of each client.",
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
    shortDesc: "Applied IH training & high-sensitivity environment expertise",
    scope: "Competency-based occupational health and safety training for workers, supervisors, and Joint Health & Safety Committee (JHSC) members — grounded in Ontario OHSA requirements and the actual hazard profiles of each workplace. Specialized industrial hygiene support for high-sensitivity sectors: healthcare facilities (hospital IH, Legionella, pharmaceutical cleanrooms), the film and television production industry, Indigenous and remote communities, and educational institutions.",
    approach: "Training programs are developed from a task hazard analysis baseline, ensuring content reflects real exposure scenarios rather than generic compliance checklists. Delivery is adapted to literacy, language, and operational context. Sector-specific assessments apply the relevant regulatory and technical standards — from Health Canada guidance for hospitals and radon, to ACGIH TLVs® and CSA standards for cleanrooms and pharmaceutical environments.",
    deliverables: [
      "Hazard-specific worker and supervisor training (needs analysis through delivery)",
      "JHSC Part I and Part II training facilitation",
      "Pharmaceutical facility and cleanroom IH exposure assessment reports",
      "Hospital and long-term care IH program support (Legionella, disinfectant exposures, IAQ)",
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
  { icon: Activity, name: "Film Industry" },
  { icon: HardHat, name: "Pharmaceuticals" }
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Occupational Hygiene & EHS Services
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Comprehensive EHS consulting across Ontario — delivering defensible exposure 
              assessments, regulatory compliance support, and practical risk control solutions 
              aligned with Canadian OHS legislation, CSA standards, and ACGIH TLVs®.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <span className="text-slate-500 font-medium">Sectors We Serve Across Ontario:</span>
            {industries.map((industry) => (
              <div key={industry.name} className="flex items-center gap-2 text-slate-700">
                <industry.icon className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-emerald-600 font-semibold">
                      {service.shortDesc}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    {service.title}
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                        Scope
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {service.scope}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                        Typical Approach
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {service.approach}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                        Key Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link to={createPageUrl("Contact") + `?service=${service.id}`}>
                    <Button 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full group"
                    >
                      Discuss This Service
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="rounded-2xl shadow-xl w-full"
                    />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Our Four-Phase Approach
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Screen & Prioritize", desc: "Field instrumentation, exposure modelling, and AI-supported analytics to detect high-risk hazards and focus effort where it matters most." },
              { step: "02", title: "Design & Sample", desc: "Strategic SEG-based sampling campaigns that are integrated, cost-effective, and statistically valid across all relevant agents." },
              { step: "03", title: "Analyze & Forecast", desc: "Advanced Bayesian statistical methods to interpret data, quantify uncertainty, and generate forward-looking risk projections." },
              { step: "04", title: "Communicate & Protect", desc: "Translate complex findings into clear, actionable recommendations — defensible, hierarchy-of-control aligned, and operationally realistic." }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-emerald-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0F2A4A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Replace Uncertainty with Evidence?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us to discuss your occupational hygiene, EHS program, or regulatory compliance needs across Ontario.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group"
              >
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