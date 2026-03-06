import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, ArrowRight, RotateCcw, AlertTriangle,
  CheckCircle, XCircle, Activity, Ear, Info, ChevronDown, ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────
// ACGIH 2018 Audible Sound TLV — Table 1
// Criterion: 85 dBA @ 8 h | Exchange rate: 3 dB
// C-weighted peak absolute limit: 140 dBC
// ─────────────────────────────────────────────────────────────

// Table 1 — permitted durations in hours for each level
// Derived: T = 8 / 2^((L-85)/3)  — matches ACGIH Table 1 exactly
const TABLE1 = [
  { level: 80,  hours: 24      },
  { level: 82,  hours: 16      },
  { level: 85,  hours: 8       },
  { level: 88,  hours: 4       },
  { level: 91,  hours: 2       },
  { level: 94,  hours: 1       },
  { level: 97,  hours: 0.5     },
  { level: 100, hours: 0.25    },
  { level: 103, hours: 0.125   },
  { level: 106, hours: 0.0625  },
  { level: 109, hours: 0.03317 },
  { level: 112, hours: 0.01563 },
  { level: 115, hours: 0.00469 },
  { level: 118, hours: 0.00234 },
  { level: 121, hours: 0.00117 },
  { level: 124, hours: 0.000586 },
  { level: 127, hours: 0.000293 },
  { level: 130, hours: 0.000146 },
  { level: 133, hours: 0.0000732 },
  { level: 136, hours: 0.0000366 },
  { level: 139, hours: 0.0000183 },
  { level: 140, hours: 0.0000133 },
];

// Permitted hours at level L using 3 dB exchange rate, 85 dBA criterion
function permittedHours(level) {
  if (level < 80) return Infinity; // below 80 dBA — not counted per ACGIH
  if (level > 140) return 0;
  return 8 / Math.pow(2, (level - 85) / 3);
}

// Dose % as sum of Ci/Ti fractions (ACGIH formula)
function calcDosePercent(segments) {
  return segments.reduce((acc, s) => {
    const T = permittedHours(Number(s.level));
    if (T === Infinity || T === 0) return acc;
    return acc + Number(s.hours) / T;
  }, 0) * 100;
}

// TWA8 from dose% — inverse: TWA8 = 85 + 3*log2(dose/100)
function doseToTWA8(dosePercent) {
  if (dosePercent <= 0) return 0;
  return 85 + 3 * Math.log2(dosePercent / 100);
}

// Closest permitted hours from Table 1 for display
function closestTableEntry(level) {
  const l = Number(level);
  let best = TABLE1[0];
  let minDiff = Math.abs(l - TABLE1[0].level);
  for (const row of TABLE1) {
    const d = Math.abs(l - row.level);
    if (d < minDiff) { minDiff = d; best = row; }
  }
  return best;
}

function classifyRisk(dosePercent, twa8) {
  if (dosePercent < 50)   return { level: "below",    color: "green",  label: "Below Action Level — Routine Monitoring Advised" };
  if (dosePercent < 100)  return { level: "action",   color: "amber",  label: "At or Near Action Level — Hearing Conservation Program Required" };
  if (dosePercent < 300)  return { level: "over",     color: "orange", label: "TLV Exceeded — Engineering Controls & HCP Mandatory" };
  return                          { level: "severe",   color: "red",    label: "Significant Overexposure — Immediate Controls Required" };
}

const riskUI = {
  green:  { bg: "bg-emerald-50",  border: "border-emerald-300",  text: "text-emerald-700",  bar: "bg-emerald-500",  Icon: CheckCircle },
  amber:  { bg: "bg-amber-50",    border: "border-amber-300",    text: "text-amber-700",    bar: "bg-amber-400",    Icon: AlertTriangle },
  orange: { bg: "bg-orange-50",   border: "border-orange-300",   text: "text-orange-700",   bar: "bg-orange-500",   Icon: AlertTriangle },
  red:    { bg: "bg-red-50",      border: "border-red-300",      text: "text-red-700",      bar: "bg-red-500",      Icon: XCircle },
};

