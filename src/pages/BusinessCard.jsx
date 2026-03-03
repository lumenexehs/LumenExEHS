import { useState } from "react";
import { Mail, Phone, Linkedin, Globe, Calendar, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SOCIAL_PLATFORMS = [
{ key: "linkedin", label: "LinkedIn", icon: "in", color: "#0077b5", prefix: "linkedin.com/in/" },
{ key: "instagram", label: "Instagram", icon: "IG", color: "#e1306c", prefix: "@" },
{ key: "facebook", label: "Facebook", icon: "fb", color: "#1877f2", prefix: "facebook.com/" },
{ key: "youtube", label: "YouTube", icon: "YT", color: "#ff0000", prefix: "youtube.com/@" },
{ key: "website", label: "Website", icon: "🌐", color: "#c49d68", prefix: "https://" }];


const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Kenny LI
ORG:LumenEx EHS
TITLE:EHS Consultant
TEL:+16476856904
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

function ContactCapture() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", occupation: "" });
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [socialHandle, setSocialHandle] = useState("");
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return;
    setStatus("submitting");
    const socialLine = selectedPlatform && socialHandle ?
    `${selectedPlatform.label}: ${selectedPlatform.prefix}${socialHandle}` :
    "—";
    await base44.integrations.Core.SendEmail({
      to: "info@lumenexehs.ca",
      subject: `New contact from business card — ${form.name || form.email}`,
      body: `Name: ${form.name || "—"}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\nOrganization: ${form.organization || "—"}\nOccupation: ${form.occupation || "—"}\nSocial: ${socialLine}`
    });
    setStatus("done");
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <p className="text-xs font-semibold text-[#1a3a52] uppercase tracking-widest mb-1">
        Leave your contact <span className="font-normal text-slate-400 normal-case tracking-normal">(optional)</span>
      </p>
      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        If you'd like me to follow up, you may leave your contact details here.
      </p>

      {status === "done" ?
      <p className="text-xs text-emerald-600 font-medium py-3 text-center">
          Thanks — I'll be in touch.
        </p> :

      <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name *"
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c49d68]" />

          <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="Email address *"
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c49d68]" />

          <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number *"
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c49d68]" />

          <input
          name="organization"
          value={form.organization}
          onChange={handleChange}
          placeholder="Organization (optional)"
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c49d68]" />

          <input
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          placeholder="Occupation (optional)"
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c49d68]" />


          {/* Social platform picker */}
          <div>
            <p className="text-xs text-slate-400 mb-2">Social / website (optional)</p>
            <div className="flex gap-2.5 flex-wrap mb-2">
              {SOCIAL_PLATFORMS.map((p) =>
            <button
              key={p.key}
              type="button"
              title={p.label}
              onClick={() => {
                setSelectedPlatform(selectedPlatform?.key === p.key ? null : p);
                setSocialHandle("");
              }}
              className={`w-10 h-10 rounded-full text-sm font-bold border-2 flex items-center justify-center transition-all active:scale-95 ${
              selectedPlatform?.key === p.key ?
              "text-white border-transparent" :
              "bg-white text-slate-500 border-slate-200"}`
              }
              style={selectedPlatform?.key === p.key ? { backgroundColor: p.color, borderColor: p.color } : {}}>

                  {p.icon}
                </button>
            )}
            </div>
            {selectedPlatform &&
          <div className="flex items-center gap-0 rounded-xl border border-slate-200 bg-white overflow-hidden">
                <span className="text-xs text-slate-400 px-3 whitespace-nowrap border-r border-slate-200 py-2.5">
                  {selectedPlatform.prefix}
                </span>
                <input
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              placeholder={selectedPlatform.key === "website" ? "yourdomain.com" : "your handle or URL"}
              className="flex-1 text-sm px-3 py-2.5 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none" />

              </div>
          }
          </div>

          <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 rounded-2xl bg-white border border-[#1a3a52] text-[#1a3a52] text-sm font-semibold active:scale-95 transition-transform disabled:opacity-50">

            {status === "submitting" ? "Sending…" : "Share Contact"}
          </button>
          <p className="text-xs text-slate-300 text-center leading-relaxed pt-1">
            Your contact information will be used only for direct professional follow-up.
          </p>
        </form>
      }
    </div>);

}

export default function BusinessCard() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col items-center justify-start px-5 pt-12 pb-10">
      <div className="w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0d4189f13_ChatGPTImageJan13202612_07_16PM.png"
            alt="LumenEx EHS" className="opacity-100 w-40 h-28 object-contain" />


        </div>

        {/* Avatar */}
        









        {/* Identity */}
        <div className="text-center mb-6">
          
          <p className="text-sm font-semibold text-[#c49d68] uppercase tracking-widest mb-1">HEALTH & SAFETY CONSULTANT</p>
          <p className="text-slate-400 text-sm font-normal">Certified Industrial Hygienist | Certified Safety Professional</p>
          <div className="w-10 h-px bg-[#d4af7a] mx-auto my-4" />
          <p className="text-slate-500 mx-auto text-xs font-light text-justify leading-relaxed max-w-xs">"Making invisible workplace health risks visible through science-based assessment."

          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={downloadVCard}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#1a3a52] text-white text-sm font-semibold shadow-sm active:scale-95 transition-transform">

            <Download className="w-4 h-4" />
            Save Contact
          </button>

          <a
            href="mailto:info@lumenexehs.ca"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-[#1a3a52] text-sm font-semibold shadow-sm active:scale-95 transition-transform">

            <Mail className="w-4 h-4 text-[#c49d68]" />
            Email Me
          </a>

          <a
            href="tel:+16476856904"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-[#1a3a52] text-sm font-semibold shadow-sm active:scale-95 transition-transform">

            <Phone className="w-4 h-4 text-[#c49d68]" />
            Call Me
          </a>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <a
            href="https://www.linkedin.com/in/lumenex-ehs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform">

            <Linkedin className="w-5 h-5 text-[#0077b5]" />
            <span className="text-xs text-slate-500 font-medium">LinkedIn</span>
          </a>

          <a
            href="https://lumenexehs.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform">

            <Globe className="w-5 h-5 text-[#c49d68]" />
            <span className="text-xs text-slate-500 font-medium">Website</span>
          </a>

          <a
            href="mailto:info@lumenexehs.ca?subject=Consultation%20Request"
            className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-95 transition-transform">

            <Calendar className="w-5 h-5 text-[#c49d68]" />
            <span className="text-xs text-slate-500 font-medium">Book a Call</span>
          </a>
        </div>

        {/* Credential strip */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["CIH", "CSP"].map((cert) =>
          <span
            key={cert}
            className="text-xs font-semibold text-[#1a3a52] bg-[#f0e8d8] px-3 py-1 rounded-full tracking-wide">

              {cert}
            </span>
          )}
          <span className="text-xs font-semibold text-[#1a3a52] bg-[#f0e8d8] px-3 py-1 rounded-full tracking-wide">
            19+ yrs
          </span>
        </div>

        {/* Contact Capture */}
        <ContactCapture />

        {/* Back to Top */}
        <div className="flex justify-center mt-8 mb-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-slate-400 border border-slate-200 bg-white active:scale-95 transition-transform hover:text-[#1a3a52] hover:border-[#1a3a52]">
            ↑ Back to top
          </button>
        </div>

        {/* Footer */}
        <div className="text-center space-y-1 mt-2">
          <p className="text-xs text-slate-400">Based in Ontario, Canada</p>
          <p className="text-xs text-slate-300">© {new Date().getFullYear()} LumenEx EHS</p>
        </div>
      </div>
    </div>);

}