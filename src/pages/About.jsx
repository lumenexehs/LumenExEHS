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
    title: "Scientific Rigor",
    description: "All assessments follow Canadian OHS legislation, CSA standards, ACGIH TLVs®, and international occupational hygiene research."
  },
  {
    icon: Target,
    title: "Defensibility",
    description: "Documentation and conclusions that withstand technical and regulatory scrutiny — grounded in evidence, not guesswork."
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "Beyond consulting, we contribute volunteer expertise to NGOs and community groups, and support pro-bono safety initiatives."
  },
  {
    icon: Heart,
    title: "Carer for Carers",
    description: "Dedicated to those responsible for worker health and safety — providing the clarity needed to protect people effectively."
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
              Since 2005, LumenEx Environmental Health & Safety Consulting Inc. has helped public, 
              private, and non-profit organizations across Ontario replace workplace uncertainty 
              with defensible data and practical protection strategies.
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
                  LumenEx EHS is an occupational hygiene and EHS consulting firm serving 
                  a diverse range of clients across Ontario — from construction projects and 
                  manufacturing facilities to hospitals, Indigenous communities, educational 
                  institutions, and residential property managers.
                </p>
                <p>
                  We deliver defensible exposure assessments, regulatory compliance support, 
                  and practical risk control solutions that make invisible health hazards visible. 
                  Our work is grounded in Canadian OHS legislation, CSA standards, ACGIH TLVs®, 
                  and international occupational hygiene research.
                </p>
                <p>
                  Beyond professional consulting, we actively contribute volunteer expertise 
                  to community groups and NGOs, and collaborate with charitable organizations 
                  through pro-bono initiatives and community-focused partnerships.
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
                    <div className="text-2xl font-bold text-slate-900">20+</div>
                    <div className="text-sm text-slate-500">Years of Practice</div>
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
                <div className="text-3xl font-bold">20+</div>
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
              { step: "01", title: "Hazard Screening & Prioritization", desc: "Field instrumentation, walkthrough assessments, exposure modelling, and AI-supported analytics to identify high-risk priorities — replacing guesswork with measurable data." },
              { step: "02", title: "Strategic Sampling & SEG Design", desc: "Similar Exposure Group frameworks ensuring representativeness across heat stress, noise, dust, silica, chemicals, and indoor air — with integrated, cost-effective campaigns." },
              { step: "03", title: "Data Amplification & Predictive Insight", desc: "Advanced statistical methods including Bayesian analysis to interpret datasets, quantify uncertainty, forecast risk, and strengthen regulatory defensibility." },
              { step: "04", title: "Translating Science into Action", desc: "Complex findings translated into practical language for workers, supervisors, JHSCs, and leadership — with hierarchy-of-control aligned, operationally realistic recommendations." }
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
            <p className="text-slate-400">
              Professional certifications and recognized Canadian standards
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
              Discuss Your Assessment Needs
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Contact us to discuss your exposure assessment or industrial hygiene requirements.
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