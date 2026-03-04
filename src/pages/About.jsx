import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLang } from "@/components/LanguageContext";
import { t } from "@/components/translations";
import SafetyLampAnimation from "@/components/about/SafetyLampAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CommunityServiceSection from "@/components/home/CommunityServiceSection";
import ApproachSteps from "@/components/about/ApproachSteps";
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
    title: "Scientific Rigour",
    description: "Assessments grounded in AIHA methodology, ACGIH TLVs®/BEIs®, and Ontario OHS legislation — evidence-based, never assumption-driven.",
    bgImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=60"
  },
  {
    icon: Target,
    title: "Defensible Practice",
    description: "Findings and recommendations documented to withstand Ministry of Labour audit, legal scrutiny, and peer technical review.",
    bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=60"
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "Volunteer IH expertise contributed to NGOs and under-resourced workplaces — extending occupational health protection to those who need it most.",
    bgImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=60"
  },
  {
    icon: Heart,
    title: "Carer for Carers",
    description: "We support EHS managers, JHSCs, and safety officers with the data and language they need to protect workers and act decisively.",
    bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=60"
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
  const { lang } = useLang();
  const tr = t[lang].about;
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
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">{tr.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{tr.heroTitle}</h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">{tr.heroSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              {tr.tags.map(tag => (
                <span key={tag} className="bg-white/10 border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{tr.storyTitle}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{tr.storyP1}</p>
                <p>{tr.storyP2}</p>
                <p>{tr.storyP3}</p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">10+</div>
                    <div className="text-sm text-slate-500">{tr.sectorsServed}</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">19+</div>
                    <div className="text-sm text-slate-500">{tr.yearsExperience}</div>
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

      {/* Safety Lamp Metaphor Section */}
      <section className="py-20 bg-[#0F2A4A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-[#d4af7a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-5"
            >
              <span className="text-[#d4af7a] font-semibold tracking-wide uppercase text-sm">
                The Safety Lamp
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Detection Before Harm. Foresight Over Reaction.
              </h2>
              <p className="text-slate-300 leading-relaxed">
                The original miner's safety lamp was not designed for emergencies — it was designed for <em>prevention</em>. By revealing the presence of methane or the absence of oxygen through a change in flame, it transformed invisible, deadly conditions into actionable information.
              </p>
              <p className="text-slate-300 leading-relaxed">
                LumenEx EHS brings that same principle to modern workplaces. We use scientific monitoring, professional interpretation, and evidence-based guidance to turn unseen occupational health hazards into clear, manageable insight — before they cause harm to workers.
              </p>
              <div className="grid sm:grid-cols-3 gap-5 pt-4">
                {[
                  { label: "Detect", desc: "Identify hazards that are not immediately obvious" },
                  { label: "Interpret", desc: "Translate data into clear risk findings" },
                  { label: "Protect", desc: "Guide defensible, proportionate controls" }
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="text-[#d4af7a] font-bold text-lg mb-1">{item.label}</div>
                    <div className="text-slate-400 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-48 h-48">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/7fb3e8ffd_image.png"
                  alt="Miner's safety lamp"
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg border border-white/10"
                />
                {/* Flickering flame glow overlay */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 36,
                    height: 36,
                    top: "38%",
                    left: "44%",
                    background: "radial-gradient(circle, rgba(255,200,60,0.85) 0%, rgba(255,120,20,0.5) 50%, transparent 80%)",
                    filter: "blur(4px)",
                  }}
                  animate={{
                    scale: [1, 1.25, 0.95, 1.18, 1],
                    x: [0, 2, -2, 1, 0],
                    y: [0, -2, 1, -1, 0],
                    opacity: [0.85, 1, 0.75, 1, 0.85],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Outer warm glow */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 70,
                    height: 70,
                    top: "30%",
                    left: "35%",
                    background: "radial-gradient(circle, rgba(255,160,30,0.25) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                  animate={{
                    scale: [1, 1.15, 0.9, 1.1, 1],
                    opacity: [0.5, 0.8, 0.4, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <SafetyLampAnimation />
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
                className="relative bg-white rounded-xl p-8 text-center shadow-sm overflow-hidden"
              >
                {/* Light background image */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundImage: `url(${value.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.07,
                  }}
                />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">
                    {value.description}
                  </p>
                </div>
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
              How We Illuminate Workplace Risk
            </h2>
            <p className="text-lg text-slate-600">
              A four-step process to find, measure, and control workplace hazards — clearly and defensibly.
            </p>
          </motion.div>

          <ApproachSteps />
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
              Have a concern? Not sure where to start? Tell us what you're dealing with — we'll point you in the right direction.
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