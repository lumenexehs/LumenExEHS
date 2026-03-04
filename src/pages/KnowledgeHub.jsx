import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { t } from "@/components/translations";
import { createPageUrl } from "@/utils";
import { ArrowRight, Wind, FlaskConical, Building2, HeartPulse, ShieldCheck, Users, BookOpen } from "lucide-react";
import { articles } from "@/components/home/KnowledgeHub";

const topics = [
  { id: "all", label: "All Topics", icon: BookOpen },
  { id: "indoor-air", label: "Indoor Air", icon: Wind },
  { id: "exposure", label: "Industrial Exposure", icon: FlaskConical },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "compliance", label: "Compliance", icon: ShieldCheck },
  { id: "community", label: "Community", icon: Users },
];

export default function KnowledgeHub() {
  const [activeTopic, setActiveTopic] = useState("all");

  const filtered = activeTopic === "all"
    ? articles
    : articles.filter((a) => a.topic === activeTopic);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0F2A4A] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">EHS Knowledge Hub</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Expert Guidance for Ontario Workplaces
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Science-based articles written for EHS managers, safety officers, and employers — clear, practical, and regulatory-grounded.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Topic Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeTopic === t.id
                    ? "bg-[#0F2A4A] text-white border-[#0F2A4A]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-slate-400 text-sm py-20 text-center">No articles in this topic yet — check back soon.</p>
          )}

          {/* Article Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <a
                  href={article.externalUrl || createPageUrl(`Article?id=${article.id}`)}
                  target={article.externalUrl ? "_blank" : "_self"}
                  rel={article.externalUrl ? "noopener noreferrer" : undefined}
                  className="group block rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {article.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{article.date} · {article.readTime}</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}