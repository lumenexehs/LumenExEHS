import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Their environmental audit team helped us achieve ISO 14001 certification ahead of schedule. Exceptional expertise and professionalism.",
    author: "Sarah Mitchell",
    role: "VP of Operations",
    company: "Pacific Manufacturing Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    quote: "The safety training program they developed reduced our incident rate by 60%. Best investment we've made in workplace safety.",
    author: "Michael Chen",
    role: "HSE Director",
    company: "Coastal Energy Group",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    quote: "Navigating EPA regulations felt impossible until we partnered with them. Their compliance expertise is unmatched.",
    author: "Jennifer Adams",
    role: "Environmental Manager",
    company: "Sterling Chemicals",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-slate-600">
            See how we've helped organizations transform their EHS programs and achieve measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-8 relative"
            >
              <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                  <div className="text-sm text-emerald-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}