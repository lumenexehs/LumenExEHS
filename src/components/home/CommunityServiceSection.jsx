import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Heart, Wind, Ear, Thermometer, FlaskConical, ArrowRight } from "lucide-react";

// --- Fit-Testing Animation ---
function FitTestAnim({ active }) {
  return (
    <div className="flex flex-col items-center gap-2 h-20 justify-center">
      <div className="relative flex items-center justify-center">
        {/* Face outline */}
        <div className="w-10 h-12 rounded-t-full rounded-b-lg border-2 border-slate-300 bg-slate-50 relative flex items-end justify-center pb-1">
          {/* Mask */}
          <motion.div
            className="w-8 h-5 bg-emerald-400 rounded-lg opacity-80"
            animate={active ? { scaleY: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Seal check pulses */}
          {["-left-3", "-right-3"].map((side, i) => (
            <motion.div
              key={i}
              className={`absolute top-1 ${side} w-2 h-2 rounded-full bg-emerald-300`}
              animate={active ? { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] } : {}}
              transition={{ delay: i * 0.4, duration: 1.2, repeat: Infinity }}
            />
          ))}
        </div>
        {/* Air flow arrows */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
          animate={active ? { y: [0, -4, 0], opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-0.5 h-3 bg-emerald-400 rounded" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-emerald-400" />
        </motion.div>
      </div>
      <p className="text-xs text-slate-500 text-center">Ensuring a tight seal — before it matters most.</p>
    </div>
  );
}

// --- IAQ Animation ---
function IAQAnim({ active }) {
  return (
    <div className="flex flex-col items-center gap-2 h-20 justify-center">
      <div className="relative w-full flex justify-center items-end gap-3 h-12">
        {/* Room outline */}
        <div className="relative w-20 h-10 border-2 border-slate-300 rounded bg-blue-50 flex items-end justify-around px-1">
          {/* CO2 particles */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              animate={active ? {
                y: [0, -14, -28],
                opacity: [0, 1, 0],
                x: [0, (i - 1) * 4, (i - 1) * 6]
              } : { opacity: 0 }}
              transition={{ delay: i * 0.5, duration: 1.8, repeat: Infinity }}
            />
          ))}
        </div>
        {/* Meter reading */}
        <div className="flex flex-col items-center">
          <motion.div
            className="text-xs font-bold text-emerald-600 tabular-nums"
            animate={active ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            CO₂
          </motion.div>
          <motion.div
            className="text-xs font-bold text-slate-700"
            animate={active ? {} : {}}
          >
            820 ppm
          </motion.div>
          <div className="w-6 h-1.5 bg-slate-100 rounded-full mt-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400 rounded-full"
              animate={active ? { width: ["30%", "55%", "30%"] } : { width: "30%" }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center">Monitoring air quality in shelters and clinics.</p>
    </div>
  );
}

// --- Noise Screening Animation ---
function NoiseAnim({ active }) {
  const bars = [3, 6, 8, 5, 9, 4, 7, 6];
  return (
    <div className="flex flex-col items-center gap-2 h-20 justify-center">
      <div className="flex items-end gap-0.5 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-2.5 rounded-t"
            style={{ background: h > 6 ? "#f87171" : "#34d399" }}
            animate={active ? {
              height: [h * 3, h * 5, h * 2, h * 4, h * 3],
            } : { height: h * 3 }}
            transition={{ delay: i * 0.1, duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center">Sound level survey — no formal OHS program required.</p>
    </div>
  );
}

// --- Heat Stress Animation ---
function HeatAnim({ active }) {
  return (
    <div className="flex flex-col items-center gap-2 h-20 justify-center">
      <div className="flex items-center gap-4">
        {/* Thermometer */}
        <div className="relative flex flex-col items-center">
          <div className="w-3 h-14 border-2 border-orange-300 rounded-full bg-orange-50 relative overflow-hidden flex items-end justify-center">
            <motion.div
              className="w-1.5 bg-red-500 rounded-full"
              animate={active ? { height: ["40%", "75%", "55%", "80%", "40%"] } : { height: "40%" }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-orange-300 -mt-1" />
        </div>
        {/* WBGT readout */}
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">WBGT</span>
          <motion.span
            className="text-xl font-bold text-orange-500 tabular-nums"
            animate={active ? { opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            29°C
          </motion.span>
          <span className="text-xs font-medium text-red-500">⚠ Action Level</span>
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center">WBGT screening for outdoor workers and volunteers.</p>
    </div>
  );
}

const volunteerServices = [
  { icon: Wind,         title: "Fit-Testing",            Anim: FitTestAnim },
  { icon: FlaskConical, title: "Indoor Air Quality (IAQ)", Anim: IAQAnim },
  { icon: Ear,          title: "Noise Screening",         Anim: NoiseAnim },
  { icon: Thermometer,  title: "Heat Stress Awareness",   Anim: HeatAnim },
];

const eligibleOrgs = [
  "NGOs & Charitable Organizations",
  "Healthcare & Long-Term Care",
  "Labour Unions",
  "Indigenous Community Organizations",
  "Shelters & Social Services",
  "Faith-Based Institutions"
];

function ServiceCard({ service, index }) {
  const [active, setActive] = useState(false);
  useEffect(() => { setActive(true); }, []);
  const { Anim } = service;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100"
    >
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
        <service.icon className="w-6 h-6 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{service.title}</h3>
      <Anim active={active} />
    </motion.div>
  );
}

export default function CommunityServiceSection() {
  return (
    <section className="py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            Community Service Program
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Giving Back: Pro Bono IH Services
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            LumenEx EHS periodically offers volunteer occupational hygiene services to under-resourced 
            organizations — because protecting workers shouldn't depend on the size of a budget. 
            If your organization could benefit, we'd like to hear from you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {volunteerServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Eligible Orgs + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-10"
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Who Can Apply?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {eligibleOrgs.map((org) => (
                <div key={org} className="flex items-center gap-2 text-slate-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  {org}
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4 italic">
              Availability is limited and subject to scheduling. Priority given to organizations 
              serving vulnerable workers or communities with limited OHS resources.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to={createPageUrl("Contact") + "?service=general"}>
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-base rounded-full group"
              >
                Express Interest
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-slate-400 text-xs text-center mt-3">No cost. No obligation.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}