import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Shield,
  Phone,
  ChevronRight,
  User } from
"lucide-react";

const navLinks = [
{ name: "Home", page: "Home" },
{ name: "About", page: "About" },
{ name: "Services", page: "Services" },
{ name: "Contact", page: "Contact" }];


export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await base44.auth.isAuthenticated();
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  // Don't show layout on ClientPortal page
  if (currentPageName === "ClientPortal") {
    return <>{children}</>;
  }

  const isHomePage = currentPageName === "Home";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ?
        "bg-white shadow-sm" :
        isHomePage ?
        "bg-transparent" :
        "bg-[#1a3a52]"}`
        }>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0d4189f13_ChatGPTImageJan13202612_07_16PM.png"
                alt="LumenEx EHS"
                className="w-12 h-12 object-contain" />

              <div>
                <div className={`font-bold text-lg ${
                isScrolled ? "text-slate-900" : "text-white"}`
                }>
                  LumenEx EHS
                </div>
                <div className={`text-xs italic ${
                isScrolled ? "text-[#d4af7a]" : "text-[#d4af7a]"}`
                }>
                  Carer for Carers
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`text-sm font-medium transition-colors ${
                currentPageName === link.page ?
                isScrolled ? "text-[#1a3a52]" : "text-[#d4af7a]" :
                isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"}`
                }>

                  {link.name}
                </Link>
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to={createPageUrl("ClientPortal")}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={isScrolled ? "text-slate-600" : "text-white/80 hover:text-white hover:bg-white/10"}>

                  <User className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button
                  size="sm"
                  className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full px-5">

                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled ? "text-slate-900" : "text-white"}>

                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0d4189f13_ChatGPTImageJan13202612_07_16PM.png"
                        alt="LumenEx EHS"
                        className="w-12 h-12 object-contain" />

                      <div>
                        <div className="font-bold text-lg text-slate-900">LumenEx EHS</div>
                        <div className="text-xs italic text-[#d4af7a]">Carer for Carers</div>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="flex-1 p-6">
                    <div className="space-y-1">
                      {navLinks.map((link) =>
                      <Link
                        key={link.page}
                        to={createPageUrl(link.page)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
                        currentPageName === link.page ?
                        "bg-[#d4af7a]/10 text-[#1a3a52]" :
                        "text-slate-600 hover:bg-slate-50"}`
                        }>

                          {link.name}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        to={createPageUrl("ClientPortal")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-3 px-4 rounded-lg text-slate-600 hover:bg-slate-50">

                        Client Portal
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </nav>

                  <div className="p-6 border-t">
                    <Link to={createPageUrl("Contact")} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={isHomePage ? "" : "pt-20"}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a3a52] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/0d4189f13_ChatGPTImageJan13202612_07_16PM.png"
                  alt="LumenEx EHS"
                  className="w-12 h-12 object-contain" />

                <div>
                  <div className="font-bold text-xl text-white">LumenEx EHS</div>
                  <div className="text-sm italic text-[#d4af7a]">Carer for Carers</div>
                </div>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                Anticipating hazards and providing precise, evidence-based industrial hygiene 
                guidance for those responsible for worker health and safety.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>CIH-Led Practice</span>
                <span>•</span>
                
                
                <span>CSP</span>
                <span>•</span>
                <span>CRSP</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                {navLinks.map((link) =>
                <li key={link.page}>
                    <Link
                    to={createPageUrl(link.page)}
                    className="hover:text-white transition-colors">

                      {link.name}
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to={createPageUrl("ClientPortal")}
                    className="hover:text-white transition-colors">

                    Client Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li>info@lumenexehs.ca</li>
                <li>Toronto, Ontario</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} LumenEx EHS. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to={createPageUrl("TermsAndConditions")} className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}