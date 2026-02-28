import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Award, 
  Users, 
  Target, 
  Heart,
  CheckCircle,
  ArrowRight,
  Building2,
  Shield
} from "lucide-react";
import CommunityServiceSection from "@/components/shared/CommunityServiceSection";
import CredentialsBadges from "@/components/shared/CredentialsBadges";

const team = [
  {
    name: "Dr. Robert Harrison, CIH",
    role: "Principal Industrial Hygienist",
    bio: "Board Certified Industrial Hygienist, 25+ years in exposure assessment and occupational health",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
  },
  {
    name: "Emily Rodriguez, CSP, CIH",
    role: "Senior Industrial Hygienist",
    bio: "Specializes in chemical exposure assessment, respiratory protection, and hazard evaluation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  },
  {
    name: "James Thompson, MS, CIH",
    role: "Industrial Hygiene Scientist",
    bio: "Expertise in noise and vibration assessment, ergonomics, and physical agent monitoring",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Lisa Chen, MPH",
    role: "Occupational Health Specialist",
    bio: "Focus on exposure data interpretation, statistical analysis, and regulatory compliance",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  }
];

const values = [
  {
    icon: Shield,
    title: "Scientific Rigour",
    description: "Every assessment applies the AREC model — Anticipation, Recognition, Evaluation, and Control — grounded in AIHA methodology, ACGIH TLVs®/BEIs®, Ontario OHS legislation, and current peer-reviewed IH science."
  },
  {
    icon: Target,
    title: "Defensible Practice",
    description: "Findings, exposure profiles, and control recommendations are documented to withstand Ministry of Labour audit, legal scrutiny, and peer technical review — evidence-based, never assumption-driven."
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "We contribute volunteer IH expertise to NGOs, charitable organizations, and under-resourced workplaces — extending occupational health protection beyond those who can afford it."
  },
  {
    icon: Heart,
    title: "Carer for Carers",
    description: "We exist to support the professionals responsible for worker health — EHS managers, JHSCs, nursing supervisors, safety officers — giving them the data and language they need to act decisively."
  }
];

const certifications = [
  "Certified Industrial Hygienist (CIH)",
  "Certified Safety Professional (CSP)",
  "Canadian Registered Safety Professional (CRSP)",
  "Ontario OHS Legislation",
  "CSA Standards",
  "ACGIH TLVs® Methods"
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F2A4A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Occupational Hygiene & EHS Consulting Across Ontario
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              LumenEx EHS brings over 19 years of field experience in industrial hygiene and environmental 
              health to Ontario employers — translating complex exposure data into clear, defensible 
              risk decisions that protect workers and strengthen organizational due diligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  LumenEx EHS is an independent occupational hygiene and EHS consulting practice 
                  serving Ontario employers across a broad range of sectors — from construction 
                  and manufacturing to acute care, pharmaceutical production, film, 
                  Indigenous communities, and educational institutions.
                </p>
                <p>
                  Our practice is built on the industrial hygiene anticipation-recognition-evaluation-control 
                  (AREC) model. Every engagement — whether a single-agent exposure assessment or a 
                  multi-site EHS program review — is grounded in Ontario OHS legislation, CSA standards, 
                  ACGIH TLVs®/BEIs®, and current peer-reviewed occupational hygiene science.
                </p>
                <p>
                  We believe the credibility of an assessment is only as strong as the science behind it. 
                  That commitment extends beyond client work: we actively contribute volunteer IH expertise 
                  to community organizations and NGOs, and support pro-bono health and safety initiatives 
                  for under-resourced workplaces.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">10+</div>
                    <div className="text-sm text-slate-500">Sectors Served</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">19+</div>
                    <div className="text-sm text-slate-500">Years of Field Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">19+</div>
                <div className="text-emerald-100">Years of Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              Our Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              How We Make the Invisible Visible
            </h2>
            <p className="text-lg text-slate-600">
              A structured, science-based approach to detecting, measuring, and controlling what cannot be seen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Anticipate & Recognize", desc: "Baseline walkthrough and process review to identify exposure determinants, operational variability, and existing control gaps — before any instrument is deployed." },
              { step: "02", title: "Design & Evaluate", desc: "SEG-based measurement strategies targeting the upper tail of the exposure distribution. Sampling for personal breathing zone (PBZ) and area concentrations benchmarked against OELs and ACGIH TLVs®." },
              { step: "03", title: "Analyse & Interpret", desc: "Bayesian statistical methods (IHDataAnalyst, IHSTAT) and AIHA exposure banding to quantify uncertainty, characterize exposure profiles, and produce findings that hold up to regulatory and legal scrutiny." },
              { step: "04", title: "Control & Communicate", desc: "Hierarchy-of-controls recommendations written for the people who implement them — workers, supervisors, JHSCs, and leadership — practical, proportionate, and operationally realistic." }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-slate-100"
              >
                <div className="text-4xl font-bold text-emerald-100 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-[#0F2A4A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Credentials & Standards
            </h2>
            <p className="text-slate-400 mb-10">
              Professional certifications and recognized Canadian standards
            </p>
            <CredentialsBadges dark />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-lg p-4 text-center"
              >
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Service Section */}
      <CommunityServiceSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Let's Bring Clarity to Your Workplace
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Contact us to discuss your occupational hygiene, EHS program, or regulatory compliance needs across Ontario.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group"
              >
                Request Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}