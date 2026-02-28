import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Exposure Assessment",
    description: "Measure what workers breathe, touch, and hear — clear risk findings backed by science.",
    image: "https://images.unsplash.com/photo-1581093458791-9d36cae56b90?w=600&q=80",
    color: "#1a3a52"
  },
  {
    title: "Noise & Physical Hazards",
    description: "Noise dosimetry, vibration, and radiation surveys to protect your team.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
    color: "#d4af7a"
  },
  {
    title: "Heat Stress & Ergonomics",
    description: "Identify heat risk and repetitive strain before workers get hurt.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80",
    color: "#1a3a52"
  },
  {
    title: "Indoor Air Quality",
    description: "Track down odours, mould, radon, and air complaints at the source.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    color: "#d4af7a"
  },
  {
    title: "EH&S Programs & Policies",
    description: "Written safety programs and compliance frameworks your organization actually needs.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    color: "#1a3a52"
  },
  {
    title: "Training & Risk Assessment",
    description: "Practical safety training for workers, supervisors, and JHSCs across Ontario.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    color: "#d4af7a"
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#d4af7a] font-medium tracking-wide text-sm italic">
            Serving Ontario Workplaces
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mt-3 mb-3">
            What We Do
          </h2>
          <p className="text-slate-500">
            From factories and hospitals to schools and construction sites — we protect Ontario workers.
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
            >
              <Link
                to={createPageUrl("Services")}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-semibold text-lg drop-shadow">
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-[#d4af7a] font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}