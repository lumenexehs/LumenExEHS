import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const OverlayContent = () => (
  <div className="space-y-3">
    <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Public Sector</p>
    <h3 className="text-white text-xl font-bold leading-snug">Noise & Exposure at Training Facilities</h3>
    <div className="flex flex-wrap gap-2">
      {["Shooting Range IAQ", "Impulse Noise", "Lead Exposure", "Hearing Conservation"].map((tag) => (
        <span key={tag} className="bg-white/15 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">{tag}</span>
      ))}
    </div>
    <Link
      to={`${createPageUrl("Contact")}?service=risk_assessment`}
      className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-semibold hover:text-white transition-colors mt-1"
    >
      Request a Risk Assessment <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

export default function PublicSectorImagePanel() {
  return (
    <>
      {/* Desktop: hover overlay */}
      <div className="hidden md:block relative rounded-2xl overflow-hidden shadow-lg group">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/3a48e842c_ChatGPTImageMar4202601_45_04PM.png"
          alt="Public sector training facility exposure assessment"
          className="w-full h-80 object-contain bg-white transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0F2A4A]/0 group-hover:bg-[#0F2A4A]/75 transition-all duration-400 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
          <OverlayContent />
        </div>
      </div>

      {/* Mobile: static layout */}
      <div className="md:hidden">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/3a48e842c_ChatGPTImageMar4202601_45_04PM.png"
          alt="Public sector training facility exposure assessment"
          className="w-full h-56 object-contain bg-white rounded-2xl shadow-md mb-4"
        />
        <div className="bg-[#0F2A4A] rounded-2xl p-6">
          <OverlayContent />
        </div>
      </div>
    </>
  );
}