import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Wind, FlaskConical, Building2, HeartPulse, ShieldCheck, Users, ArrowRight, BookOpen
} from "lucide-react";

const topics = [
  { id: "all", label: "All Topics", icon: BookOpen },
  { id: "indoor-air", label: "Indoor Air", icon: Wind },
  { id: "exposure", label: "Industrial Exposure", icon: FlaskConical },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "compliance", label: "Compliance", icon: ShieldCheck },
  { id: "community", label: "Community", icon: Users },
];

export const articles = [
  {
    id: "ontario-exposure-registry",
    topic: "compliance",
    tag: "Regulation Watch",
    title: "Ontario Launches Canada's First Occupational Exposure Registry",
    summary: "Ontario's new digital OER portal lets workers document and track exposure to designated hazardous substances like asbestos, lead, mercury, and silica — a pivotal shift toward proactive exposure management.",
    image: "https://media.licdn.com/dms/image/v2/D5612AQEtr8v-kycP3w/article-cover_image-shrink_720_1280/B56ZyleVv3HYAI-/0/1772302723879?e=2147483647&v=beta&t=IHauWElf2TOOEqu8v4HZR8OcZSui2SUp_ohQFKhXp2w",
    date: "Feb 2026",
    readTime: "4 min read",
    externalUrl: "https://www.linkedin.com/pulse/global-bite-size-ohs-17-services-customer-4mjvc",
  },
  {
    id: "winter-height-hazards",
    topic: "compliance",
    tag: "Regulation Watch",
    title: "Winter Height Hazards & Working-at-Heights Compliance",
    summary: "Snow, ice, reduced visibility, and cold-induced dexterity loss significantly increase fall exposure. Winter doesn't change regulatory requirements — it raises due diligence expectations.",
    image: "https://media.licdn.com/dms/image/v2/D5612AQFMfkcm1iLr4Q/article-cover_image-shrink_720_1280/B56ZylKst9HUAI-/0/1772297596163?e=2147483647&v=beta&t=q0sVmzD_udVuob-6B0WrgUUft4QGm-1QLiBZ9b_OLzM",
    date: "Feb 2026",
    readTime: "4 min read",
    externalUrl: "https://www.linkedin.com/pulse/regulation-watch-winter-height-hazards-compliance-services-customer-leiic",
  },
  {
    id: "butadiene-epa",
    topic: "regulations",
    tag: "Chemical Exposure",
    title: "EPA Moves to Regulate 1,3-Butadiene: What Employers Should Know",
    summary: "The U.S. EPA has determined that 1,3-butadiene presents an unreasonable risk to workers in 11 occupational conditions of use. For Canadian employers in manufacturing and chemical handling, this is a signal worth acting on now.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80",
    date: "Mar 2026",
    readTime: "6 min read",
  },
  {
    id: "odour-ambulances",
    topic: "indoor-air",
    tag: "Indoor Air Quality",
    title: "Ambulances Called, Schools Closed: What a Mystery Odour Really Means",
    summary: "When a swimming pool mechanical issue sent students home sick and drew three fire engines to a UK school, the lesson was clear — odour complaints are emergency triggers, not maintenance tickets.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    date: "Mar 2026",
    readTime: "4 min read",
  },
  {
    id: "odour-schools",
    topic: "indoor-air",
    tag: "Indoor Air Quality",
    title: "Unexplained Odours in Schools: When to Close, When to Investigate",
    summary: "A persistent or sudden odour in a school is not a minor nuisance — it's a trigger for investigation. Schools across Canada have closed due to unexplained smells, and principals are often left without a clear protocol.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    date: "Mar 2026",
    readTime: "5 min read",
  },
  {
    id: "radon-ontario",
    topic: "indoor-air",
    tag: "Radon",
    title: "Radon in Ontario Buildings: What Employers and Landlords Must Know",
    summary: "Radon is the second leading cause of lung cancer in Canada — and nearly half of Canadian homes may exceed the WHO's threshold. Health Canada's guideline hasn't changed since 2007. Is your building truly safe?",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    date: "Mar 2026",
    readTime: "5 min read",
  },
  {
    id: "chemical-exposure-tlv",
    topic: "exposure",
    tag: "Industrial Exposure",
    title: "TLVs® Explained: What Your Air Sampling Report Actually Means",
    summary: "Threshold Limit Values aren't just numbers — they're the difference between a safe workplace and a regulatory violation. A plain-English guide for EHS managers.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/9375df2c5_20260301_0342_ImageGeneration_remix_01kjm8zs61fkyb4nb8xp3f491q.png",
    date: "Dec 2024",
    readTime: "6 min read",
  },
  {
    id: "noise-dosimetry",
    topic: "facilities",
    tag: "Noise",
    title: "Noise Dosimetry 101: Who Needs It and What to Expect",
    summary: "If workers are raising their voice to be heard, you likely have a noise problem. Here's what a professional noise survey involves — and what happens with the results.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/63355d785_20260301_0400_ImageGeneration_remix_01kjma0etbfg2bskz604ancbdh.png",
    date: "Nov 2024",
    readTime: "4 min read",
  },
  {
    id: "heat-stress-construction",
    topic: "compliance",
    tag: "Heat Stress",
    title: "Heat Stress on Ontario Construction Sites: Compliance & Controls",
    summary: "Ontario has no specific heat regulation — but general duty clause obligations are real and enforceable. What employers must do to protect workers in hot conditions.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e1febeb2d_20260301_0417_ImageGeneration_remix_01kjmazxpre3xrr473txxxqw5z.png",
    date: "Oct 2024",
    readTime: "5 min read",
  },
  {
    id: "healthcare-iaq",
    topic: "healthcare",
    tag: "Healthcare",
    title: "Indoor Air Quality in Hospitals and Long-Term Care: A Higher Standard",
    summary: "Healthcare workers face unique IAQ risks — from chemical disinfectants to biological aerosols. How to identify, assess, and control air quality hazards in clinical settings.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    date: "Sep 2024",
    readTime: "5 min read",
  },
];

