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
    title: "Occupational Hygiene and Exposure Assessment",
    shortDesc: "Quantitative exposure characterization",
    scope: "Systematic evaluation of airborne chemical exposures through personal and area monitoring. Development of Similar Exposure Groups (SEGs) and statistical interpretation of results against applicable occupational exposure limits.",
    approach: "Apply AIHA exposure assessment strategies including initial assessment, basic characterization, and comprehensive surveys. Utilize NIOSH-validated methods and AIHA-LAP accredited laboratories. Statistical analysis follows AIHA guidance documents.",
    deliverables: [
      "SEG definitions with exposure determinants documented",
      "Personal breathing zone and area sampling data",
      "Statistical analysis of exposure distributions (95% UCL)",
      "Comparison to OSHA PELs, ACGIH TLVs, and internal OELs",
      "Exposure profile determination (well-controlled, controlled, poorly controlled, highly uncertain)",
      "Prioritized exposure control recommendations"
    ],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80"
  },
  {
    id: "noise_physical",
    icon: HardHat,
    title: "Noise and Physical Agents",
    shortDesc: "Acoustic and physical hazard assessment",
    scope: "Quantitative assessment of noise exposures, vibration, radiation (ionizing and non-ionizing), and other physical agents. Evaluation per OSHA standards and ACGIH TLVs with statistical treatment of dosimetry data.",
    approach: "Personal noise dosimetry and octave-band analysis. Area surveys using Type 1 or Type 2 sound level meters. Statistical analysis of exposure distributions. Engineering control evaluations and hearing conservation program audits.",
    deliverables: [
      "8-hour TWA noise exposure determinations",
      "Octave-band analysis for engineering control design",
      "Statistical evaluation of noise exposure variability",
      "Hearing conservation program compliance assessment",
      "Engineering and administrative control recommendations",
      "Audiometric testing oversight protocols"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
  },
  {
    id: "heat_stress",
    icon: Zap,
    title: "Heat Stress Assessment",
    shortDesc: "Thermal environment evaluation",
    scope: "Quantitative assessment of heat stress risk using WBGT measurements and metabolic heat generation estimates. Evaluation per ACGIH heat stress TLV and NIOSH criteria. Work-rest regimen development for hot environments.",
    approach: "WBGT monitoring using ISO 7243 protocols. Metabolic rate estimation per ISO 8996. Statistical analysis of peak and average exposures. Acclimatization status review. Engineering and administrative control evaluation.",
    deliverables: [
      "WBGT measurements (indoor and outdoor)",
      "Metabolic rate calculations for job tasks",
      "Comparison to ACGIH TLV for heat stress",
      "Work-rest cycle recommendations",
      "Acclimatization protocol development",
      "Heat illness prevention program guidance"
    ],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
  },
  {
    id: "iaq",
    icon: Building,
    title: "Indoor Air Quality and IEQ",
    shortDesc: "Building environment assessment",
    scope: "Systematic evaluation of indoor environmental quality including HVAC performance, contaminant sources, thermal comfort, humidity, and occupant concerns. Application of ASHRAE and EPA guidance for non-industrial settings.",
    approach: "Real-time monitoring of CO2, temperature, and relative humidity. Source identification and ventilation assessment. Comparison to ASHRAE 62.1 standards. Mold and moisture surveys using calibrated instruments. Occupant questionnaires.",
    deliverables: [
      "HVAC system assessment and airflow verification",
      "CO2 and temperature/humidity monitoring data",
      "Contaminant source identification",
      "Ventilation adequacy evaluation per ASHRAE 62.1",
      "Microbial and moisture assessment (if indicated)",
      "Prioritized remediation and maintenance recommendations"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
  },
  {
    id: "regulatory_due_diligence",
    icon: ClipboardCheck,
    title: "Regulatory Risk and Due Diligence Support",
    shortDesc: "Compliance assessment and transaction support",
    scope: "Technical review of OSHA health standard compliance, exposure monitoring records, and industrial hygiene program adequacy. Support for mergers, acquisitions, and divestitures with focus on occupational health liabilities.",
    approach: "Systematic review of regulatory applicability, exposure monitoring protocols, recordkeeping, and written program compliance. Gap analysis against OSHA standards. Historical exposure data review for potential legacy issues.",
    deliverables: [
      "OSHA health standard applicability matrix",
      "Exposure monitoring protocol compliance review",
      "Written program gap analysis (e.g., respiratory protection, HazCom)",
      "Recordkeeping adequacy assessment (29 CFR 1910.1020)",
      "Industrial hygiene liability identification",
      "Prioritized compliance roadmap with cost estimates"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
  },
  {
    id: "specialized_environments",
    icon: AlertTriangle,
    title: "Specialized or High-Sensitivity Environments",
    shortDesc: "Cleanroom, laboratory, and healthcare IH",
    scope: "Industrial hygiene support for controlled environments, research facilities, healthcare settings, and operations requiring heightened exposure controls. Includes biosafety assessments, cleanroom certification, and pharmaceutical manufacturing support.",
    approach: "Application of specialized standards (e.g., ISO 14644 for cleanrooms, CDC/NIH biosafety guidelines). Airborne viable monitoring, containment verification, and exposure assessment for potent compounds. Coordination with infection control and biosafety professionals.",
    deliverables: [
      "Cleanroom classification testing and certification support",
      "Containment verification for biological safety cabinets",
      "Exposure assessment for highly potent compounds",
      "Biosafety level adequacy evaluation",
      "Cross-contamination and carryover assessments",
      "Engineering control performance verification"
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
              { step: "01", title: "Scope", desc: "Define assessment objectives, agents of concern, and applicable standards" },
              { step: "02", title: "Assess", desc: "Conduct monitoring using validated methods and AIHA strategies" },
              { step: "03", title: "Interpret", desc: "Analyze data against OELs with statistical rigor and professional judgment" },
              { step: "04", title: "Report", desc: "Deliver decision-ready findings with defensible documentation" }
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