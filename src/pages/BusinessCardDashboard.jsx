import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Mail, Phone, Building, User, MessageSquare, Users, RefreshCw, CheckCircle, Eye, Share2 } from "lucide-react";

const STATUS_COLORS = {
  new: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  followed_up: "bg-emerald-100 text-emerald-700",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function BusinessCardDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const data = await base44.entities.BusinessCardLead.list("-created_date");
    setLeads(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    await base44.entities.BusinessCardLead.update(id, { status });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setUpdating(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1a3a52] rounded-full animate-spin" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-500 text-sm">Access restricted to admin users.</p>
        </div>
      </div>
    );
  }

  const contacts = leads.filter((l) => l.type === "contact");
  const enquiries = leads.filter((l) => l.type === "enquiry");
  const filtered = activeTab === "all" ? leads : activeTab === "contact" ? contacts : enquiries;
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-[#f9f8f6] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a52]">Business Card Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">Submissions from your digital business card</p>
          </div>
          <button onClick={fetchLeads} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#1a3a52] transition-colors border border-slate-200 rounded-full px-3 py-1.5 bg-white">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Submissions", value: leads.length, icon: Users, color: "text-[#1a3a52]" },
            { label: "Contacts Shared", value: contacts.length, icon: Share2, color: "text-blue-600" },
            { label: "Enquiries", value: enquiries.length, icon: MessageSquare, color: "text-emerald-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "all", label: `All (${leads.length})` },
            { key: "contact", label: `Contacts (${contacts.length})` },
            { key: "enquiry", label: `Enquiries (${enquiries.length})` },
          ].map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeTab === t.key
                  ? "bg-[#1a3a52] text-white border-[#1a3a52]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-4 border-slate-200 border-t-[#1a3a52] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No submissions yet.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${lead.type === "enquiry" ? "bg-emerald-100" : "bg-blue-100"}`}>
                      {lead.type === "enquiry" ? <MessageSquare className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{lead.name || "—"}</p>
                      <p className="text-xs text-slate-400">{formatDate(lead.created_date)}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-3">
                  {lead.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /><a href={`mailto:${lead.email}`} className="hover:text-[#1a3a52] underline">{lead.email}</a></div>}
                  {lead.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /><a href={`tel:${lead.phone}`} className="hover:text-[#1a3a52]">{lead.phone}</a></div>}
                  {lead.organization && <div className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-slate-400" />{lead.organization}</div>}
                  {lead.occupation && <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" />{lead.occupation}</div>}
                  {lead.social && <div className="flex items-center gap-1.5 col-span-2"><Eye className="w-3.5 h-3.5 text-slate-400" />{lead.social}</div>}
                </div>

                {lead.message && (
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-3 border border-slate-100">
                    <p className="font-semibold text-slate-400 uppercase tracking-wide text-xs mb-1">Message</p>
                    {lead.message}
                  </div>
                )}

                {/* Status actions */}
                <div className="flex gap-2 flex-wrap">
                  {["new", "reviewed", "followed_up"].map((s) => (
                    <button key={s} disabled={lead.status === s || updating === lead.id}
                      onClick={() => updateStatus(lead.id, s)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all disabled:opacity-40 ${
                        lead.status === s
                          ? "border-transparent bg-slate-100 text-slate-400 cursor-default"
                          : "bg-white border-slate-200 text-slate-500 hover:border-[#1a3a52] hover:text-[#1a3a52]"
                      }`}>
                      {s === "new" ? "Mark New" : s === "reviewed" ? "Mark Reviewed" : "Mark Followed Up"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}