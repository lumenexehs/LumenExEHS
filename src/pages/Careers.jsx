import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Award, Zap } from "lucide-react";
import { useLang } from "@/components/LanguageContext";
import { t } from "@/components/translations";

const openings = [
  {
    title: "Sales Representative",
    type: "Part-Time",
    location: "Toronto, ON (Hybrid)",
    summary: "Help grow LumenEx EHS by identifying new client opportunities, building relationships, and communicating the value of our occupational hygiene and EHS services to prospective clients.",
    requirements: [
      "Proven experience in B2B sales or business development",
      "Excellent interpersonal and communication skills",
      "Self-motivated with strong follow-through",
      "Interest in occupational health & safety sector is an asset"
    ]
  },
  {
    title: "Digital Marketing Specialist",
    type: "Part-Time",
    location: "Remote / Toronto, ON",
    summary: "Drive online presence and lead generation for LumenEx EHS through content creation, SEO, social media, and digital campaigns tailored to the EHS and occupational hygiene space.",
    requirements: [
      "Experience managing social media accounts and content calendars",
      "Familiarity with SEO, Google Analytics, and email marketing tools",
      "Strong writing skills with ability to translate technical topics accessibly",
      "Portfolio of previous digital marketing work preferred"
    ]
  }
];

const perks = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Work with CIHs and safety professionals who care. Learn from the best."
  },
  {
    icon: Award,
    title: "Grow Your Career",
    description: "CIH/CSP/CRSP exam support, conference access, and continuing education."
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Pro bono IH work for NGOs and under-resourced communities — real impact."
  },
  {
    icon: Zap,
    title: "Diverse Projects",
    description: "Homes, hospitals, factories, schools — no two projects are the same."
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0F2A4A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-[#d4af7a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Work That Matters
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              Small team. Real impact. Every project protects someone's health.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Part-Time Roles", "Flexible & Remote-Friendly", "Mission-Driven"].map(tag => (
                <span key={tag} className="bg-white/10 border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Why LumenEx</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-2">Why Join Us</h2>
            <p className="text-slate-500">Real work. Expert mentorship. Community impact.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-7 shadow-sm border border-slate-100 text-center"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Open Roles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Current Openings</h2>
            <p className="text-slate-500 mt-3 text-sm">Part-time · Flexible · Ontario</p>
          </motion.div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                    </div>
                    <p className="text-slate-600 mb-5">{job.summary}</p>
                    <ul className="space-y-1.5">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:flex-shrink-0">
                    <Link to={`${createPageUrl("Contact")}?service=general`}>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 group">
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application CTA */}
      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase className="w-12 h-12 text-emerald-400 mx-auto mb-5" />
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-slate-300 mb-8">
              Send your CV and a note to{" "}
              <a href="mailto:info@lumenexehs.ca" className="text-emerald-400 hover:text-emerald-300 underline">
                info@lumenexehs.ca
              </a>
              {" "}— we're always open to meeting driven people.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full px-8 group">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}