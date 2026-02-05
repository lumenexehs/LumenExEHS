import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";
import { Headphones, Phone, Mail, MessageSquare, Loader2, CheckCircle } from "lucide-react";

export default function SupportContact({ projects = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "medium",
    project_id: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await base44.entities.SupportTicket.create(formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({ subject: "", message: "", priority: "medium", project_id: "" });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
          <Headphones className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Need Help?</h3>
          <p className="text-sm text-slate-500">We're here to support you</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <a 
          href="tel:+16479759541" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Phone className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-sm font-medium text-slate-700">(647) 975-9541</div>
            <div className="text-xs text-slate-500">Mon-Fri, 8am-6pm EST</div>
          </div>
        </a>
        <a 
          href="mailto:info@lumenexehs.ca"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Mail className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-sm font-medium text-slate-700">info@lumenexehs.ca</div>
            <div className="text-xs text-slate-500">Response within 24 hours</div>
          </div>
        </a>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Submit Support Request
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Support Request</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll get back to you promptly.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Request Submitted!</h4>
              <p className="text-sm text-slate-500">We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Related Project</Label>
                  <Select
                    value={formData.project_id}
                    onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>None</SelectItem>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your issue in detail..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}