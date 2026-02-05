import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  User,
  LogOut,
  RefreshCw,
  Menu,
  FolderKanban,
  FileText,
  Shield,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

import DashboardStats from "@/components/portal/DashboardStats";
import ProjectCard from "@/components/portal/ProjectCard";
import DocumentCard from "@/components/portal/DocumentCard";
import SupportContact from "@/components/portal/SupportContact";
import PortalSidebar from "@/components/portal/PortalSidebar";
import MobileNav from "@/components/portal/MobileNav";

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.pathname);
        return;
      }
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const { data: projects = [], isLoading: projectsLoading, refetch: refetchProjects } = useQuery({
    queryKey: ["projects", user?.email],
    queryFn: () => base44.entities.Project.filter({ client_email: user?.email }, "-created_date"),
    enabled: !!user?.email
  });

  const { data: documents = [], isLoading: documentsLoading, refetch: refetchDocuments } = useQuery({
    queryKey: ["documents", user?.email],
    queryFn: () => base44.entities.Document.filter({ created_by: user?.email }, "-created_date"),
    enabled: !!user?.email
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.service_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDocuments = documents.filter(d =>
    d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeProjects = projects.filter(p => p.status === "in_progress");
  const recentDocuments = documents.slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <PortalSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a3a52] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#d4af7a]" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">EHS</div>
              <div className="text-xs text-slate-500">Client Portal</div>
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="py-4">
                <div className="flex items-center gap-3 px-2 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-medium">
                      {user?.full_name?.[0] || "U"}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{user?.full_name || "Client"}</div>
                    <div className="text-sm text-slate-500">{user?.email}</div>
                  </div>
                </div>
                
                <Link to={createPageUrl("Home")}>
                  <Button variant="outline" className="w-full mb-2">Back to Website</Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pb-20 lg:pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Welcome */}
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back, {user?.full_name?.split(" ")[0] || "Client"}
                </h1>
                <p className="text-slate-500">Here's an overview of your EHS projects</p>
              </div>

              {/* Stats */}
              <DashboardStats projects={projects} documents={documents} />

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Projects */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Active Projects</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActiveTab("projects")}
                      className="text-emerald-600"
                    >
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  {projectsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
                    </div>
                  ) : activeProjects.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                      <FolderKanban className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No active projects at the moment</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeProjects.slice(0, 2).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar - Support & Recent Docs */}
                <div className="space-y-6">
                  <SupportContact projects={projects} />

                  {/* Recent Documents */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Recent Documents</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab("documents")}
                        className="text-emerald-600 text-xs"
                      >
                        View All
                      </Button>
                    </div>
                    
                    {recentDocuments.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-4">No documents yet</p>
                    ) : (
                      <div className="space-y-3">
                        {recentDocuments.map((doc) => (
                          <div 
                            key={doc.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                          >
                            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                              <FileText className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-slate-700 truncate">
                                {doc.title}
                              </div>
                              <div className="text-xs text-slate-400">
                                {format(new Date(doc.created_date), "MMM d, yyyy")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects View */}
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                  <p className="text-slate-500">Track progress and next steps for all your projects</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetchProjects()}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-white"
                />
              </div>

              {projectsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Projects Found</h3>
                  <p className="text-slate-500">
                    {searchQuery ? "Try a different search term" : "Your projects will appear here once started"}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Documents View */}
          {activeTab === "documents" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
                  <p className="text-slate-500">Access all your reports, certificates, and files</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetchDocuments()}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-white"
                />
              </div>

              {documentsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Documents Found</h3>
                  <p className="text-slate-500">
                    {searchQuery ? "Try a different search term" : "Your documents will appear here"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDocuments.map((document) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DocumentCard document={document} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Support View */}
          {activeTab === "support" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Support</h1>
                <p className="text-slate-500">Get help from our team</p>
              </div>

              <div className="max-w-md">
                <SupportContact projects={projects} />
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}