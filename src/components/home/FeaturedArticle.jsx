import { motion } from "framer-motion";
import { Linkedin, ArrowRight, BookOpen } from "lucide-react";

export default function FeaturedArticle() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            Featured Article
          </span>
        </motion.div>

        <motion.a
          href="https://www.linkedin.com/posts/lumenex-ehs_ontario-has-launched-canadas-first-occupational-activity-7433200414990299136-OSy1"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-slate-100"
        >
          {/* Image */}
          <div className="lg:w-1/2 overflow-hidden">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/46e7cc829_1772212842931.png"
              alt="Ontario Launches Canada's First Occupational Exposure Registry"
              className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Linkedin className="w-5 h-5 text-[#0077B5]" />
              <span className="text-sm text-[#0077B5] font-medium">LinkedIn Article</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a3a52] mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
              Ontario Launches Canada's First Occupational Exposure Registry
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8">
              Ontario has launched Canada's first Occupational Exposure Registry, allowing workers 
              to record exposures to hazardous substances such as asbestos, lead and silica. Each 
              entry creates a secure, downloadable record that can inform prevention efforts and 
              support future medical assessments. Raising awareness and tracking exposures are key 
              to preventing occupational disease.
            </p>

            <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
              Read on LinkedIn
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}