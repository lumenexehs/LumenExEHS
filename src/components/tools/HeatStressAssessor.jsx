import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Wind, Sun, User, AlertTriangle, CheckCircle, XCircle, RotateCcw, ArrowRight, Building2, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

// Work-Rest WBGT limits (°C) based on established occupational heat stress guidelines
// Rows: workload — light, moderate, heavy, very_heavy
// Cols: work ratio index — 75-100%, 50-75%, 25-50%, 0-25%
const WBGT_LIMITS = {
  light:      [31.0, 28.0, 30.0, 32.0],
  moderate:   [28.0, 26.0, 29.0, 31.0],
  heavy:      [null, 26.0, 27.0, 30.0],
  very_heavy: [null, null, 25.0, 28.0],
};

// Stull (2011) wet-bulb approximation
function wetBulb(Ta, RH) {
  return (
    Ta * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5))
    + Math.atan(Ta + RH)
    - Math.atan(RH - 1.676331)
    + 0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH)
    - 4.686035
  );
}

function estimateWBGT({ environment, airTemp, humidity, solarLoad, windSpeed, indoorHeat }) {
  const Twb = wetBulb(airTemp, humidity);

  if (environment === "outdoor") {
    // Globe temp: solar adds heat, wind removes it
    const solarOffsets = { none: 0, partial: 4, full: 10 };
    const windPenalty = windSpeed === "still" ? 0 : windSpeed === "light" ? -2 : -4;
    const Tg = airTemp + solarOffsets[solarLoad] + windPenalty;
    const wbgt = 0.7 * Twb + 0.2 * Tg + 0.1 * airTemp;
    return Math.round(wbgt * 10) / 10;
  } else {
    // Indoor: no solar component; radiant heat from equipment/processes
    const radiantOffset = { none: 0, low: 2, moderate: 5, high: 9 };
    const Tg = airTemp + radiantOffset[indoorHeat];
    const wbgt = 0.7 * Twb + 0.2 * Tg + 0.1 * airTemp;
    return Math.round(wbgt * 10) / 10;
  }
}

function getRisk(wbgt, workload, workRatio) {
  const ratioIndex = ["100", "75", "50", "25"].indexOf(workRatio);
  const limit = WBGT_LIMITS[workload]?.[ratioIndex];

  if (limit === null) {
    return { level: "extreme", label: "Not Recommended for this Workload", color: "red", limit: null };
  }
  const diff = wbgt - limit;
  if (diff > 3)  return { level: "extreme", label: "Extreme Risk — Cease Work", color: "red", limit };
  if (diff > 0)  return { level: "high",    label: "Exceeds Guideline — Immediate Action Required", color: "orange", limit };
  if (diff > -2) return { level: "moderate", label: "Approaching Limit — Controls Needed", color: "amber", limit };
  return { level: "low", label: "Within Acceptable Range", color: "green", limit };
}

const workloadDescriptions = {
  light:      "Sitting/standing, light hand/arm work, occasional walking (e.g., light assembly, painting)",
  moderate:   "Walking, moderate lifting, sustained arm work (e.g., framing, laying bricks)",
  heavy:      "Heavy arm/leg work, carrying loads (e.g., shovelling, digging, heavy excavation)",
  very_heavy: "Maximum exertion — pick-and-shovel, climbing with heavy load",
};

const controls = {
  extreme: [
    "Stop all work in the hot environment immediately",
    "Move workers to cool or air-conditioned rest areas",
    "Monitor all workers for heat illness signs",
    "Do not resume work until conditions improve — consider professional assessment",
  ],
  high: [
    "Implement 0–25% work / 75–100% rest schedule in a cool area",
    "Mandatory hydration: ~250 mL water every 15–20 minutes",
    "Buddy system — no worker alone in the hot environment",
    "Remove non-essential personnel from the hot area",
    "Have emergency heat illness response plan ready",
  ],
  moderate: [
    "Shift to a 50/50 or 25/75 work-rest schedule",
    "Increase water intake and access to shade or cool areas",
    "Restrict high-intensity tasks to the coolest part of the day",
    "Limit new or returning workers — allow acclimatization (7–14 days)",
    "Post heat illness symptoms and emergency contacts visibly",
  ],
  low: [
    "Maintain regular hydration (water every 20 min even without thirst)",
    "Monitor workers for early symptoms: fatigue, dizziness, cramps",
    "Ensure shade or cool rest areas are accessible",
    "Review acclimatization status of new and returning workers",
  ],
};

