import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  Mail,
  Link as LinkIcon,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function ResultsPanel({
  effectiveWBGT,
  timeWeightedMetabolic,
  zone,
  guidance,
  location,
  shiftHours,
  clothingLabel,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const zoneIcons = {
    "below-al": <CheckCircle className="w-6 h-6 text-green-600" />,
    "between": <AlertCircle className="w-6 h-6 text-yellow-600" />,
    "exceeds-tlv": <AlertTriangle className="w-6 h-6 text-red-600" />,
  };

  const resultsText = `
Heat Stress Screening Summary
=============================
Effective WBGT: ${effectiveWBGT.toFixed(1)}°C
Time-Weighted Metabolic Rate: ${timeWeightedMetabolic}W
Screening Zone: ${zone.label}
Location: ${location || "Not specified"}
Shift Length: ${shiftHours} hours
Clothing: ${clothingLabel}

Guidance:
${guidance.map((g) => `• ${g}`).join("\n")}
  `.trim();

  const handleCopyResults = async () => {
    await navigator.clipboard.writeText(resultsText);
  };

  const handleShareLink = () => {
    const params = new URLSearchParams({
      wbgt: effectiveWBGT.toFixed(1),
      metabolic: timeWeightedMetabolic,
      zone: zone.zone,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
  };

  const handleSendEmail = async () => {
    if (!emailInput || !emailInput.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSendingEmail(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: emailInput,
        subject: "Your Heat Stress Screening Results - LumenEx EHS",
        body: `
Hello,

Here are your heat stress screening results from the LumenEx EHS calculator:

${resultsText}

---

This screening tool provides guidance only and does not replace a formal heat stress assessment by a qualified professional.

Would you like to schedule a professional heat stress assessment? Contact us at info@lumenexehs.ca or visit our website.

Best regards,
LumenEx EHS
        `,
      });

      setEmailSent(true);
      setTimeout(() => {
        setShowEmailDialog(false);
        setEmailInput("");
        setEmailSent(false);
      }, 2000);
    } catch (error) {
      alert("Error sending email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <div
        className={`rounded-2xl border-2 p-8 ${zone.color}`}
      >
        <div className="flex items-center gap-4 mb-6">
          {zoneIcons[zone.zone]}
          <h3 className={`text-2xl font-bold ${zone.textColor}`}>{zone.label}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-slate-600 mb-1">Effective WBGT</p>
            <p className="text-3xl font-bold text-slate-900">{effectiveWBGT.toFixed(1)}°C</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Time-Weighted Metabolic Rate</p>
            <p className="text-3xl font-bold text-slate-900">{timeWeightedMetabolic}W</p>
          </div>
        </div>

        {location && (
          <p className="text-sm text-slate-700 mt-4">
            <span className="font-semibold">Location:</span> {location}
          </p>
        )}
      </div>

      {/* Guidance */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">What This Means</h4>
        <ul className="space-y-2">
          {guidance.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-slate-400 mt-1">•</span>
              <span className="text-slate-700 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopyResults}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Results
        </Button>
        <Button
          onClick={handleShareLink}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LinkIcon className="w-4 h-4" />
          Share Link
        </Button>
        <Button
          onClick={() => setShowEmailDialog(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Results
        </Button>
      </div>

      {/* Assumptions */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
          <ChevronDown className="w-4 h-4" />
          Assumptions & Limitations
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 text-sm text-slate-600 space-y-2">
          <p>• Screening tool only — does not replace professional assessment</p>
          <p>• WBGT measurement quality and timing affect accuracy</p>
          <p>• Results depend on accurate metabolic rate and task allocation data</p>
          <p>• Acclimatization status not considered</p>
          <p>• Individual susceptibility to heat stress varies</p>
        </CollapsibleContent>
      </Collapsible>

      {/* Disclaimer */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 text-sm">
          This calculator provides <strong>screening-level guidance only</strong> and does not
          replace a formal heat stress assessment by a qualified professional. Regulatory
          requirements and site conditions may require additional evaluation.
        </AlertDescription>
      </Alert>

      {/* CTA Buttons */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Button
          onClick={() => window.location.href = "/contact?service=heat_stress"}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Request a Heat Stress Assessment
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = "/contact?service=consultation"}
        >
          Book a 15-Minute Consultation
        </Button>
      </div>

      {/* Email Dialog */}
      <AlertDialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Results to Email</AlertDialogTitle>
            <AlertDialogDescription>
              We'll send your screening summary to the email address below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {emailSent ? (
            <div className="py-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="text-sm text-slate-700 font-semibold">Results sent successfully!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-2"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSendEmail}
                  disabled={isSendingEmail}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isSendingEmail ? "Sending..." : "Send"}
                </AlertDialogAction>
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}