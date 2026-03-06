import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowRight, RotateCcw, AlertTriangle, CheckCircle, XCircle, Activity, Ear } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

/**
 * Noise Risk Screener
 * Based on Ontario O. Reg 381/15 (action level 80 dBA / limit 85 dBA TWA8)
 * and published occupational noise exposure guidelines (ACGIH, NIOSH).
 *
 * TWA8 estimation: uses 5 dB exchange rate (Ontario / ACGIH) to combine
 * multiple exposure segments.
 */

// Criterion level = 85 dBA, exchange rate = 5 dB (Ontario / ACGIH criterion)
function twa8(segments) {
  // segments: [{level, hours}]
  const criterion = 85;
  const exchangeRate = 5;
  const sum = segments.reduce((acc, s) => {
    const permittedHours = Math.pow(10, (criterion - s.level) / (exchangeRate / Math.log10(2)));
    return acc + s.hours / permittedHours;
  }, 0);
  if (sum <= 0) return 0;
  return criterion - (exchangeRate / Math.log10(2)) * Math.log10(1 / sum);
}

function classifyRisk(twa) {
  if (twa < 80)  return { level: "low",      color: "green",  label: "Below Action Level — Monitoring Recommended" };
  if (twa < 85)  return { level: "moderate", color: "amber",  label: "At Action Level — Controls & Monitoring Required" };
  if (twa < 100) return { level: "high",     color: "orange", label: "Exceeds Permissible Limit — Engineering Controls Required" };
  return         { level: "extreme",         color: "red",    label: "Significant Overexposure — Immediate Action Required" };
}

const riskColors = {
  green:  { bg: "bg-emerald-50",  border: "border-emerald-300",  text: "text-emerald-700",  Icon: CheckCircle },
  amber:  { bg: "bg-amber-50",    border: "border-amber-300",    text: "text-amber-700",    Icon: AlertTriangle },
  orange: { bg: "bg-orange-50",   border: "border-orange-300",   text: "text-orange-700",   Icon: AlertTriangle },
  red:    { bg: "bg-red-50",      border: "border-red-300",      text: "text-red-700",      Icon: XCircle },
};

const recommendations = {
  low: [
    "Noise levels are currently below the Ontario action level of 80 dBA TWA₈",
    "Conduct periodic monitoring — especially if processes, equipment, or occupancy change",
    "Maintain an inventory of noise-generating equipment and review annually",
    "Hearing protection should remain available but is not mandatory at this level",
    "Document findings for due diligence and regulatory records",
  ],
  moderate: [
    "Noise is at or above Ontario's 80 dBA action level — formal controls and documentation are required",
    "Implement a Hearing Conservation Program: audiometric testing, training, hearing protection supply",
    "Post noise hazard signage in areas at or above 85 dBA",
    "Engineering controls (enclosures, vibration isolation, absorption panels) should be investigated",
    "Restrict exposure time using administrative rotation before relying solely on PPE",
    "Professional noise dosimetry is recommended to confirm exposures across all job roles",
  ],
  high: [
    "Exposures exceed Ontario's permissible exposure limit of 85 dBA TWA₈ — regulatory action is required",
    "Engineering controls are the priority: enclosures, barriers, damping, isolation mounts, or quieter equipment",
    "Until controls are in place: limit duration of exposure and provide rated hearing protection",
    "Audiometric baseline testing must be conducted for all exposed workers",
    "A documented Hearing Conservation Program is legally required under O. Reg 381/15",
    "Personal noise dosimetry by a qualified professional is strongly recommended",
  ],
  extreme: [
    "Exposure levels are severely elevated — this constitutes an immediate health risk",
    "Stop or severely limit exposure in affected areas until controls are implemented",
    "Escalate to senior management and EHS immediately",
    "Engineering controls must be implemented — hearing protection alone is insufficient at this level",
    "Workers must be removed from the area or have strictly controlled short-duration entries with rated HPDs",
    "Retain a qualified occupational hygienist for a full dosimetry survey and control plan",
  ],
};

// Preset noise source profiles
const noiseSources = [
  { label: "Heavy machinery / compressors",  level: 95 },
  { label: "Power tools (grinders, drills)",  level: 92 },
  { label: "Manufacturing floor / presses",   level: 88 },
  { label: "Construction site (moderate)",    level: 85 },
  { label: "Loud ventilation / HVAC fans",    level: 82 },
  { label: "Office / light assembly",         level: 70 },
  { label: "Custom — enter manually",         level: null },
];

