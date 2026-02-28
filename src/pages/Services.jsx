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
    shortDesc: "Comprehensive exposure characterization",
    scope: "Systematic evaluation of chemical, physical, and biological agents through personal and area monitoring. Development of Similar Exposure Group (SEG) frameworks and statistical interpretation of results against Canadian occupational exposure limits.",
    approach: "Structured hazard screening combining field instrumentation, walkthrough assessments, exposure modelling, and AI-supported data analytics. Bayesian statistical analysis transforms limited datasets into forward-looking risk projections that inform strategic planning.",
    deliverables: [
      "SEG definitions with exposure determinants documented",
      "Personal breathing zone and area sampling data",
      "Statistical analysis including Bayesian risk quantification",
      "Comparison to provincial OELs and ACGIH TLVs®",
      "Exposure profile determination and risk prioritization",
      "Hierarchy-of-control aligned recommendations"
    ],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80"
  },
  {
    id: "noise_physical",
    icon: HardHat,
    title: "Noise & Physical Agents (Occupational, NC, PNC)",
    shortDesc: "Acoustic and radiation hazard assessment",
    scope: "Quantitative assessment of occupational noise (TWA, NC and PNC), ionizing and non-ionizing radiation, vibration, and other physical agents for Ontario workplaces across manufacturing, construction, healthcare, and film industries.",
    approach: "Personal noise dosimetry and octave-band analysis using Type 1/Type 2 sound level meters. Ionizing and non-ionizing radiation surveys per applicable Ontario regulations. Statistical treatment of dosimetry data for defensible exposure decisions.",
    deliverables: [
      "8-hour TWA noise exposure determinations",
      "NC and PNC noise criteria assessments",
      "Ionizing and non-ionizing radiation evaluation reports",
      "Statistical evaluation of exposure variability",
      "Hearing conservation program compliance review",
      "Engineering and administrative control recommendations"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
  },
  {
    id: "heat_ergonomics",
    icon: Zap,
    title: "Heat Stress Monitoring & Ergonomics Assessment",
    shortDesc: "Thermal and musculoskeletal risk evaluation",
    scope: "Quantitative heat stress assessment using WBGT measurements and metabolic rate estimates for Ontario workplaces. Ergonomic risk assessments for workplace safety, injury prevention, and compliance with Ontario OHS requirements.",
    approach: "WBGT monitoring per ISO 7243 protocols. Metabolic rate estimation per ISO 8996. Ergonomic evaluations using validated tools addressing posture, force, repetition, and work organization factors.",
    deliverables: [
      "WBGT measurements (indoor and outdoor environments)",
      "Metabolic rate calculations for specific job tasks",
      "Work-rest cycle and acclimatization protocol recommendations",
      "Heat illness prevention program guidance",
      "Ergonomic risk identification and control prioritization",
      "Workstation and task modification recommendations"
    ],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
  },
  {
    id: "iaq",
    icon: Building,
    title: "Indoor Air Quality, Odour, Vapour & Microbial Investigations",
    shortDesc: "Indoor environmental quality assessment",
    scope: "Systematic evaluation of indoor environments including IAQ, odour and vapour intrusion investigations, microbial contamination and exposure evaluations, and radon safety inspections for Ontario buildings across residential, commercial, and institutional settings.",
    approach: "Real-time monitoring of CO2, VOCs, particulates, temperature, and humidity. Source identification, ventilation assessment, and microbial sampling. Radon testing per Health Canada guidelines. Investigations tailored to residential, healthcare, and educational environments.",
    deliverables: [
      "HVAC system assessment and ventilation adequacy review",
      "Contaminant source identification and odour investigation reports",
      "Vapour intrusion assessment with risk characterization",
      "Microbial contamination sampling and remediation guidance",
      "Radon safety inspection report with Health Canada benchmarks",
      "Prioritized remediation and indoor air quality improvement plan"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
  },
  {
    id: "ehs_programs",
    icon: ClipboardCheck,
    title: "EH&S Program, Policy & Safety Management Systems",
    shortDesc: "Program development and compliance support",
    scope: "Development and review of comprehensive EH&S programs and policies, Safety Management Systems, and Chemical Prestart Health & Safety Reviews (as required under Ontario Regulation 851). Regulatory compliance support for Ontario public and private sector organizations.",
    approach: "Gap analysis against Ontario OHS legislation, CSA standards, and sector-specific requirements. Systematic review of written programs, hazard registers, and management systems. Practical, implementable recommendations aligned with due diligence principles.",
    deliverables: [
      "Chemical Prestart Health & Safety Review reports",
      "EH&S program and policy documentation",
      "Safety Management System development or gap analysis",
      "Regulatory compliance roadmap with prioritized actions",
      "Hazard identification and risk assessment frameworks",
      "JHSC-ready documentation and communication materials"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training & Specialized Environment Support",
    shortDesc: "Education, training, and high-sensitivity environments",
    scope: "Evidence-based workplace health and safety training for workers, supervisors, and JHSCs. Specialized EHS support for high-sensitivity environments including hospitals, pharmaceutical facilities, Indigenous communities, and film productions.",
    approach: "Training programs tailored to Ontario regulatory requirements and the specific hazards of each workplace. Specialized assessments for controlled environments applying sector-specific standards and guidance from Health Canada, CSA, and international bodies.",
    deliverables: [
      "Customized health and safety training programs",
      "Worker, supervisor, and JHSC training delivery",
      "Pharmaceutical and cleanroom exposure assessment support",
      "Hospital and healthcare facility IH assessments",
      "Indigenous community and remote site EHS support",
      "Film industry production safety assessments"
    ],
    image: "https://images.unsplash.com/photo-1581093458791-9d42e11b4c15?w=600&q=80"
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
              Technical Capabilities
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
            <span className="text-slate-500 font-medium">Industries We Serve:</span>
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
              How We Work With You
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
              Questions About Your Assessment Needs?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us to discuss your specific exposure assessment or regulatory compliance requirements.
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