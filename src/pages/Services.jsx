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
    title: "Environmental Audits",
    shortDesc: "Comprehensive environmental assessments",
    description: "Our environmental audits provide thorough evaluations of your operations to ensure regulatory compliance and identify opportunities for improvement.",
    features: [
      "Multi-media compliance assessments",
      "Air, water, and waste management reviews",
      "ISO 14001 gap analysis and certification support",
      "Environmental management system development",
      "Sustainability program recommendations"
    ],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80"
  },
  {
    id: "safety_assessment",
    icon: HardHat,
    title: "Safety Assessments",
    shortDesc: "Workplace safety evaluations",
    description: "Protect your workforce with comprehensive safety assessments that identify hazards, evaluate risks, and provide actionable recommendations.",
    features: [
      "Job hazard analysis (JHA)",
      "Workplace safety inspections",
      "OSHA compliance evaluations",
      "Safety program development",
      "Incident investigation and root cause analysis"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
  },
  {
    id: "compliance_review",
    icon: ClipboardCheck,
    title: "Compliance Reviews",
    shortDesc: "Regulatory compliance analysis",
    description: "Navigate complex regulations with confidence. Our compliance reviews ensure you meet all federal, state, and local requirements.",
    features: [
      "Multi-jurisdictional regulatory analysis",
      "Permit compliance verification",
      "Regulatory change management",
      "Compliance calendar development",
      "Agency liaison support"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "EHS Training",
    shortDesc: "Customized safety training programs",
    description: "Build a culture of safety with our comprehensive training programs tailored to your industry and workforce needs.",
    features: [
      "OSHA 10 & 30-hour courses",
      "Hazard communication training",
      "Emergency response procedures",
      "Confined space entry certification",
      "Custom training program development"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
  },
  {
    id: "risk_assessment",
    icon: AlertTriangle,
    title: "Risk Assessment",
    shortDesc: "Systematic hazard identification",
    description: "Proactively identify and mitigate risks before they become incidents with our systematic risk assessment methodologies.",
    features: [
      "Process hazard analysis (PHA)",
      "Quantitative risk assessments",
      "Bow-tie analysis",
      "Risk matrix development",
      "Risk mitigation planning"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
  },
  {
    id: "permit_assistance",
    icon: FileCheck,
    title: "Permit Assistance",
    shortDesc: "Permitting process navigation",
    description: "Streamline your permitting process with expert guidance on applications, renewals, and compliance documentation.",
    features: [
      "Air quality permit applications",
      "Wastewater discharge permits",
      "Stormwater management plans",
      "Hazardous waste permits",
      "Construction permit support"
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Comprehensive EHS Solutions
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              From environmental compliance to workplace safety, we provide end-to-end 
              consulting services tailored to your industry's unique challenges.
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
                      Request This Service
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
              { step: "01", title: "Discover", desc: "Initial consultation to understand your needs and challenges" },
              { step: "02", title: "Assess", desc: "Comprehensive evaluation of your current EHS status" },
              { step: "03", title: "Plan", desc: "Develop tailored strategies and actionable recommendations" },
              { step: "04", title: "Implement", desc: "Execute solutions with ongoing support and guidance" }
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
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a free consultation and we'll help you identify the right solutions for your organization.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group"
              >
                Schedule a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}