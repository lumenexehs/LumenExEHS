import { motion } from "framer-motion";
import { FolderKanban, FileText, Clock, CheckCircle } from "lucide-react";

export default function DashboardStats({ projects, documents }) {
  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      label: "Active Projects",
      value: projects.filter(p => p.status === "in_progress").length,
      icon: Clock,
      color: "bg-blue-50 text-blue-600"
    },
    {
      label: "Documents",
      value: documents.length,
      icon: FileText,
      color: "bg-purple-50 text-purple-600"
    },
    {
      label: "Completed",
      value: projects.filter(p => p.status === "completed").length,
      icon: CheckCircle,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-xl p-5 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          <div className="text-sm text-slate-500">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}