const riskColors = {
  red:    { bg: "bg-red-50",    border: "border-red-300",    text: "text-red-700",    Icon: XCircle },
  orange: { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-700", Icon: AlertTriangle },
  amber:  { bg: "bg-amber-50",  border: "border-amber-300",  text: "text-amber-700",  Icon: AlertTriangle },
  green:  { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", Icon: CheckCircle },
};

export default function HeatStressAssessor() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    environment: "outdoor",
    airTemp: 30,
    humidity: 50,
    solarLoad: "partial",
    windSpeed: "light",
    indoorHeat: "low",
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

  return (
    <div className="bg-gradient-to-br from-[#0F2A4A] to-[#1a3a52] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-[#d4af7a]/20 flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-[#d4af7a]" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Interactive Tool</p>
            <h3 className="text-lg font-bold text-white leading-tight">Heat Stress Primary Assessment</h3>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2">
          Estimates Wet Bulb Globe Temperature (WBGT) for indoor or outdoor conditions and provides a risk classification with recommended controls. For screening purposes only.
        </p>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">

          {/* Step 0: Environmental Inputs */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white font-semibold mb-4 text-sm">Step 1 of 2 — Environmental Conditions</p>
              <div className="space-y-5">

                {/* Indoor / Outdoor toggle */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">Work Environment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "outdoor", label: "Outdoor", Icon: TreePine },
                      { val: "indoor",  label: "Indoor",  Icon: Building2 },
                    ].map(({ val, label, Icon }) => (
                      <button
                        key={val}
                        onClick={() => set("environment", val)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                          inputs.environment === val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <Icon className="w-4 h-4" /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Air Temp */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" /> Air Temperature: <span className="text-[#d4af7a] font-bold ml-1">{inputs.airTemp}°C</span>
                  </label>
                  <input
                    type="range" min={15} max={50} step={0.5}
                    value={inputs.airTemp}
                    onChange={(e) => set("airTemp", parseFloat(e.target.value))}
                    className="w-full accent-[#d4af7a]"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1"><span>15°C</span><span>50°C</span></div>
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

                {/* Outdoor-specific */}
                {inputs.environment === "outdoor" && (
                  <>
                    <div>
                      <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" /> Solar Exposure
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "none",    label: "Shade / Overcast" },
                          { val: "partial", label: "Partial Sun" },
                          { val: "full",    label: "Full Direct Sun" },
                        ].map((o) => (
                          <button key={o.val} onClick={() => set("solarLoad", o.val)}
                            className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                              inputs.solarLoad === o.val
                                ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                            }`}>{o.label}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5" /> Wind Speed
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "still",    label: "Still (<1 km/h)" },
                          { val: "light",    label: "Light (1–15 km/h)" },
                          { val: "moderate", label: "Moderate (>15 km/h)" },
                        ].map((o) => (
                          <button key={o.val} onClick={() => set("windSpeed", o.val)}
                            className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                              inputs.windSpeed === o.val
                                ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                            }`}>{o.label}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Indoor-specific */}
                {inputs.environment === "indoor" && (
                  <div>
                    <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">
                      Radiant Heat Sources (equipment, furnaces, boilers, etc.)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: "none",     label: "None" },
                        { val: "low",      label: "Low (e.g. machinery)" },
                        { val: "moderate", label: "Moderate (e.g. ovens)" },
                        { val: "high",     label: "High (e.g. foundry/furnace)" },
                      ].map((o) => (
                        <button key={o.val} onClick={() => set("indoorHeat", o.val)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                            inputs.indoorHeat === o.val
                              ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                          }`}>{o.label}</button>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={() => setStep(1)} className="w-full bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full mt-2">
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

                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Work Intensity
                  </label>
                  <div className="space-y-2">
                    {[
                      { val: "light",      label: "Light",      watts: "<200W" },
                      { val: "moderate",   label: "Moderate",   watts: "200–350W" },
                      { val: "heavy",      label: "Heavy",      watts: "350–500W" },
                      { val: "very_heavy", label: "Very Heavy", watts: ">500W" },
                    ].map((o) => (
                      <button key={o.val} onClick={() => set("workload", o.val)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ${
                          inputs.workload === o.val
                            ? "bg-[#d4af7a]/20 border-[#d4af7a] text-white"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>
                        <span className="font-bold">{o.label}</span>
                        <span className="text-slate-400 ml-1">({o.watts})</span>
                        <span className="block text-slate-400 text-xs mt-0.5">{workloadDescriptions[o.val]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2 block">
                    Work Time per Hour (% of time actively working)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: "100", label: "75–100%" },
                      { val: "75",  label: "50–75%" },
                      { val: "50",  label: "25–50%" },
                      { val: "25",  label: "0–25%" },
                    ].map((o) => (
                      <button key={o.val} onClick={() => set("workRatio", o.val)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border transition-all ${
                          inputs.workRatio === o.val
                            ? "bg-[#d4af7a] border-[#d4af7a] text-[#1a3a52]"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                        }`}>{o.label}</button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1 border-white/20 text-slate-300 hover:bg-white/10 bg-transparent rounded-full">
                    Back
                  </Button>
                  <Button onClick={calculate} className="flex-1 bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold rounded-full">
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
                const { Icon } = rc;
                return (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">
                        Estimated WBGT ({result.inputs.environment === "outdoor" ? "Outdoor" : "Indoor"})
                      </p>
                      <p className="text-5xl font-bold text-[#d4af7a]">{result.wbgt}°C</p>
                      {result.risk.limit && (
                        <p className="text-slate-400 text-xs mt-1">
                          Guideline limit for this scenario: <span className="text-white font-semibold">{result.risk.limit}°C</span>
                        </p>
                      )}
                    </div>

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

                    <div className="bg-white/5 rounded-lg p-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>Environment: <span className="text-slate-200 capitalize">{result.inputs.environment}</span></span>
                      <span>Air Temp: <span className="text-slate-200">{result.inputs.airTemp}°C</span></span>
                      <span>Humidity: <span className="text-slate-200">{result.inputs.humidity}%</span></span>
                      {result.inputs.environment === "outdoor" ? (
                        <>
                          <span>Solar: <span className="text-slate-200 capitalize">{result.inputs.solarLoad}</span></span>
                          <span>Wind: <span className="text-slate-200 capitalize">{result.inputs.windSpeed}</span></span>
                        </>
                      ) : (
                        <span>Radiant heat: <span className="text-slate-200 capitalize">{result.inputs.indoorHeat}</span></span>
                      )}
                      <span>Workload: <span className="text-slate-200 capitalize">{result.inputs.workload.replace("_", " ")}</span></span>
                      <span>Work ratio: <span className="text-slate-200">{result.inputs.workRatio}%/hr</span></span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      WBGT is estimated using a simplified model (Stull wet-bulb approximation + environmental adjustments). This tool is for primary screening only — not a substitute for calibrated WBGT instrumentation or a professional heat stress assessment.
                    </p>

                    <div className="flex items-center gap-3">
                      <button onClick={reset} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
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