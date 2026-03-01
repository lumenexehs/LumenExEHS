import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Shield, CheckCircle, Home, Factory, Building2, HeartPulse, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
{ icon: Home, label: "Homeowners", desc: "Mould, radon, air quality" },
{ icon: Factory, label: "Businesses", desc: "Food, furniture, fabrication" },
{ icon: Building2, label: "Facility Managers", desc: "Buildings & properties" },
{ icon: HeartPulse, label: "Public Sector", desc: "Hospitals, schools, police" },
{ icon: Users, label: "NGOs", desc: "Volunteer IH support" }];


const benefits = [
{ icon: Shield, text: "Cost-effective solutions — no unnecessary work" },
{ icon: CheckCircle, text: "Legal compliance with Ontario OHS law" },
{ icon: ArrowRight, text: "Practical, proportionate recommendations" },
{ icon: Calendar, text: "Clear findings you can act on immediately" }];


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Occupational health and safety"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/95 via-[#0F2A4A]/90 to-[#0F2A4A]/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.08, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-[#d4af7a]" />
          <span className="text-[#d4af7a] font-medium text-sm tracking-wide">🍁 Ontario-Based · CIH-Led · 19+ Years Experience</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
          Making Invisible Hazards Visible —
          <span className="block text-[#d4af7a] mt-1">Before They Cause Harm</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-slate-300 mb-8 max-w-xl">
          Independent occupational hygiene &amp; EHS consulting — for homes, businesses, facilities, and public sector across Ontario.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 gap-2 mb-10 max-w-lg">
          {benefits.map((b, i) =>
          <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
              <b.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{b.text}</span>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-14">
          <Link to={`${createPageUrl("Contact")}?service=general`}>
            <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 py-6 text-base rounded-full group">
              📅 Book a Free 30-Min Consult
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" variant="outline" className="bg-cyan-600 text-white px-8 py-6 text-base font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-10 border-white/30 hover:bg-white/10">
              Get an Assessment Quote
            </Button>
          </Link>
        </motion.div>

        {/* Audience tiles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap gap-3">
          <span className="text-slate-500 text-xs self-center mr-1">Who we help →</span>
          {audiences.map((a) =>
          <div key={a.label} className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-1.5">
              <a.icon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white text-xs font-medium">{a.label}</span>
              <span className="text-slate-400 text-xs hidden sm:inline">· {a.desc}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

}