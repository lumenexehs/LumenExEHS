import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  Mail, Phone, Building, User, MessageSquare, Users,
  RefreshCw, Share2, Eye, Globe, LogOut, Shield,
  LayoutDashboard, Menu, X, ChevronDown
} from "lucide-react";

const STATUS_COLORS = {
  new: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  followed_up: "bg-emerald-100 text-emerald-700",
  contacted: "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABELS = {
  new: "New",
  reviewed: "Reviewed",
  followed_up: "Followed Up",
  contacted: "Contacted",
  resolved: "Resolved",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-CA", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function normalizeContactMessage(r) {
  return {
    id: r.id,
    _entity: "ContactMessage",
    type: "website_contact",
    name: r.name,
    email: r.email,
    phone: r.phone,
    organization: r.company,
    occupation: r.service_interest ? r.service_interest.replace(/_/g, " ") : null,
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
    type: r.type,
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

const statusOptions = {
  BusinessCardLead: ["new", "reviewed", "followed_up"],
  ContactMessage:   ["new", "contacted", "resolved"],
};

function LeadCard({ lead, onStatusChange, updating }) {
  const meta = TYPE_META[lead.type] || TYPE_META.website_contact;
  const Icon = meta.icon;
  const statuses = statusOptions[lead._entity];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
            <Icon className={`w-4 h-4 ${meta.color}`} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-slate-800 text-sm">{lead.name || "—"}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                {meta.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{formatDate(lead.created_date)}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
          {STATUS_LABELS[lead.status] || lead.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-3">
        {lead.email && (
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <a href={`mailto:${lead.email}`} className="hover:text-[#1a3a52] underline truncate">{lead.email}</a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <a href={`tel:${lead.phone}`} className="hover:text-[#1a3a52]">{lead.phone}</a>
          </div>
        )}
        {lead.organization && (
          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{lead.organization}</span>
          </div>
        )}
        {lead.occupation && (
          <div className="flex items-center gap-1.5 sm:col-span-2">
            <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="capitalize">{lead.occupation}</span>
          </div>
        )}
        {lead.social && (
          <div className="flex items-center gap-1.5 sm:col-span-2">
            <Eye className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{lead.social}</span>
          </div>
        )}
      </div>

      {lead.message && (
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-3 border border-slate-100">
          <p className="font-semibold text-slate-400 uppercase tracking-wide text-xs mb-1">Message</p>
          <p className="whitespace-pre-wrap">{lead.message}</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            disabled={lead.status === s || updating === lead.id}
            onClick={() => onStatusChange(lead, s)}
            className={`text-xs px-3 py-1 rounded-full border transition-all disabled:opacity-40 ${
              lead.status === s
                ? "border-transparent bg-slate-100 text-slate-400 cursor-default"
                : "bg-white border-slate-200 text-slate-500 hover:border-[#1a3a52] hover:text-[#1a3a52]"
            }`}
          >
            {STATUS_LABELS[s] || s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AdminPortal() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [updating, setUpdating] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleLogout = () => base44.auth.logout("/");

  // Auth loading
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1a3a52] rounded-full animate-spin" />
      </div>
    );
  }

  // Not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center max-w-sm">
          <Shield className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">Admin Access Only</h2>
          <p className="text-slate-500 text-sm mb-5">You don't have permission to view this page.</p>
          <button
            onClick={() => base44.auth.redirectToLogin("/AdminPortal")}
            className="bg-[#1a3a52] text-white text-sm px-5 py-2 rounded-full hover:bg-[#15304a] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const cardLeads    = leads.filter((l) => l.type === "enquiry" || l.type === "contact");
  const websiteLeads = leads.filter((l) => l.type === "website_contact");
  const newCount     = leads.filter((l) => l.status === "new").length;

  const filtered =
    activeTab === "all"     ? leads :
    activeTab === "card"    ? cardLeads :
    websiteLeads;

  const tabs = [
    { key: "all",     label: "All Leads",     count: leads.length },
    { key: "card",    label: "Business Card", count: cardLeads.length },
    { key: "website", label: "Website Form",  count: websiteLeads.length },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Top Bar */}
      <header className="bg-[#1a3a52] text-white px-4 md:px-8 py-4 flex items-center justify-between shadow-md z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded-lg hover:bg-white/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/774460418_ChatGPTImageMar4202604_01_29PM-Picsart-BackgroundRemover.png"
            alt="LumenEx EHS"
            className="h-9 w-auto object-contain brightness-0 invert"
          />
          <div className="hidden md:block h-5 w-px bg-white/20" />
          <span className="hidden md:block text-xs font-semibold text-white/60 uppercase tracking-widest">Admin Portal</span>
        </div>

        <div className="flex items-center gap-3">
          {newCount > 0 && (
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {newCount} new
            </span>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden sm:block text-white/80 text-xs">{user.full_name || user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-10 w-60 bg-white border-r border-slate-100 shadow-lg md:shadow-none
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col pt-4 md:pt-6
        `}>
          <nav className="flex-1 px-3 space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Menu</p>
            <button
              onClick={() => { setActiveTab("all"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-[#1a3a52] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              All Leads
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{leads.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("card"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "card"
                  ? "bg-[#1a3a52] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Share2 className="w-4 h-4" />
              Business Card
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === "card" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{cardLeads.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("website"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "website"
                  ? "bg-[#1a3a52] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Globe className="w-4 h-4" />
              Website Form
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === "website" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{websiteLeads.length}</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-100 mt-4">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-0.5">Unread</p>
              <p className="text-2xl font-bold text-amber-800">{newCount}</p>
              <p className="text-xs text-amber-600">new submissions</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#1a3a52]">
                {tabs.find((t) => t.key === activeTab)?.label}
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                {filtered.length} submission{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={fetchLeads}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1a3a52] transition-colors border border-slate-200 rounded-full px-3 py-1.5 bg-white shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total",        value: leads.length,        color: "text-[#1a3a52]", bg: "bg-[#1a3a52]/10" },
              { label: "Business Card", value: cardLeads.length,   color: "text-blue-600",   bg: "bg-blue-50" },
              { label: "Website",       value: websiteLeads.length, color: "text-purple-600", bg: "bg-purple-50" },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Lead List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-7 h-7 border-4 border-slate-200 border-t-[#1a3a52] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatusChange={updateStatus}
                  updating={updating}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}