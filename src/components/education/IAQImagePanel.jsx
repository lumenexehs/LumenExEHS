import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const IMAGE_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0b309d691_ChatGPTImageMar4202612_04_48PM.png";

const tags = ["CO₂", "Ventilation", "Odours", "Indoor Air Quality"];

function OverlayContent() {
  return (
    <div className="p-6 flex flex-col h-full justify-end">
      <p className="text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-1">Education Sector</p>
      <h3 className="text-xl font-bold text-white mb-2 leading-snug">Indoor Air Quality Monitoring</h3>
      <p className="text-sm text-white/80 leading-relaxed mb-4">
        Schools sometimes experience concerns such as odours, fatigue, or discomfort even when no obvious problem is visible.
        Professional monitoring helps identify hidden environmental factors such as ventilation performance, CO₂ levels, and
        indoor contaminants that may affect learning environments.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-xs text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={createPageUrl("SectorEducation")}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af7a] hover:text-white transition-colors group"
      >
        Learn how we investigate school IAQ
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function IAQImagePanel() {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      {/* Desktop: image with hover overlay */}
      <div
        className="relative rounded-2xl overflow-hidden hidden md:block"
        style={{ aspectRatio: "16/10" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={IMAGE_URL}
          alt="Occupational hygienist conducting indoor air quality monitoring in a school classroom"
          className="w-full h-full object-contain bg-white"
          />
          {/* Permanent soft overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl" />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-[#0F2A4A]/75 rounded-2xl flex flex-col justify-end transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <OverlayContent />
        </div>
      </div>

      {/* Mobile: image + text below */}
      <div className="md:hidden">
        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={IMAGE_URL}
            alt="Occupational hygienist conducting indoor air quality monitoring in a school classroom"
            className="w-full h-full object-contain bg-white"
            />
        </div>
        <div className="mt-4 bg-[#0F2A4A] rounded-2xl">
          <OverlayContent />
        </div>
      </div>
    </div>
  );
}