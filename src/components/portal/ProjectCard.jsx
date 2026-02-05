import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  planning: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  review: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700"
};

const serviceLabels = {
  environmental_audit: "Environmental Audit",
  safety_assessment: "Safety Assessment",
  compliance_review: "Compliance Review",
  training: "EHS Training",
  risk_assessment: "Risk Assessment",
  permit_assistance: "Permit Assistance"
};

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg mb-1">
            {project.name}
          </h3>
          <span className="text-sm text-slate-500">
            {serviceLabels[project.service_type] || project.service_type}
          </span>
        </div>
        <Badge className={statusColors[project.status] || statusColors.planning}>
          {(project.status || "planning").replace("_", " ")}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Progress</span>
            <span className="font-medium text-slate-700">{project.progress || 0}%</span>
          </div>
          <Progress value={project.progress || 0} className="h-2" />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          {project.start_date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Started {format(new Date(project.start_date), "MMM d, yyyy")}</span>
            </div>
          )}
          {project.end_date && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Due {format(new Date(project.end_date), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>

        {project.consultant_name && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4 text-slate-400" />
            <span>Consultant: {project.consultant_name}</span>
          </div>
        )}

        {project.next_steps && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm mb-1">
              <ArrowRight className="w-4 h-4" />
              Next Steps
            </div>
            <p className="text-sm text-emerald-800">{project.next_steps}</p>
          </div>
        )}

        {project.notes && !project.next_steps && (
          <p className="text-sm text-slate-600 border-t pt-4">
            {project.notes}
          </p>
        )}
      </div>
    </div>
  );
}