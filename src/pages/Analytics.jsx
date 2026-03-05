import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, MessageSquare, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";

const COLORS = ["#10b981", "#d4af7a", "#1a3a52", "#6366f1", "#f59e0b", "#ef4444"];

export default function Analytics() {
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const me = await base44.auth.me();
      setUser(me);
      if (me?.role === "admin") {
        const [c, p] = await Promise.all([
          base44.entities.ContactMessage.list("-created_date", 200),
          base44.entities.Project.list("-created_date", 200),
        ]);
        setContacts(c);
        setProjects(p);
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060f1a] flex items-center justify-center">
        <div className="text-white text-lg">Loading analytics...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#060f1a] flex items-center justify-center">
        <div className="text-white text-lg">Access restricted to admins.</div>
      </div>
    );
  }

  // --- Helpers ---
  const getLast6Months = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({ label: d.toLocaleString("default", { month: "short" }), year: d.getFullYear(), month: d.getMonth() });
    }
    return months;
  };

  const months = getLast6Months();

  const countByMonth = (items) =>
    months.map(({ label, year, month }) => ({
      month: label,
      count: items.filter((item) => {
        const d = new Date(item.created_date);
        return d.getFullYear() === year && d.getMonth() === month;
      }).length,
    }));

  const contactsByMonth = countByMonth(contacts);
  const projectsByMonth = countByMonth(projects);

  // Service interest breakdown
  const serviceCount = {};
  contacts.forEach((c) => {
    const s = c.service_interest || "general";
    serviceCount[s] = (serviceCount[s] || 0) + 1;
  });
  const serviceData = Object.entries(serviceCount)
    .map(([name, value]) => ({ name: name.replace(/_/g, " "), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Status breakdown
  const statusCount = { new: 0, contacted: 0, resolved: 0 };
  contacts.forEach((c) => { statusCount[c.status || "new"]++; });

  // Project status
  const projStatusCount = {};
  projects.forEach((p) => { projStatusCount[p.status || "planning"] = (projStatusCount[p.status || "planning"] || 0) + 1; });
  const projStatusData = Object.entries(projStatusCount).map(([name, value]) => ({ name, value }));

  // Month-over-month change
  const thisMonth = contactsByMonth[5]?.count || 0;
  const lastMonth = contactsByMonth[4]?.count || 0;
  const trend = lastMonth === 0 ? 100 : Math.round(((thisMonth - lastMonth) / lastMonth) * 100);

  const statCards = [
    { label: "Total Inquiries", value: contacts.length, icon: MessageSquare, color: "emerald" },
    { label: "Active Projects", value: projects.filter((p) => p.status === "in_progress").length, icon: TrendingUp, color: "gold" },
    { label: "New This Month", value: thisMonth, icon: Eye, color: "blue" },
    { label: "Conversion Rate", value: `${contacts.length > 0 ? Math.round((projects.length / contacts.length) * 100) : 0}%`, icon: Users, color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-[#060f1a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#d4af7a] text-xs uppercase tracking-[0.2em] font-semibold mb-1">Admin Dashboard</p>
          <h1 className="text-3xl font-bold text-white">Analytics & Trends</h1>
          <p className="text-slate-400 mt-1">Website inquiries, project activity, and service interest breakdown.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map(({ label, value, icon: IconComp }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <IconComp className="w-5 h-5 text-[#d4af7a]" />
                {label === "New This Month" && (
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(trend)}%
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-slate-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Inquiries Over Time */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Inquiries Over Last 6 Months</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={contactsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0f2a4a", border: "none", borderRadius: 8, color: "#fff" }} />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Projects Over Time */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Projects Started Over Last 6 Months</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0f2a4a", border: "none", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="count" fill="#d4af7a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Service Interest */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Top Service Interests</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={serviceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} width={130} />
                <Tooltip contentStyle={{ background: "#0f2a4a", border: "none", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Project Status Pie */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Project Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={projStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, value }) => `${name} (${value})`} labelLine={false}>
                  {projStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f2a4a", border: "none", borderRadius: 8, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inquiry Status Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Inquiry Status Breakdown</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(statusCount).map(([status, count]) => (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-slate-400 text-xs capitalize mt-1">{status}</div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: contacts.length > 0 ? `${(count / contacts.length) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}