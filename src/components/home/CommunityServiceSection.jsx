import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Heart, Wind, Ear, Thermometer, FlaskConical, ArrowRight } from "lucide-react";

const volunteerServices = [
  {
    icon: Wind,
    title: "Fit-Testing",
    description: "Quantitative and qualitative respirator fit-testing for frontline workers — ensuring respiratory protection programs are effective before it matters most."
  },
  {
    icon: FlaskConical,
    title: "Indoor Air Quality (IAQ)",
    description: "Walkthrough assessments and basic monitoring for CO₂, VOCs, and ventilation adequacy in community centres, shelters, clinics, and faith-based facilities."
  },
  {
    icon: Ear,
    title: "Noise Screening",
    description: "Noise level surveys and hearing conservation awareness for environments where workers are exposed to elevated sound levels without formal OHS programs."
  },
  {
    icon: Thermometer,
    title: "Heat Stress Awareness",
    description: "WBGT-based heat stress screening and education for outdoor community workers, volunteers, and organizations operating in warm-season environments."
  }
];

const eligibleOrgs = [
  "NGOs & Charitable Organizations",
  "Healthcare & Long-Term Care",
  "Labour Unions",
  "Indigenous Community Organizations",
  "Shelters & Social Services",
  "Faith-Based Institutions"
];

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
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
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