const recommendations = {
  below: [
    "Exposures are below the ACGIH action level (50% dose / ~82 dBA TWA₈).",
    "Maintain periodic monitoring, especially if processes, equipment, or schedules change.",
    "Document findings for due diligence and regulatory records.",
    "Hearing protection should remain available even below the TLV.",
    "A hearing conservation program is recommended — it is required at or above the TLV.",
  ],
  action: [
    "Exposures are at or approaching the ACGIH TLV — a Hearing Conservation Program (HCP) is required.",
    "HCP key elements: exposure monitoring, noise controls, worker training, hearing protection, audiometric testing, and recordkeeping.",
    "Investigate engineering controls: enclosures, vibration isolation, acoustic barriers, quieter equipment substitution.",
    "Administrative controls (task rotation, reduced shift duration) can supplement — not replace — engineering controls.",
    "Ensure all hearing protection devices (HPDs) are properly fitted and provide adequate attenuation for the measured levels.",
    "Professional dosimetry is strongly recommended to verify actual worker exposures across all job roles and tasks.",
  ],
  over: [
    "The ACGIH TLV (85 dBA TWA₈ / 100% dose) is exceeded — regulatory and engineering action is required.",
    "Engineering controls are the priority: enclosures, isolators, damping materials, substitution of quieter equipment.",
    "Restrict exposure duration per Table 1; do not rely solely on hearing protection to manage overexposures.",
    "Audiometric baseline testing must be established for all workers exposed at or above the TLV.",
    "A documented Hearing Conservation Program is required; interim HPDs with sufficient NRR should be issued immediately.",
    "Retain a qualified occupational hygienist to conduct a full dosimetry survey and noise control assessment.",
  ],
  severe: [
    "Exposures are severely elevated — this is a serious and acute hearing hazard.",
    "Immediate steps: restrict access, limit duration of exposure to the minimum possible, and issue double-protection (plugs + muffs).",
    "Note: ACGIH TLV states exposures below 115 dBA may use engineering or administrative controls, but above 115 dBA engineering control of the source is required where feasible.",
    "Remove workers from the area or enforce strict short-duration entries with rated HPDs until controls are in place.",
    "Escalate to senior management and EHS leadership immediately.",
    "Engage a qualified occupational hygienist for an urgent dosimetry survey and engineering control plan.",
  ],
};

// Noise source presets — approximate typical SPL ranges
const SOURCES = [
  { label: "Heavy presses / stamping",         level: 100 },
  { label: "Grinding / power tools",            level: 95  },
  { label: "Compressors / heavy machinery",     level: 92  },
  { label: "Manufacturing floor (general)",     level: 88  },
  { label: "Construction site (moderate)",      level: 85  },
  { label: "Loud HVAC / industrial fans",       level: 82  },
  { label: "Office / light assembly",           level: 68  },
  { label: "Custom — adjust slider below",      level: null },
];

// Ototoxic chemical classes per ACGIH note 2
const OTOTOXINS = [
  "Carbon monoxide", "Hydrogen cyanide", "Lead", "Solvent mixtures",
  "Ethylbenzene", "Styrene", "Toluene", "Xylene",
  "Arsenic", "Carbon disulfide", "Chlorobenzene", "Mercury",
  "Nitriles", "n-Hexane", "Trichloroethylene", "Pesticides",
];

const EMPTY_SEG = { sourceIdx: null, level: 88, hours: 4 };

function fmtHours(h) {
  if (h >= 1) return `${h} hr${h !== 1 ? "s" : ""}`;
  const mins = Math.round(h * 60);
  return mins < 60 ? `${mins} min` : `${h.toFixed(2)} hrs`;
}

