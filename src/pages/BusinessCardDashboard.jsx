import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Mail, Phone, Building, User, MessageSquare, Users, RefreshCw, Share2, Eye, Globe } from "lucide-react";

const STATUS_COLORS = {
  new: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  followed_up: "bg-emerald-100 text-emerald-700",
  contacted: "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Normalize both entity types into a unified shape
function normalizeContactMessage(r) {
  return {
    id: r.id,
    _entity: "ContactMessage",
    type: "website_contact",
    name: r.name,
    email: r.email,
    phone: r.phone,
    organization: r.company,
    occupation: r.service_interest ? `Service: ${r.service_interest}` : null,
    message: r.message,
    social: null,
    status: r.status || "new",
    created_date: r.created_date,
  };
}

function normalizeBusinessCardLead(r) {
  return {
    id: r.id,
    _entity: "BusinessCardLead",
    type: r.type, // "enquiry" or "contact"
    name: r.name,
    email: r.email,
    phone: r.phone,
    organization: r.organization,
    occupation: r.occupation,
    message: r.message,
    social: r.social,
    status: r.status || "new",
    created_date: r.created_date,
  };
}

const TYPE_META = {
  enquiry:         { label: "Card Enquiry",    bg: "bg-emerald-100", icon: MessageSquare, color: "text-emerald-600" },
  contact:         { label: "Card Contact",    bg: "bg-blue-100",    icon: Share2,        color: "text-blue-600" },
  website_contact: { label: "Website Contact", bg: "bg-purple-100",  icon: Globe,         color: "text-purple-600" },
};

export default function BusinessCardDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    base44.auth.me()
      .then((u) => { setUser(u); setAuthChecked(true); })
      .catch(() => { setAuthChecked(true); });
  }, []);

  useEffect(() => {
    if (user?.role === "admin") fetchLeads();
  }, [user]);

  const fetchLeads = async () => {
    setLoading(true);
    const [bcLeads, contactMsgs] = await Promise.all([
      base44.entities.BusinessCardLead.list("-created_date"),
      base44.entities.ContactMessage.list("-created_date"),
    ]);
    const combined = [
      ...bcLeads.map(normalizeBusinessCardLead),
      ...contactMsgs.map(normalizeContactMessage),
    ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    setLeads(combined);
    setLoading(false);
  };

  const updateStatus = async (lead, status) => {
    setUpdating(lead.id);
    if (lead._entity === "BusinessCardLead") {
      await base44.entities.BusinessCardLead.update(lead.id, { status });
    } else {
      await base44.entities.ContactMessage.update(lead.id, { status });
    }
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status } : l));
    setUpdating(null);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1a3a52] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-500 text-sm">Access restricted to admin users.</p>
        </div>
      </div>
    );
  }

  const cardLeads = leads.filter((l) => l.type === "enquiry" || l.type === "contact");
  const websiteLeads = leads.filter((l) => l.type === "website_contact");
  const newCount = leads.filter((l) => l.status === "new").length;

  const filtered =
    activeTab === "all" ? leads :
    activeTab === "card" ? cardLeads :
    websiteLeads;

  const statusOptions = {
    BusinessCardLead: ["new", "reviewed", "followed_up"],
    ContactMessage: ["new", "contacted", "resolved"],
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a52]">Leads Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">All submissions — business card & website contact form</p>
          </div>
          <div className="flex items-center gap-2">
            {newCount > 0 && (
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">{newCount} new</span>
            )}
            <button onClick={fetchLeads} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#1a3a52] transition-colors border border-slate-200 rounded-full px-3 py-1.5 bg-white">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Leads", value: leads.length, icon: Users, color: "text-[#1a3a52]" },
            { label: "Business Card", value: cardLeads.length, icon: Share2, color: "text-blue-600" },
            { label: "Website Form", value: websiteLeads.length, icon: Globe, color: "text-purple-600" },
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
            { key: "card", label: `Business Card (${cardLeads.length})` },
            { key: "website", label: `Website (${websiteLeads.length})` },
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
            {filtered.map((lead) => {
              const meta = TYPE_META[lead.type] || TYPE_META.website_contact;
              const Icon = meta.icon;
              const statuses = statusOptions[lead._entity];
              return (
                <div key={lead.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-800 text-sm">{lead.name || "—"}</p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>{meta.label}</span>
                        </div>
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
                    {lead.occupation && <div className="flex items-center gap-1.5 col-span-2"><User className="w-3.5 h-3.5 text-slate-400" />{lead.occupation}</div>}
                    {lead.social && <div className="flex items-center gap-1.5 col-span-2"><Eye className="w-3.5 h-3.5 text-slate-400" />{lead.social}</div>}
                  </div>

                  {lead.message && (
                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-3 border border-slate-100">
                      <p className="font-semibold text-slate-400 uppercase tracking-wide text-xs mb-1">Message</p>
                      {lead.message}
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {statuses.map((s) => (
                      <button key={s} disabled={lead.status === s || updating === lead.id}
                        onClick={() => updateStatus(lead, s)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all disabled:opacity-40 ${
                          lead.status === s
                            ? "border-transparent bg-slate-100 text-slate-400 cursor-default"
                            : "bg-white border-slate-200 text-slate-500 hover:border-[#1a3a52] hover:text-[#1a3a52]"
                        }`}>
                        {s === "new" ? "Mark New" : s === "reviewed" ? "Mark Reviewed" : s === "followed_up" ? "Mark Followed Up" : s === "contacted" ? "Mark Contacted" : "Mark Resolved"}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}