export default function KnowledgeHub() {
  const [activeTopic, setActiveTopic] = useState("all");

  const filtered = activeTopic === "all"
    ? articles
    : articles.filter((a) => a.topic === activeTopic);

  const [featured, ...rest] = filtered;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-emerald-600 text-xs font-semibold uppercase tracking-widest">EHS Knowledge Hub</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F2A4A] mt-2 mb-2">
            Expert Insights for Ontario Workplaces
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            Science-based guidance — written for safety officers, facility managers, and employers who need clear answers.
          </p>
        </motion.div>

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
          <p className="text-slate-400 text-sm py-12 text-center">No articles in this topic yet.</p>
        )}

        {/* Featured + Grid */}
        {featured && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured card */}
            <a
              href={featured.externalUrl || createPageUrl(`Article?id=${featured.id}`)}
              target={featured.externalUrl ? "_blank" : "_self"}
              rel={featured.externalUrl ? "noopener noreferrer" : undefined}
              className="lg:col-span-1 group block rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{featured.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {featured.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{featured.date} · {featured.readTime}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>

            {/* Secondary grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {rest.slice(0, 4).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <a
                    href={article.externalUrl || createPageUrl(`Article?id=${article.id}`)}
                    target={article.externalUrl ? "_blank" : "_self"}
                    rel={article.externalUrl ? "noopener noreferrer" : undefined}
                    className="group block rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="h-36 overflow-hidden bg-slate-100">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{article.tag}</span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mt-1 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{article.summary}</p>
                      <span className="text-xs text-slate-400 mt-2 block">{article.date} · {article.readTime}</span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-10 text-center">
          <Link
            to={createPageUrl("KnowledgeHub")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A4A] border border-[#0F2A4A] px-6 py-2.5 rounded-full hover:bg-[#0F2A4A] hover:text-white transition-all"
          >
            Browse All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}