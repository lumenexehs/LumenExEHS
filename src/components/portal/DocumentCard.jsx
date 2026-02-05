import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  FileCheck, 
  FileWarning,
  Download,
  ExternalLink 
} from "lucide-react";
import { format } from "date-fns";

const categoryIcons = {
  report: FileText,
  certificate: FileCheck,
  audit: FileWarning,
  training: FileText,
  compliance: FileCheck,
  other: FileText
};

const categoryColors = {
  report: "bg-blue-50 text-blue-600",
  certificate: "bg-emerald-50 text-emerald-600",
  audit: "bg-amber-50 text-amber-600",
  training: "bg-purple-50 text-purple-600",
  compliance: "bg-cyan-50 text-cyan-600",
  other: "bg-slate-50 text-slate-600"
};

const statusColors = {
  pending: "bg-slate-100 text-slate-600",
  in_review: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  archived: "bg-slate-100 text-slate-500"
};

export default function DocumentCard({ document }) {
  const Icon = categoryIcons[document.category] || FileText;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors[document.category] || categoryColors.other}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-medium text-slate-900 truncate">
              {document.title}
            </h4>
            <Badge className={statusColors[document.status] || statusColors.pending} variant="secondary">
              {(document.status || "pending").replace("_", " ")}
            </Badge>
          </div>
          
          {document.description && (
            <p className="text-sm text-slate-500 mb-2 line-clamp-2">
              {document.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="capitalize">{document.category}</span>
              {document.project_name && (
                <>
                  <span>•</span>
                  <span>{document.project_name}</span>
                </>
              )}
              <span>•</span>
              <span>{format(new Date(document.created_date), "MMM d, yyyy")}</span>
            </div>
            
            {document.file_url && (
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700" asChild>
                <a href={document.file_url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}