const EMPTY_SEG = { sourceIndex: null, level: 88, hours: 4 };

export default function NoiseDosimetryAssessor() {
  const [step, setStep] = useState(0);
  const [segments, setSegments] = useState([{ ...EMPTY_SEG }]);
  const [impulse, setImpulse] = useState("no");
  const [newWorkers, setNewWorkers] = useState(false);
  const [result, setResult] = useState(null);

  const addSegment = () => setSegments((s) => [...s, { ...EMPTY_SEG }]);
  const removeSegment = (i) => setSegments((s) => s.filter((_, idx) => idx !== i));

  const updateSeg = (i, key, val) =>
    setSegments((s) => s.map((seg, idx) => (idx === i ? { ...seg, [key]: val } : seg)));

  const totalHours = segments.reduce((a, s) => a + Number(s.hours), 0);

  const calculate = () => {
    const segs = segments.map((s) => ({ level: Number(s.level), hours: Number(s.hours) }));
    const twa = twa8(segs);
    const risk = classifyRisk(twa);
    setResult({ twa: Math.round(twa * 10) / 10, risk, impulse, newWorkers, segments: [...segments] });
    setStep(1);
  };

  const reset = () => { setStep(0); setResult(null); setSegments([{ ...EMPTY_SEG }]); setImpulse("no"); setNewWorkers(false); };

  return (
    <div className="bg-gradient-to-br from-[#0F2A4A] to-[#1a3a52] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-[#d4af7a]/20 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-[#d4af7a]" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Interactive Tool</p>
            <h3 className="text-lg font-bold text-white leading-tight">Noise Exposure Primary Screener</h3>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2">
          Estimates an 8-hour TWA noise dose using the 5 dB exchange rate (Ontario O. Reg 381/15 / ACGIH criterion). Enter noise levels and durations for each task or environment in a worker's day. For screening purposes only.
        </p>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">

          {/* Step 0: Inputs */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white font-semibold mb-4 text-sm">Noise Exposure Segments — add one per environment or task</p>

              <div className="space-y-4 mb-4">
                {segments.map((seg, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">Segment {i + 1}</span>
                      {segments.length > 1 && (
                        <button onClick={() => removeSegment(i)} className="text-slate-400 hover:text-red-400 text-xs transition-colors">Remove</button>
                      )}
                    </div>

                    {/* Source selector */}
                    <div>
                      <label className="text-slate-400 text-xs mb-1.5 block">Noise Source (or select a preset)</label>
                      <div className="grid grid-cols-2 gap-1.5 mb-2">
                        {noiseSources.map((ns, si) => (
                          <button
                            key={si}
                            onClick={() => {
                              updateSeg(i, "sourceIndex", si);
                              if (ns.level !== null) updateSeg(i, "level", ns.level);
                            }}
                            className={`text-xs py-1.5 px-2 rounded-lg border text-left transition-all ${
                              seg.sourceIndex === si
                                ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52] font-semibold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            {ns.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Level slider */}
                    <div>
                      <label className="text-slate-300 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Sound Level: <span className="text-[#d4af7a] font-bold ml-1">{seg.level} dBA</span>
                      </label>
                      <input
                        type="range" min={60} max={115} step={1}
                        value={seg.level}
                        onChange={(e) => { updateSeg(i, "level", parseInt(e.target.value)); updateSeg(i, "sourceIndex", noiseSources.length - 1); }}
                        className="w-full accent-[#d4af7a]"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-0.5"><span>60 dBA</span><span>115 dBA</span></div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="text-slate-300 text-xs font-semibold mb-1.5 block">
                        Duration: <span className="text-[#d4af7a] font-bold">{seg.hours} hr{seg.hours !== 1 ? "s" : ""}</span>
                      </label>
                      <input
                        type="range" min={0.25} max={10} step={0.25}
                        value={seg.hours}
                        onChange={(e) => updateSeg(i, "hours", parseFloat(e.target.value))}
                        className="w-full accent-[#d4af7a]"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-0.5"><span>15 min</span><span>10 hrs</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addSegment}
                className="w-full py-2 rounded-lg border border-dashed border-white/20 text-slate-400 hover:border-[#d4af7a]/50 hover:text-[#d4af7a] text-xs transition-all mb-5"
              >
                + Add another noise environment / task
              </button>

              {/* Additional risk factors */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">
                    <Ear className="w-3.5 h-3.5 inline mr-1" /> Impulse or Impact Noise Present?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: "no",       label: "No" },
                      { val: "occasional", label: "Occasional (<10/day)" },
                      { val: "frequent",  label: "Frequent (>10/day)" },
                    ].map((o) => (
                      <button key={o.val} onClick={() => setImpulse(o.val)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                          impulse === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>{o.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">New or Returning Workers in This Area?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ val: false, label: "No" }, { val: true, label: "Yes" }].map((o) => (
                      <button key={String(o.val)} onClick={() => setNewWorkers(o.val)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                          newWorkers === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>{o.label}</button>
                    ))}
                  </div>
                </div>
              </div>

              {totalHours > 0 && (
                <p className="text-slate-500 text-xs mb-3">Total exposure time entered: <span className="text-slate-300 font-semibold">{totalHours.toFixed(2)} hrs</span></p>
              )}

              <Button
                onClick={calculate}
                disabled={totalHours === 0}
                className="w-full bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full disabled:opacity-50"
              >
                Calculate Noise Dose <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* Step 1: Results */}
          {step === 1 && result && (
            <motion.div key="step1" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {(() => {
                const rc = riskColors[result.risk.color];
                const { Icon } = rc;
                const dose = Math.round(Math.pow(10, (result.twa - 85) / (5 / Math.log10(2))) * 100);

                return (
                  <div className="space-y-4">
                    {/* Main metric */}
                    <div className="text-center py-4">
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Estimated Noise Dose (TWA₈)</p>
                      <p className="text-5xl font-bold text-[#d4af7a]">{result.twa} dBA</p>
                      <p className="text-slate-400 text-xs mt-1">
                        ≈ <span className="text-white font-semibold">{Math.min(dose, 9999)}%</span> of permissible daily dose (Ontario limit = 85 dBA / 100%)
                      </p>
                    </div>

                    {/* Risk card */}
                    <div className={`rounded-xl border p-4 ${rc.bg} ${rc.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${rc.text}`} />
                        <span className={`font-bold text-sm ${rc.text}`}>{result.risk.label}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {recommendations[result.risk.level].map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional flags */}
                    {(result.impulse !== "no" || result.newWorkers) && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1.5">
                        <p className="text-amber-700 text-xs font-bold mb-1">Additional Risk Factors Identified</p>
                        {result.impulse === "frequent" && (
                          <p className="text-xs text-amber-700">⚠ Frequent impulse/impact noise is present — peak levels may exceed 140 dBC, requiring separate evaluation regardless of TWA. Engineering controls (dampening, enclosures) are priority.</p>
                        )}
                        {result.impulse === "occasional" && (
                          <p className="text-xs text-amber-700">⚠ Occasional impulse noise noted — monitor peak levels. Workers should not be exposed to peaks above 140 dBC (Ontario / ACGIH criterion).</p>
                        )}
                        {result.newWorkers && (
                          <p className="text-xs text-amber-700">⚠ New or returning workers are present — establish audiometric baseline within 30 days of first exposure at or above the action level. Ensure orientation training covers noise hazards and HPD use.</p>
                        )}
                      </div>
                    )}

                    {/* Inputs summary */}
                    <div className="bg-white/5 rounded-lg p-3 text-xs text-slate-400 space-y-1">
                      {result.segments.map((s, i) => (
                        <div key={i} className="flex justify-between">
                          <span>Segment {i + 1}</span>
                          <span className="text-slate-200">{s.level} dBA × {s.hours} hr{s.hours !== 1 ? "s" : ""}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      TWA₈ calculated using the 5 dB exchange rate (Ontario O. Reg 381/15 / ACGIH criterion). This tool uses self-reported estimates and is a screening aid only — not a substitute for calibrated personal noise dosimetry conducted by a qualified occupational hygienist.
                    </p>

                    <div className="flex items-center gap-3">
                      <button onClick={reset} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> Recalculate
                      </button>
                      <Link to={`${createPageUrl("Contact")}?service=noise_physical`} className="ml-auto">
                        <Button size="sm" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full text-xs px-4">
                          Get a Professional Noise Survey
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}