import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { t } from "@/components/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Loader2
} from "lucide-react";

const serviceOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "occupational_hygiene", label: "Occupational Hygiene & Exposure Assessment" },
  { value: "noise_physical", label: "Noise, Radiation & Physical Agents" },
  { value: "heat_stress", label: "Heat Stress Monitoring" },
  { value: "ergonomics", label: "Ergonomics Assessment" },
  { value: "iaq", label: "Indoor Air Quality, Odour & Vapour Intrusion" },
  { value: "microbial", label: "Microbial Contamination & Exposure" },
  { value: "radon", label: "Radon Safety Inspection" },
  { value: "ehs_programs", label: "EH&S Program & Policy Development" },
  { value: "chemical_prestart", label: "Chemical Prestart Health & Safety Review" },
  { value: "safety_management", label: "Safety Management System Development" },
  { value: "training", label: "Training" },
  { value: "risk_assessment", label: "Risk Assessment" }
];

export default function Contact() {
  const { lang } = useLang();
  const tr = t[lang].contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service_interest: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service");
    if (service) {
      setFormData(prev => ({ ...prev, service_interest: service }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await base44.entities.ContactMessage.create(formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F2A4A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              {tr.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              {tr.heroTitle}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              {tr.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {tr.whatHappensTitle}
                </h2>
                <div className="space-y-4 mb-8">
                  {tr.steps.map((text, idx) => ({ step: String(idx + 1), text })).map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-slate-700 text-sm">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:info@lumenexehs.ca" className="text-slate-600 hover:text-emerald-600 transition-colors">info@lumenexehs.ca</a>
                    <p className="text-sm text-slate-500 mt-0.5">Response within 1 business day</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                    <p className="text-slate-600">Toronto, Ontario</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-slate-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      Message Received
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto">
                      We'll review your concern and follow up within 1 business day with a clear recommendation.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      Project Inquiry
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="John Smith"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="john@company.com"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Acme Corporation"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="(555) 000-0000"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service of Interest</Label>
                        <Select
                          value={formData.service_interest}
                          onValueChange={(value) => handleChange("service_interest", value)}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Describe your assessment needs, agents of concern, or regulatory questions..."
                          required
                          className="min-h-[150px] resize-none"
                        />
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 rounded-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-slate-500 text-center">
                        By submitting this form, you agree to our privacy policy.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}