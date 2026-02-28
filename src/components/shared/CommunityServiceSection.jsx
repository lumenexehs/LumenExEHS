import { motion } from "framer-motion";
import { Heart, Users, Wind, Mic, Activity, Thermometer } from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "Respirator Fit Testing",
    desc: "Quantitative and qualitative fit testing for frontline workers at NGOs, shelters, and community health centres."
  },
  {
    icon: Activity,
    title: "Indoor Air Quality",
    desc: "IAQ screening for community organizations, places of worship, and under-resourced workplaces concerned about air quality."
  },
  {
    icon: Thermometer,
    title: "Heat Stress Assessment",
    desc: "Heat stress monitoring and worker guidance for outdoor and indoor community programs during high-heat periods."
  },
  {
    icon: Mic,
    title: "Health & Safety Training",
    desc: "Practical OHS awareness sessions for union members, community workers, and healthcare volunteers."
  },
  {
    icon: Users,
    title: "JHSC Support",
    desc: "Technical guidance for Joint Health and Safety Committees at non-profit organizations who lack access to IH expertise."
  },
  {
    icon: Heart,
    title: "Pro-Bono Consultations",
    desc: "Complimentary consultations for Indigenous communities, shelters, and charitable organizations facing pressing health and safety concerns."
  }
];

export default function CommunityServiceSection() {
  return (
    <section className="py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            Community Service
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Giving Back Through Occupational Hygiene
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We believe every worker deserves protection — regardless of their employer's budget. 
            LumenEx EHS periodically offers pro-bono and reduced-fee IH services to NGOs, unions, 
            healthcare organizations, and community groups across Ontario.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 flex gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <service.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            Is your organization in need? <a href="mailto:info@lumenexehs.ca" className="text-emerald-600 font-medium hover:underline">Contact us at info@lumenexehs.ca</a> to discuss how we can help.
          </p>
        </motion.div>
      </div>
    </section>
  );
}