import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "20+", label: "Years Experience" },
  { value: "150+", label: "Active Clients" }
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#0F2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}