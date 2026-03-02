import { Mail, Phone, Linkedin, Globe, Calendar, Download } from "lucide-react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Kenny LI
ORG:LumenEx EHS
TITLE:EHS Consultant
EMAIL:info@lumenexehs.ca
URL:https://lumenexehs.ca
END:VCARD`;

function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Kenny_LI_LumenEx.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function BusinessCard() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-start px-5 pt-12 pb-10">
      <div className="w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0d4189f13_ChatGPTImageJan13202612_07_16PM.png"
            alt="LumenEx EHS"
            className="w-10 h-10 object-contain opacity-70"
          />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#e8e4dc]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
              alt="Kenny LI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Identity */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1a3a52] tracking-tight mb-0.5">Kenny LI</h1>
          <p className="text-sm font-semibold text-[#c49d68] uppercase tracking-widest mb-1">EHS Consultant</p>
          <p className="text-sm text-slate-400 font-medium">LumenEx EHS</p>
          <div className="w-10 h-px bg-[#d4af7a] mx-auto my-4" />
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            Making invisible workplace health risks visible through science-based assessment.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={downloadVCard}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#1a3a52] text-white text-sm font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4" />
            Save Contact
          </button>

          <a
            href="mailto:info@lumenexehs.ca"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-[#1a3a52] text-sm font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <Mail className="w-4 h-4 text-[#c49d68]" />
            Email Me
          </a>

          <a
            href="tel:+1"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-[#1a3a52] text-sm font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#c49d68]" />
            Call Me
          </a>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <a
            href="https://www.linkedin.com/company/lumenex-ehs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform"
          >
            <Linkedin className="w-5 h-5 text-[#0077b5]" />
            <span className="text-xs text-slate-500 font-medium">LinkedIn</span>
          </a>

          <a
            href="https://lumenexehs.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform"
          >
            <Globe className="w-5 h-5 text-[#c49d68]" />
            <span className="text-xs text-slate-500 font-medium">Website</span>
          </a>

          <a
            href="mailto:info@lumenexehs.ca?subject=Consultation%20Request"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform"
          >
            <Calendar className="w-5 h-5 text-[#c49d68]" />
            <span className="text-xs text-slate-500 font-medium">Book a Call</span>
          </a>
        </div>

        {/* Credential strip */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["CIH", "CSP", "CRSP"].map((cert) => (
            <span
              key={cert}
              className="text-xs font-semibold text-[#1a3a52] bg-[#f0e8d8] px-3 py-1 rounded-full tracking-wide"
            >
              {cert}
            </span>
          ))}
          <span className="text-xs font-semibold text-[#1a3a52] bg-[#f0e8d8] px-3 py-1 rounded-full tracking-wide">
            19+ yrs
          </span>
        </div>

        {/* Footer */}
        <div className="text-center space-y-1">
          <p className="text-xs text-slate-400">Based in Ontario, Canada</p>
          <p className="text-xs text-slate-300">© {new Date().getFullYear()} LumenEx EHS</p>
        </div>
      </div>
    </div>
  );
}