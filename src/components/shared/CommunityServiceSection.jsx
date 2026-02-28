import { motion } from "framer-motion";
import { Heart, Users, Wind, Mic, Activity, Thermometer } from "lucide-react";

const services = [
  { icon: Wind, title: "Respirator Fit Testing", desc: "For NGOs, shelters, and community health centres." },
  { icon: Activity, title: "Indoor Air Quality", desc: "IAQ screening for under-resourced workplaces." },
  { icon: Thermometer, title: "Heat Stress Assessment", desc: "Monitoring and worker guidance for community programs." },
  { icon: Mic, title: "Health & Safety Training", desc: "Practical OHS sessions for community workers and volunteers." },
  { icon: Users, title: "JHSC Support", desc: "Technical guidance for safety committees at non-profits." },
  { icon: Heart, title: "Pro-Bono Consultations", desc: "Free consultations for Indigenous communities, shelters, and charities." }
];

export default function CommunityServiceSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
          alt="Community service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-emerald-300 font-semibold tracking-wide uppercase text-sm">
            🍁 Giving Back to Canada
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            Pro Bono for Organizations That Need It
          </h2>
          <p className="text-emerald-100 leading-relaxed">
            Every worker deserves a safe environment — regardless of budget. Free and reduced-fee services for Ontario NGOs, shelters, and communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex gap-4"
            >
              <div className="w-11 h-11 bg-emerald-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <service.icon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1 text-sm">{service.title}</h3>
                <p className="text-emerald-200 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-emerald-200 text-sm">
            Is your organization in need?{" "}
            <a href="mailto:info@lumenexehs.ca" className="text-white font-medium hover:underline">
              Contact info@lumenexehs.ca
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}