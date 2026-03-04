import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Home } from "lucide-react";

const pageNames = {
  Home: "Home",
  About: "About",
  Services: "Services",
  KnowledgeHub: "Knowledge Hub",
  Careers: "Careers",
  Contact: "Contact",
  SectorEducation: "Education Sector",
  SectorManufacturing: "Manufacturing Sector",
  SectorPublicSector: "Public Sector",
  SectorHealthcare: "Healthcare Sector",
  SectorConstruction: "Construction Sector",
  SectorResidential: "Residential Sector",
  ClientPortal: "Client Portal",
  PrivacyPolicy: "Privacy Policy",
  TermsAndConditions: "Terms & Conditions",
  Article: "Article"
};

export default function Breadcrumbs({ currentPageName }) {
  // Don't show breadcrumbs on home page
  if (currentPageName === "Home" || currentPageName === "ClientPortal") {
    return null;
  }

  const breadcrumbs = [
    { name: "Home", page: "Home" },
    { name: pageNames[currentPageName] || currentPageName, page: null }
  ];

  // Add sector parent for sector pages
  if (currentPageName && currentPageName.startsWith("Sector")) {
    breadcrumbs.splice(1, 0, { name: "Services", page: "Services" });
  }

  return (
    <nav className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
              {crumb.page ? (
                <Link
                  to={createPageUrl(crumb.page)}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-slate-900 font-medium">{crumb.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}