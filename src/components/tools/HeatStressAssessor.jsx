import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Wind, Sun, User, AlertTriangle, CheckCircle, XCircle, ChevronDown, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

// ACGIH TLV for Heat Stress — Work-Rest Regimens (°C WBGT)
// Based on ACGIH 2024 TLV Booklet — Appendix A
// Rows: Work intensity — Light (<200W), Moderate (200-350W), Heavy (350-500W), Very Heavy (>500W)
// Cols: Work/Rest ratio — 75-100%, 50-75%, 25-50%, 0-25%
const ACGIH_WBGT_TLV = {
  light:      [31.0, 28.0, 30.0, 32.0], // Light: 100%, 75%, 50%, 25%
  moderate:   [28.0, 26.0, 29.0, 31.0],
  heavy:      [null, 26.0, 27.0, 30.0], // null = not recommended
  very_heavy: [null, null,  25.0, 28.0],
};

// Simplified WBGT approximation for outdoor (sunny) conditions
// WBGT ≈ 0.7 × Twb + 0.2 × Tg + 0.1 × Ta
// We approximate: Twb from Ta + RH, Tg = Ta + solar load offset
function estimateWBGT({ airTemp, humidity, solarLoad, windSpeed }) {
  // Wet bulb approx (Stull formula)
  const Twb = airTemp * Math.atan(0.151977 * Math.pow(humidity + 8.313659, 0.5))
    + Math.atan(airTemp + humidity)
    - Math.atan(humidity - 1.676331)
    + 0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity)
    - 4.686035;

  // Globe temp: solar adds heat, wind removes it
  const solarOffsets = { none: 0, partial: 4, full: 10 };
  const windPenalty = windSpeed === "still" ? 0 : windSpeed === "light" ? -2 : -4;
  const Tg = airTemp + solarOffsets[solarLoad] + windPenalty;

  const wbgt = 0.7 * Twb + 0.2 * Tg + 0.1 * airTemp;
  return Math.round(wbgt * 10) / 10;
}

function getRisk(wbgt, workload, workRatio) {
  const ratioIndex = ["100", "75", "50", "25"].indexOf(workRatio);
  const tlv = ACGIH_WBGT_TLV[workload]?.[ratioIndex];

  if (tlv === null) {
    return { level: "extreme", label: "Not Recommended", color: "red", tlv: null };
  }
  const diff = wbgt - tlv;
  if (diff > 3) return { level: "extreme", label: "Extreme Risk — Stop Work", color: "red", tlv };
  if (diff > 0) return { level: "high", label: "Exceeds ACGIH TLV® — Immediate Action Required", color: "orange", tlv };
  if (diff > -2) return { level: "moderate", label: "Approaching Limit — Controls Needed", color: "amber", tlv };
  return { level: "low", label: "Within Acceptable Limits", color: "green", tlv };
}

const workloadDescriptions = {
  light: "Sitting/standing, light hand/arm work, occasional walking (e.g., painting, light assembly)",
  moderate: "Walking, moderate lifting, sustained arm/hand work (e.g., laying bricks, framing)",
  heavy: "Heavy arm/leg work, carrying loads (e.g., digging, heavy excavation, shovelling)",
  very_heavy: "Maximum exertion — pick-and-shovel work, climbing with load",
};

const controls = {
  extreme: [
    "Stop all outdoor work immediately until WBGT drops",
    "Move workers to shade or air-conditioned rest areas",
    "Mandatory medical monitoring for all workers on site",
    "Re-evaluate before resuming — professional WBGT assessment required",
  ],
  high: [
    "Implement 0–25% work / 75–100% rest schedule in shade",
    "Mandatory water: 250 mL every 15–20 minutes",
    "Buddy system — no worker alone in hot environment",
    "Remove non-essential personnel from outdoor areas",
    "Implement emergency heat illness response plan",
  ],
  moderate: [
    "Shift to 50/50 or 25/75 work-rest schedule",
    "Increase water intake and shade access",
    "Restrict heavy and very heavy tasks to coolest hours (before 10am or after 4pm)",
    "Acclimatize new workers — limit to 50% effort in first 5 days",
    "Post heat illness symptoms and emergency contacts at site",
  ],
  low: [
    "Maintain regular hydration (water every 20 min even without thirst)",
    "Monitor workers for early symptoms: fatigue, dizziness, cramps",
    "Ensure shade access and rest areas available",
    "Review acclimatization status of new and returning workers",
  ],
};

