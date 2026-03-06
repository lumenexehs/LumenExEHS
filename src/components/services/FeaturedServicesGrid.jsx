import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Building, Leaf, HardHat, Zap, ArrowRight } from "lucide-react";

const featuredServices = [
{
  id: "iaq",
  icon: Building,
  title: "Indoor Air Quality & Mould",
  description: "Persistent odours, health complaints, or mould concerns? We investigate, test, and deliver clear findings with practical next steps.",
  color: "emerald"
},
{
  id: "occupational_hygiene",
  icon: Leaf,
  title: "Chemical & Biological Exposure",
  description: "Airborne hazards aren't always visible. We measure real exposures and benchmark them against Ontario occupational exposure limits.",
  color: "emerald"
},
{
  id: "noise_physical",
  icon: HardHat,
  title: "Noise, Radiation & Physical Agents",
  description: "Prolonged exposure causes cumulative harm. We quantify exposures, identify obligations, and recommend proportionate controls.",
  color: "emerald"
},
{
  id: "heat_ergonomics",
  icon: Zap,
  title: "Heat Stress & Ergonomics",
  description: "Heat stress and ergonomic risks often go unaddressed until an incident. We assess early and provide structured recommendations.",
  color: "emerald"
}];


export default function FeaturedServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
            Featured Services
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Our Core Assessment Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Science-based occupational hygiene assessments that translate exposure data into defensible, actionable decisions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 flex flex-col h-full">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-200 transition-colors">
                    <IconComponent className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link to={`${createPageUrl("Contact")}?service=${service.id}`} className="inline-flex items-center gap-2">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm w-full group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-6">Need help finding the right service?</p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
























































































}