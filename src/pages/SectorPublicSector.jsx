import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, Volume2, FileText, Shield, Eye } from "lucide-react";
import { useLang } from "@/components/LanguageContext";
import { t } from "@/components/translations";

const icons = [Wind, Volume2, FileText, Shield, Eye];

export default function SectorPublicSector() {
  const { lang } = useLang();
  const tr = t[lang].sectorPublicSector;
  const shared = t[lang].sectorShared;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-[#0F2A4A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-80 h-80 bg-sky-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">{tr.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">{tr.heroTitle}</h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-2">{tr.heroSubtitle}</p>
            <p className="text-slate-400 text-base">{tr.heroCaption}</p>
            <div className="mt-8">
              <Link to={`${createPageUrl("Contact")}?service=risk_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  {tr.ctaButton}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">{shared.sectorReality}</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2 mb-4">{tr.challengesTitle}</h2>
            <p className="text-slate-500 leading-relaxed max-w-2xl">{tr.challengesSubtitle}</p>
          </motion.div>
          <div className="space-y-4">
            {tr.challenges.map((text, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-sky-600" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-[#d4af7a] font-medium tracking-wide text-sm uppercase">{shared.ourApproach}</span>
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-2">{tr.howWeHelpTitle}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {tr.pillars.map((p, i) => {
              const nums = ["01","02","03","04"];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                  <span className="text-[#d4af7a] font-bold text-sm">{nums[i]}</span>
                  <h3 className="text-[#1a3a52] font-bold text-lg mt-2 mb-2">{shared.pillars[nums[i]]}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#f9f8f6] border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-2xl text-[#1a3a52] font-light leading-relaxed italic">{tr.quoteText}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0F2A4A]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-3">{tr.ctaFinalTitle}</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">{tr.ctaFinalBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("Contact")}?service=risk_assessment`}>
                <Button size="lg" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-8 rounded-full group">
                  {tr.ctaButton}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Services")}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 rounded-full">
                  {shared.viewAllServices}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}