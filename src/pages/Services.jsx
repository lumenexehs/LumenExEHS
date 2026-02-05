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
  Building
} from "lucide-react";

const services = [
  {
    id: "environmental_audit",
    icon: Leaf,
    title: "Exposure Assessment",
    shortDesc: "Quantitative exposure characterization",
    description: "Systematic exposure assessment using AIHA strategies to characterize worker exposures and compare against applicable occupational exposure limits (OELs).",
    features: [
      "Similar Exposure Group (SEG) development",
      "Personal and area air sampling",
      "Statistical analysis per AIHA guidelines",
      "Comparison to OSHA PELs, ACGIH TLVs, and other OELs",
      "Exposure profile determination and documentation"
    ],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80"
  },
  {
    id: "safety_assessment",
    icon: HardHat,
    title: "Occupational Hygiene Surveys",
    shortDesc: "Comprehensive workplace evaluations",
    description: "Systematic industrial hygiene surveys to identify, evaluate, and document chemical, physical, and biological hazards in the workplace.",
    features: [
      "Baseline and comprehensive surveys",
      "Process hazard characterization",
      "Ventilation assessment and verification",
      "Control effectiveness evaluation",
      "Prioritized findings and technical recommendations"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
  },
  {
    id: "compliance_review",
    icon: ClipboardCheck,
    title: "Regulatory Compliance Support",
    shortDesc: "OSHA and EPA regulatory analysis",
    description: "Technical review of regulatory requirements with gap analysis and documentation support for OSHA health standards and EPA requirements.",
    features: [
      "OSHA health standard applicability review",
      "Written program gap analysis",
      "Exposure monitoring protocol development",
      "Recordkeeping compliance verification",
      "Regulatory interpretation and guidance"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Technical Training",
    shortDesc: "Evidence-based occupational health training",
    description: "Technical training on industrial hygiene principles, exposure controls, and hazard recognition based on current science and regulatory requirements.",
    features: [
      "Respiratory protection and fit testing",
      "Hearing conservation program training",
      "Hazard communication per GHS/HazCom",
      "PPE selection and use criteria",
      "Exposure control hierarchy principles"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
  },
  {
    id: "risk_assessment",
    icon: AlertTriangle,
    title: "Health Hazard Evaluation",
    shortDesc: "Systematic hazard characterization",
    description: "Comprehensive health hazard evaluations to identify agents of concern, characterize exposure potential, and assess risk relative to occupational exposure limits.",
    features: [
      "Chemical hazard identification and inventory",
      "Exposure pathway analysis",
      "Qualitative and quantitative risk characterization",
      "Control banding applications",
      "Prioritized control recommendations"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
  },
  {
    id: "permit_assistance",
    icon: FileCheck,
    title: "Written Program Development",
    shortDesc: "Regulatory-compliant program documentation",
    description: "Development and review of written health and safety programs to meet OSHA regulatory requirements and industry best practices.",
    features: [
      "Respiratory protection programs (29 CFR 1910.134)",
      "Hearing conservation programs (29 CFR 1910.95)",
      "Hazard communication programs (29 CFR 1910.1200)",
      "Substance-specific compliance programs",
      "Medical surveillance protocol support"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
  }
];

const industries = [
  { icon: Factory, name: "Manufacturing" },
  { icon: Zap, name: "Energy & Utilities" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Building, name: "Construction" }
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
              Industrial Hygiene Services
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Scientifically rigorous exposure assessment, monitoring, and interpretation 
              services aligned with OSHA, NIOSH, and AIHA standards.
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
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

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