export default function HeatStressAssessor() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    airTemp: 30,
    humidity: 50,
    solarLoad: "partial",
    windSpeed: "light",
    workload: "moderate",
    workRatio: "75",
  });
  const [result, setResult] = useState(null);

  const set = (key, val) => setInputs((p) => ({ ...p, [key]: val }));

  const calculate = () => {
    const wbgt = estimateWBGT(inputs);
    const risk = getRisk(wbgt, inputs.workload, inputs.workRatio);
    setResult({ wbgt, risk, inputs: { ...inputs } });
    setStep(2);
  };

  const reset = () => { setStep(0); setResult(null); };

  const riskColors = {
    red: { bg: "bg-red-50", border: "border-red-300", badge: "bg-red-600", text: "text-red-700", icon: XCircle },
    orange: { bg: "bg-orange-50", border: "border-orange-300", badge: "bg-orange-500", text: "text-orange-700", icon: AlertTriangle },
    amber: { bg: "bg-amber-50", border: "border-amber-300", badge: "bg-amber-500", text: "text-amber-700", icon: AlertTriangle },
    green: { bg: "bg-emerald-50", border: "border-emerald-300", badge: "bg-emerald-600", text: "text-emerald-700", icon: CheckCircle },
  };

  return (
    <div className="bg-gradient-to-br from-[#0F2A4A] to-[#1a3a52] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-[#d4af7a]/20 flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-[#d4af7a]" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">ACGIH TLV®-Based Tool</p>
            <h3 className="text-lg font-bold text-white leading-tight">Heat Stress Primary Assessment</h3>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2">
          Estimates outdoor WBGT and compares against ACGIH 2024 Threshold Limit Values for Heat Stress. For screening purposes only.
        </p>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">

          {/* Step 0: Environmental Inputs */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white font-semibold mb-4 text-sm">Step 1 of 2 — Environmental Conditions</p>
              <div className="space-y-5">

                {/* Air Temp */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" /> Air Temperature: <span className="text-[#d4af7a] font-bold ml-1">{inputs.airTemp}°C</span>
                  </label>
                  <input
                    type="range" min={20} max={45} step={0.5}
                    value={inputs.airTemp}
                    onChange={(e) => set("airTemp", parseFloat(e.target.value))}
                    className="w-full accent-[#d4af7a]"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>20°C</span><span>45°C</span></div>
                </div>

                {/* Humidity */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    Relative Humidity: <span className="text-[#d4af7a] font-bold ml-1">{inputs.humidity}%</span>
                  </label>
                  <input
                    type="range" min={10} max={100} step={5}
                    value={inputs.humidity}
                    onChange={(e) => set("humidity", parseInt(e.target.value))}
                    className="w-full accent-[#d4af7a]"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>10%</span><span>100%</span></div>
                </div>

                {/* Solar Load */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" /> Solar Exposure
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: "none", label: "Shade / Overcast" },
                      { val: "partial", label: "Partial Sun" },
                      { val: "full", label: "Full Direct Sun" },
                    ].map((o) => (
                      <button
                        key={o.val}
                        onClick={() => set("solarLoad", o.val)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                          inputs.solarLoad === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >{o.label}</button>
                    ))}
                  </div>
                </div>

                {/* Wind */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" /> Wind Speed
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: "still", label: "Still (<1 km/h)" },
                      { val: "light", label: "Light (1–15 km/h)" },
                      { val: "moderate", label: "Moderate (>15 km/h)" },
                    ].map((o) => (
                      <button
                        key={o.val}
                        onClick={() => set("windSpeed", o.val)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                          inputs.windSpeed === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >{o.label}</button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setStep(1)}
                  className="w-full bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full mt-2"
                >
                  Next — Work Conditions <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Work Inputs */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white font-semibold mb-4 text-sm">Step 2 of 2 — Work Conditions</p>
              <div className="space-y-5">

                {/* Workload */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Work Intensity (ACGIH Category)
                  </label>
                  <div className="space-y-2">
                    {[
                      { val: "light", label: "Light", watts: "<200W" },
                      { val: "moderate", label: "Moderate", watts: "200–350W" },
                      { val: "heavy", label: "Heavy", watts: "350–500W" },
                      { val: "very_heavy", label: "Very Heavy", watts: ">500W" },
                    ].map((o) => (
                      <button
                        key={o.val}
                        onClick={() => set("workload", o.val)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ${
                          inputs.workload === o.val
                            ? "bg-[#d4af7a]/20 border-[#d4af7a] text-white"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <span className="font-bold">{o.label}</span>
                        <span className="text-slate-400 ml-1">({o.watts})</span>
                        <span className="block text-slate-400 text-xs mt-0.5">{workloadDescriptions[o.val]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Ratio */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">
                    Work Time per Hour (% of time actively working)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: "100", label: "75–100%" },
                      { val: "75", label: "50–75%" },
                      { val: "50", label: "25–50%" },
                      { val: "25", label: "0–25%" },
                    ].map((o) => (
                      <button
                        key={o.val}
                        onClick={() => set("workRatio", o.val)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border transition-all ${
                          inputs.workRatio === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >{o.label}</button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="flex-1 border-white/20 text-slate-300 hover:bg-white/10 bg-transparent rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={calculate}
                    className="flex-1 bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full"
                  >
                    Calculate Risk
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Results */}
          {step === 2 && result && (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {(() => {
                const rc = riskColors[result.risk.color];
                const Icon = rc.icon;
                return (
                  <div className="space-y-4">
                    {/* WBGT Result */}
                    <div className="text-center py-4">
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Estimated WBGT (Outdoor)</p>
                      <p className="text-5xl font-bold text-[#d4af7a]">{result.wbgt}°C</p>
                      {result.risk.tlv && (
                        <p className="text-slate-400 text-xs mt-1">ACGIH TLV® for this scenario: <span className="text-white font-semibold">{result.risk.tlv}°C</span></p>
                      )}
                    </div>

                    {/* Risk Level */}
                    <div className={`rounded-xl border p-4 ${rc.bg} ${rc.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${rc.text}`} />
                        <span className={`font-bold text-sm ${rc.text}`}>{result.risk.label}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {controls[result.risk.level].map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inputs Summary */}
                    <div className="bg-white/5 rounded-lg p-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>Air Temp: <span className="text-slate-200">{result.inputs.airTemp}°C</span></span>
                      <span>Humidity: <span className="text-slate-200">{result.inputs.humidity}%</span></span>
                      <span>Solar: <span className="text-slate-200 capitalize">{result.inputs.solarLoad}</span></span>
                      <span>Wind: <span className="text-slate-200 capitalize">{result.inputs.windSpeed}</span></span>
                      <span>Workload: <span className="text-slate-200 capitalize">{result.inputs.workload.replace("_", " ")}</span></span>
                      <span>Work ratio: <span className="text-slate-200">{result.inputs.workRatio}% / hr</span></span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      WBGT is estimated using a simplified outdoor model (Stull wet-bulb approximation + solar/wind adjustments). This tool is intended for primary screening only — not a substitute for calibrated WBGT instrumentation or a professional heat stress assessment.
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={reset}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Recalculate
                      </button>
                      <Link to={`${createPageUrl("Contact")}?service=heat_stress`} className="ml-auto">
                        <Button size="sm" className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full text-xs px-4">
                          Get a Professional Assessment
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