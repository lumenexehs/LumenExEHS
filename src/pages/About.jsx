import { motion } from "framer-motion";
import SafetyLampAnimation from "@/components/about/SafetyLampAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CommunityServiceSection from "@/components/home/CommunityServiceSection";
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
    description: "Assessments grounded in AIHA methodology, ACGIH TLVs®/BEIs®, and Ontario OHS legislation — evidence-based, never assumption-driven."
  },
  {
    icon: Target,
    title: "Defensible Practice",
    description: "Findings and recommendations documented to withstand Ministry of Labour audit, legal scrutiny, and peer technical review."
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "Volunteer IH expertise contributed to NGOs and under-resourced workplaces — extending occupational health protection to those who need it most."
  },
  {
    icon: Heart,
    title: "Carer for Carers",
    description: "We support EHS managers, JHSCs, and safety officers with the data and language they need to protect workers and act decisively."
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
              About LumenEx EHS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Making Invisible Hazards Visible
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              LumenEx EHS is an independent occupational hygiene and EHS consulting practice based in Ontario — 
              built on 19+ years of field experience and a single guiding purpose: 
              revealing what can't be seen, measured, or managed without the right expertise.
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
                Our Purpose — and Our Name
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Before modern gas detectors existed, miners carried a safety lamp — a carefully engineered tool that did more than provide light. It detected hazardous gases and oxygen-depleted air that were completely invisible to the human eye. A change in the flame was an early warning signal, a way to reveal unseen danger before it became tragedy.
                </p>
                <p>
                  That is the metaphor behind LumenEx EHS. Our work is to <span className="font-semibold text-slate-800">light the environment</span> — to detect, measure, and interpret workplace hazards that most people cannot see, smell, or feel until it is too late. Chemical exposures, noise, heat, contaminated air, biological agents: the risks that silently accumulate over time.
                </p>
                <p>
                  We work with employers in manufacturing, construction, healthcare, education, and the public sector — helping them anticipate risk rather than react to incidents, using science, monitoring, and professional judgement to protect their workers.
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
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                  alt="Safety lamp concept — illuminating hidden hazards"
                  className="rounded-2xl shadow-2xl w-full max-w-xs object-cover"
                  style={{ minHeight: "320px" }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0F2A4A]/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-center">
                  <p className="text-[#d4af7a] font-semibold text-sm italic">
                    "Light the environment.<br />Reveal what cannot be seen."
                  </p>
                </div>
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
              How We Illuminate Workplace Risk
            </h2>
            <p className="text-lg text-slate-600">
              A four-step process to find, measure, and control workplace hazards — clearly and defensibly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Anticipate & Recognize", desc: "Walk the workplace, understand the work, and identify what could be harming workers — before taking any measurements." },
              { step: "02", title: "Design & Evaluate", desc: "Design a targeted sampling strategy that captures real exposure levels for the workers most at risk." },
              { step: "03", title: "Analyse & Interpret", desc: "Turn monitoring data into clear exposure profiles — with a risk verdict you can act on and defend." },
              { step: "04", title: "Control & Communicate", desc: "Provide practical, ranked recommendations in plain language — for workers, supervisors, and safety committees." }
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
            Have a workplace health concern? Not sure where to start? Reach out — we'll point you in the right direction.
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