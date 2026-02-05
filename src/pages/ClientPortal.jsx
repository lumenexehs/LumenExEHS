import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  FolderKanban, 
  FileText, 
  Search,
  User,
  LogOut,
  RefreshCw
} from "lucide-react";
import ProjectCard from "@/components/portal/ProjectCard";
import DocumentCard from "@/components/portal/DocumentCard";

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">Client Portal</h1>
                <p className="text-xs text-slate-500">EHS Consulting</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>{user?.full_name || user?.email}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-700"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.full_name?.split(" ")[0] || "Client"}
          </h2>
          <p className="text-slate-600">
            Track your projects and access your documents in one place.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {projects.length}
            </div>
            <div className="text-sm text-slate-500">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {projects.filter(p => p.status === "in_progress").length}
            </div>
            <div className="text-sm text-slate-500">Active Projects</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {documents.length}
            </div>
            <div className="text-sm text-slate-500">Documents</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="text-3xl font-bold text-amber-600 mb-1">
              {documents.filter(d => d.status === "pending" || d.status === "in_review").length}
            </div>
            <div className="text-sm text-slate-500">Pending Review</div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search projects and documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-white"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white border">
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => { refetchProjects(); refetchDocuments(); }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <TabsContent value="projects" className="space-y-4">
            {projectsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Projects Yet</h3>
                <p className="text-slate-500">
                  Your active projects will appear here once they're started.
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
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {documentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Documents Yet</h3>
                <p className="text-slate-500">
                  Your documents and reports will appear here.
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}