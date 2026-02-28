import { motion } from "framer-motion";

const scenes = [
  {
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    label: "Manufacturing"
  },
  {
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80",
    label: "Healthcare"
  },
  {
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
    label: "Construction"
  },
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    label: "Education"
  }
];

export default function CanadaSceneStrip() {
  return (
    <section className="py-0">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {scenes.map((scene, index) => (
          <motion.div
            key={scene.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative h-48 md:h-64 overflow-hidden group"
          >
            <img
              src={scene.image}
              alt={scene.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#0F2A4A]/50 group-hover:bg-[#0F2A4A]/30 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white font-semibold text-sm tracking-wide">
                {scene.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="bg-[#0F2A4A] text-center py-4">
        <p className="text-[#d4af7a] text-sm font-medium tracking-widest uppercase">
          🍁 Protecting Ontario Workers — Across Every Industry
        </p>
      </div>
    </section>
  );
}