export default function NoiseDosimetryAssessor() {
  const [step, setStep] = useState(0);
  const [segments, setSegments] = useState([{ ...EMPTY_SEG }]);
  const [impulsePresent, setImpulsePresent] = useState("no");
  const [peakOver140, setPeakOver140] = useState(false);
  const [ototoxins, setOtotoxins] = useState([]);
  const [newWorkers, setNewWorkers] = useState(false);
  const [pregnantWorkers, setPregnantWorkers] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [result, setResult] = useState(null);

  const addSegment = () => setSegments((s) => [...s, { ...EMPTY_SEG }]);
  const removeSegment = (i) => setSegments((s) => s.filter((_, idx) => idx !== i));
  const updateSeg = (i, key, val) =>
    setSegments((s) => s.map((seg, idx) => (idx === i ? { ...seg, [key]: val } : seg)));

  const totalHours = segments.reduce((a, s) => a + Number(s.hours), 0);

  const calculate = () => {
    const dose = calcDosePercent(segments);
    const twa8 = doseToTWA8(dose);
    const risk = classifyRisk(dose, twa8);
    setResult({ dose: Math.round(dose * 10) / 10, twa8: Math.round(twa8 * 10) / 10, risk, impulsePresent, peakOver140, ototoxins, newWorkers, pregnantWorkers, segments: [...segments] });
    setStep(1);
  };

  const reset = () => {
    setStep(0); setResult(null);
    setSegments([{ ...EMPTY_SEG }]);
    setImpulsePresent("no"); setPeakOver140(false);
    setOtotoxins([]); setNewWorkers(false); setPregnantWorkers(false);
  };

  const toggleOtotoxin = (name) =>
    setOtotoxins((o) => o.includes(name) ? o.filter((x) => x !== name) : [...o, name]);

  return (
    <div className="bg-gradient-to-br from-[#0F2A4A] to-[#1a3a52] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#d4af7a]/20 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-[#d4af7a]" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Interactive Tool</p>
            <h3 className="text-lg font-bold text-white leading-tight">Noise Exposure Dose Screener</h3>
          </div>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">
          Based on the <span className="text-[#d4af7a] font-semibold">ACGIH 2018 Audible Sound TLV</span> — 85 dBA criterion level, <span className="text-[#d4af7a]">3 dB exchange rate</span>, C/T fractional dose formula. Covers all on-the-job exposures from 80–140 dBA. For screening purposes only — does not replace calibrated personal dosimetry.
        </p>

        {/* ACGIH Table 1 toggle */}
        <button
          onClick={() => setShowTable((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#d4af7a] transition-colors"
        >
          {showTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {showTable ? "Hide" : "View"} ACGIH Table 1 — Permitted Exposure Durations
        </button>
        {showTable && (
          <div className="mt-3 overflow-x-auto">
            <table className="text-xs text-slate-300 w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-1.5 pr-6 font-semibold text-slate-400">Duration per Day</th>
                  <th className="text-left py-1.5 font-semibold text-slate-400">Sound Level (dBA)</th>
                </tr>
              </thead>
              <tbody>
                {TABLE1.map((row) => {
                  const h = row.hours;
                  let label;
                  if (h >= 1) label = `${h % 1 === 0 ? h : h.toFixed(0)} hour${h !== 1 ? "s" : ""}`;
                  else if (h >= 1/60) label = `${Math.round(h * 60)} minutes`;
                  else label = `${Math.round(h * 3600)} seconds`;
                  return (
                    <tr key={row.level} className="border-b border-white/5">
                      <td className="py-1 pr-6">{label}</td>
                      <td className={`py-1 font-semibold ${row.level >= 115 ? "text-red-400" : row.level >= 85 ? "text-amber-300" : "text-emerald-400"}`}>{row.level}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={2} className="py-2 text-slate-500 italic">
                    No exposure permitted above 140 dBC (C-weighted peak)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">

          {/* ── STEP 0: Inputs ── */}
          {step === 0 && (
            <motion.div key="inputs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>

              <p className="text-white font-semibold text-sm mb-4">
                Noise Exposure Segments
                <span className="text-slate-400 font-normal ml-2 text-xs">— add one per environment or task type in the worker's day</span>
              </p>

              <div className="space-y-4 mb-4">
                {segments.map((seg, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">Segment {i + 1}</span>
                      {segments.length > 1 && (
                        <button onClick={() => removeSegment(i)} className="text-slate-500 hover:text-red-400 text-xs transition-colors">Remove</button>
                      )}
                    </div>

                    {/* Source presets */}
                    <div>
                      <label className="text-slate-400 text-xs mb-1.5 block">Select a noise source preset (or use slider)</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SOURCES.map((ns, si) => (
                          <button
                            key={si}
                            onClick={() => {
                              updateSeg(i, "sourceIdx", si);
                              if (ns.level !== null) updateSeg(i, "level", ns.level);
                            }}
                            className={`text-xs py-1.5 px-2.5 rounded-lg border text-left transition-all ${
                              seg.sourceIdx === si
                                ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52] font-semibold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            {ns.label}{ns.level !== null && <span className="ml-1 opacity-60">~{ns.level} dBA</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Level slider */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> Sound Level
                        </label>
                        <span className={`text-sm font-bold ${seg.level >= 100 ? "text-red-400" : seg.level >= 85 ? "text-amber-300" : "text-emerald-400"}`}>
                          {seg.level} dBA
                        </span>
                      </div>
                      <input
                        type="range" min={60} max={140} step={1}
                        value={seg.level}
                        onChange={(e) => { updateSeg(i, "level", parseInt(e.target.value)); updateSeg(i, "sourceIdx", SOURCES.length - 1); }}
                        className="w-full accent-[#d4af7a]"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-0.5">
                        <span>60 dBA</span>
                        <span className="text-slate-400 text-xs">Permitted: <span className="text-white font-medium">{fmtHours(Math.min(permittedHours(seg.level), 24))}</span></span>
                        <span>140 dBA</span>
                      </div>
                    </div>

                    {/* Duration picker — 0.5 hr increments */}
                    <div>
                      <label className="text-slate-300 text-xs font-semibold mb-2 block">Duration</label>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,9,10].map((h) => (
                          <button
                            key={h}
                            onClick={() => updateSeg(i, "hours", h)}
                            className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              seg.hours === h
                                ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52] font-bold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/40"
                            }`}
                          >
                            {h % 1 === 0 ? `${h}h` : `${h}h`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Per-segment C/T fraction preview */}
                    {seg.level >= 80 && (
                      <div className="text-xs text-slate-400">
                        Fractional dose contribution:{" "}
                        <span className="text-white font-semibold">
                          {Math.round((seg.hours / permittedHours(seg.level)) * 1000) / 10}%
                        </span>
                        {" "}of daily limit
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addSegment}
                className="w-full py-2 rounded-lg border border-dashed border-white/20 text-slate-400 hover:border-[#d4af7a]/50 hover:text-[#d4af7a] text-xs transition-all mb-6"
              >
                + Add another noise environment / task
              </button>

              {/* ── Additional risk factors ── */}
              <p className="text-white text-sm font-semibold mb-3">Additional Risk Factors <span className="text-slate-400 font-normal text-xs">(per ACGIH notes)</span></p>

              <div className="space-y-4 mb-6">
                {/* Impulse / impact noise */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Ear className="w-3.5 h-3.5" /> Impulse or Impact Noise Present?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: "no",         label: "None" },
                      { val: "occasional", label: "Occasional" },
                      { val: "frequent",   label: "Frequent" },
                    ].map((o) => (
                      <button key={o.val} onClick={() => setImpulsePresent(o.val)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                          impulsePresent === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>{o.label}</button>
                    ))}
                  </div>
                  {impulsePresent !== "no" && (
                    <div className="mt-2">
                      <label className="text-slate-300 text-xs font-semibold mb-1.5 block">
                        Peak C-weighted level above 140 dBC?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ val: false, label: "No / Unknown" }, { val: true, label: "Yes — above 140 dBC" }].map((o) => (
                          <button key={String(o.val)} onClick={() => setPeakOver140(o.val)}
                            className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                              peakOver140 === o.val
                                ? "bg-red-500 border-red-400 text-white"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                            }`}>{o.label}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ototoxic chemicals */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-1 block">
                    Co-exposure to Ototoxic Chemicals? (ACGIH Note 2)
                  </label>
                  <p className="text-slate-500 text-xs mb-2">Select any that apply — these can cause hearing loss and exacerbate noise effects.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {OTOTOXINS.map((name) => (
                      <button key={name} onClick={() => toggleOtotoxin(name)}
                        className={`text-xs py-1 px-2.5 rounded-full border transition-all ${
                          ototoxins.includes(name)
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 font-semibold"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                        }`}>{name}</button>
                    ))}
                  </div>
                </div>

                {/* New workers */}
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

                {/* Pregnant workers */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">
                    Pregnant Workers Present? (ACGIH Note 3)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ val: false, label: "No" }, { val: true, label: "Yes" }].map((o) => (
                      <button key={String(o.val)} onClick={() => setPregnantWorkers(o.val)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                          pregnantWorkers === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>{o.label}</button>
                    ))}
                  </div>
                </div>
              </div>

              {totalHours > 0 && (
                <p className="text-slate-500 text-xs mb-3">
                  Total time entered: <span className="text-slate-300 font-semibold">{totalHours.toFixed(2)} hrs</span>
                  {" "}· Segments below 80 dBA are excluded from dose per ACGIH.
                </p>
              )}

              <Button
                onClick={calculate}
                disabled={totalHours === 0}
                className="w-full bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full disabled:opacity-50"
              >
                Calculate Noise Dose (ACGIH TLV) <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* ── STEP 1: Results ── */}
          {step === 1 && result && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {(() => {
                const rc = riskUI[result.risk.color];
                const { Icon } = rc;
                const cappedDose = Math.min(result.dose, 9999);
                const barWidth = Math.min((cappedDose / 200) * 100, 100); // bar saturates at 200%

                return (
                  <div className="space-y-4">
                    {/* Metric cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                        <p className="text-slate-400 text-xs mb-1">Noise Dose</p>
                        <p className={`text-3xl font-bold ${result.dose >= 100 ? "text-red-400" : result.dose >= 50 ? "text-amber-300" : "text-emerald-400"}`}>
                          {cappedDose}%
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">TLV limit = 100%</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                        <p className="text-slate-400 text-xs mb-1">TWA₈</p>
                        <p className={`text-3xl font-bold ${result.twa8 >= 85 ? "text-red-400" : result.twa8 >= 80 ? "text-amber-300" : "text-emerald-400"}`}>
                          {result.twa8} dBA
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">ACGIH TLV = 85 dBA</p>
                      </div>
                    </div>

                    {/* Dose bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>0%</span>
                        <span className="text-amber-400">50% (action)</span>
                        <span className="text-red-400">100% (TLV)</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${rc.bar}`}
                          style={{ width: `${barWidth}%` }}
                        />
                        {/* 50% marker */}
                        <div className="absolute top-0 bottom-0 w-px bg-amber-400/60" style={{ left: "25%" }} />
                        {/* 100% marker */}
                        <div className="absolute top-0 bottom-0 w-px bg-red-400/80" style={{ left: "50%" }} />
                      </div>
                    </div>

                    {/* Risk classification */}
                    <div className={`rounded-xl border p-4 ${rc.bg} ${rc.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${rc.text} flex-shrink-0`} />
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
                    {(result.peakOver140 || result.impulsePresent !== "no" || result.ototoxins.length > 0 || result.newWorkers || result.pregnantWorkers) && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <p className="text-amber-700 text-xs font-bold">Additional Risk Flags</p>
                        </div>

                        {result.peakOver140 && (
                          <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
                            <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span><strong>Peak C-weighted level exceeds 140 dBC — this is the absolute ACGIH limit.</strong> No unprotected exposure is permitted. Hearing protection must be worn; single protection (plugs or muffs) may not be sufficient — double protection (muffs + plugs) is indicated. Refer to MIL-STD-1474E guidance.</span>
                          </div>
                        )}

                        {result.impulsePresent === "frequent" && !result.peakOver140 && (
                          <p className="text-xs text-amber-700">⚠ Frequent impulse/impact noise is present. A dosimeter or integrating sound level meter (not a standard SLM) must be used per ACGIH — the C/T formula in this tool may underestimate actual dose. Engineering control of the noise source is required if peak levels approach 115 dBA or above.</p>
                        )}
                        {result.impulsePresent === "occasional" && !result.peakOver140 && (
                          <p className="text-xs text-amber-700">⚠ Occasional impulse noise present. Confirm C-weighted peak levels are below 140 dBC. For more accurate assessment, use a dosimeter with 3 dB exchange rate and an 8-hour criterion of 85 dBA.</p>
                        )}

                        {result.ototoxins.length > 0 && (
                          <p className="text-xs text-amber-700">
                            ⚠ Co-exposure to ototoxic substance(s) identified: <strong>{result.ototoxins.join(", ")}</strong>. Per ACGIH Note 2, these can cause hearing loss independently and exacerbate noise-induced effects. Periodic audiograms are advised; carefully review for confounding noise effects.
                          </p>
                        )}

                        {result.newWorkers && (
                          <p className="text-xs text-amber-700">⚠ New or returning workers — establish audiometric baseline within 30 days of first exposure at or above the TLV. Ensure orientation training covers noise hazards and HPD fitting and use.</p>
                        )}

                        {result.pregnantWorkers && (
                          <p className="text-xs text-amber-700">⚠ Per ACGIH Note 3: noise exposure in excess of a C-weighted TWA₈ of 115 dBC or a peak of 155 dBC to the abdomen of pregnant workers beyond the fifth month of pregnancy may cause hearing loss in the fetus. Conduct a separate reproductive hazard assessment.</p>
                        )}
                      </div>
                    )}

                    {/* Segment summary */}
                    <div className="bg-white/5 rounded-lg p-3 space-y-1">
                      <p className="text-slate-400 text-xs font-semibold mb-2">C/T Fractional Dose Breakdown</p>
                      {result.segments.map((s, i) => {
                        const T = permittedHours(s.level);
                        const frac = T === Infinity ? 0 : (s.hours / T) * 100;
                        return (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Seg {i + 1}: {s.level} dBA × {fmtHours(s.hours)}</span>
                            <span className="text-slate-200 font-semibold">{Math.round(frac * 10) / 10}%</span>
                          </div>
                        );
                      })}
                      <div className="border-t border-white/10 pt-1 mt-1 flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Total Dose</span>
                        <span className={result.dose >= 100 ? "text-red-400" : result.dose >= 50 ? "text-amber-300" : "text-emerald-400"}>{result.dose}%</span>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <p>
                        TWA₈ and dose calculated per ACGIH 2018 Audible Sound TLV: 3 dB exchange rate, 85 dBA criterion, C/T fractional dose formula. All exposures from 80–140 dBA included. This tool uses self-reported estimates. Actual worker exposures must be measured with a calibrated Type 2 dosimeter (ANSI S1.25) or integrating SLM (IEC 61672-1) set to 3 dB ER / 85 dBA criterion — particularly where exposures are variable (&gt;±2.5 dB) or impulse noise is present.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <button onClick={reset} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> Recalculate
                      </button>
                      <Link to={`${createPageUrl("Contact")}?service=noise_physical`} className="ml-auto">
                        <Button size="sm" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full text-xs px-5">
                          Get a Professional Noise Survey →
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