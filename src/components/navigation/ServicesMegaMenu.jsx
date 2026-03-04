import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight } from "lucide-react";

const megaMenuData = [
  {
    category: "Services",
    items: [
      { name: "All Services", page: "Services" },
      { name: "Occupational Hygiene", page: "Services" },
      { name: "Risk Assessment", page: "Services" },
      { name: "Training", page: "Services" }
    ]
  },
  {
    category: "By Sector",
    items: [
      { name: "Education", page: "SectorEducation" },
      { name: "Manufacturing", page: "SectorManufacturing" },
      { name: "Public Sector", page: "SectorPublicSector" },
      { name: "Healthcare", page: "SectorHealthcare" },
      { name: "Construction", page: "SectorConstruction" },
      { name: "Residential / Property", page: "SectorResidential" }
    ]
  }
];

export default function ServicesMegaMenu() {
  return (
    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-100 py-6 z-50">
      <div className="grid grid-cols-2 gap-8 px-6">
        {megaMenuData.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-4">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.page}>
                  <Link
                    to={createPageUrl(item.page)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors group"
                  >
                    {item.name}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}