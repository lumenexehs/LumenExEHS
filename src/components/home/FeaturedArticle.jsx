import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const articles = [
{
  id: 3,
  title: "Regulation Watch™ — Winter Height Hazards & Working-at-Heights Compliance",
  date: "Feb 2025",
  summary: "Winter doesn't pause fall risks — it amplifies them. Ice, snow, and cold-induced dexterity loss compound fall exposure across Ontario sites. WAH certification requirements don't change in winter; due diligence expectations increase.",
  image: "https://media.licdn.com/dms/image/v2/D5612AQFMfkcm1iLr4Q/article-cover_image-shrink_720_1280/B56ZylKst9HUAI-/0/1772297596163?e=2147483647&v=beta&t=q0sVmzD_udVuob-6B0WrgUUft4QGm-1QLiBZ9b_OLzM",
  url: "https://www.linkedin.com/pulse/regulation-watch-winter-height-hazards-compliance-services-customer-leiic",
  tag: "Regulation Watch"
},
{
  id: 2,
  title: "Understanding the Miner's Safety Lamp: The Original Gas Detector",
  date: "Jan 2025",
  summary: "Before modern gas detectors, the Garforth lamp revealed invisible methane hazards through changes in flame shape and colour. This historical tool laid the foundation for today's occupational hygiene practice — detecting what the eye cannot see.",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/61912440e_garforth_lamps.jpg",
  url: "https://www.suttonbeauty.org.uk/suttonhistory/sutton_memories22/",
  tag: "IH Education"
},
{
  id: 1,
  title: "Ontario Launches Canada's First Occupational Exposure Registry",
  date: "Nov 2024",
  summary: "Ontario's new registry lets workers record exposures to hazardous substances such as asbestos, lead, and silica — creating secure, downloadable records that inform prevention and future medical assessments.",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/46e7cc829_1772212842931.png",
  url: "https://www.linkedin.com/posts/lumenex-ehs_ontario-has-launched-canadas-first-occupational-activity-7433200414990299136-OSy1",
  tag: "Regulatory Update"
}];


export default function FeaturedArticle() {
  const [current, setCurrent] = useState(0);
  const featured = articles[current];
  const secondary = articles.filter((_, i) => i !== current).slice(0, 4);

  const prev = () => setCurrent((c) => (c - 1 + articles.length) % articles.length);
  const next = () => setCurrent((c) => (c + 1) % articles.length);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-emerald-500 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span className="bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded">
              EHS Insights
            </span>
          </div>
          {articles.length > 1 &&
          <div className="flex items-center gap-2">
              <button
              onClick={prev}
              className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-200 transition-colors"
              aria-label="Previous">

                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <span className="text-xs text-slate-500">{current + 1} / {articles.length}</span>
              <button
              onClick={next}
              className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-200 transition-colors"
              aria-label="Next">

                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          }
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured (large) */}
          <AnimatePresence mode="wait">
            <motion.a
              key={featured.id}
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-1 group block">

              <div className="overflow-hidden rounded-xl mb-4 bg-slate-200">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />

              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{featured.tag}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                {featured.title}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span className="text-xs text-slate-500">{featured.date}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-3">
                {featured.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Read on LinkedIn <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          </AnimatePresence>

          {/* Secondary articles grid or placeholder */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6 content-start">
            {secondary.length > 0 ?
            secondary.map((article) =>
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block">

                  <div className="overflow-hidden rounded-lg mb-3 bg-slate-200">
                    <img
                  src={article.image}
                  alt={article.title} className="w-full h-45 object-cover group-hover:scale-105 transition-transform duration-500" />


                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1 group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs text-slate-400">{article.date}</span>
                </a>
            ) :

            // Placeholder cards when there's only one article
            Array.from({ length: 4 }).map((_, i) =>
            <div key={i} className="opacity-40">
                  <div className="rounded-lg bg-slate-200 h-32 mb-3 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
            )
            }
          </div>
        </div>
      </div>
    </section>);

}