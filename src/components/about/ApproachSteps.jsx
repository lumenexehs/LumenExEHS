import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Anticipate & Recognize",
    scenes: [
      // Scene: a figure walking through a workplace, eyes scanning
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative w-full h-16 flex items-end justify-start overflow-hidden">
            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 rounded-full" />
            {/* Moving figure */}
            <motion.div
              animate={active ? { x: [0, 120, 0] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex flex-col items-center"
            >
              {/* Head */}
              <div className="w-4 h-4 rounded-full bg-[#1a3a52] mb-0.5" />
              {/* Body */}
              <div className="w-2 h-8 bg-[#1a3a52] rounded-sm" />
              {/* Scanning eye beam */}
              <motion.div
                animate={active ? { opacity: [0, 1, 0], scaleX: [0.5, 1.5, 0.5] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute top-3 left-4 w-10 h-0.5 bg-emerald-400 rounded-full origin-left"
                style={{ transformOrigin: "left center" }}
              />
            </motion.div>
            {/* Hazard icon appearing */}
            <motion.div
              animate={active ? { opacity: [0, 1, 0, 1, 0], scale: [0.8, 1.1, 0.8] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute right-6 bottom-2 w-7 h-7 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-600 font-bold text-xs"
            >
              !
            </motion.div>
          </div>
          <p className="text-slate-600 text-xs text-center leading-relaxed">Walk the workplace and identify what could harm workers — before taking any measurements.</p>
        </div>
      ),
      // Scene: checklist being ticked
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="w-full space-y-1.5">
            {["Process flows", "Chemical inventory", "Job tasks"].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.4, duration: 0.4 }}
              >
                <motion.div
                  animate={active ? { scale: [1, 1.3, 1], backgroundColor: ["#d1fae5", "#10b981", "#d1fae5"] } : {}}
                  transition={{ delay: i * 0.4 + 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 2.2 }}
                  className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.div>
                <span className="text-slate-600 text-xs">{item}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center">Review processes to anticipate exposure pathways.</p>
        </div>
      ),
      // Scene: two people talking (interview)
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-end justify-center gap-4 h-16">
            {/* Person A */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[#1a3a52]" />
              <div className="w-2.5 h-9 bg-[#1a3a52] rounded-sm mt-0.5" />
            </div>
            {/* Speech bubble */}
            <motion.div
              animate={active ? { scale: [0.8, 1, 0.8], opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-emerald-700 text-xs font-medium shadow-sm"
            >
              "Real conditions…"
            </motion.div>
            {/* Person B */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-emerald-600" />
              <div className="w-2.5 h-9 bg-emerald-600 rounded-sm mt-0.5" />
            </div>
          </div>
          <p className="text-slate-500 text-xs text-center">Interview workers to capture real conditions, not just procedures.</p>
        </div>
      ),
    ],
  },
  {
    step: "02",
    title: "Design & Evaluate",
    scenes: [
      // Scene: sampling device collecting data
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative flex items-center justify-center h-16 w-full">
            {/* Device */}
            <div className="w-10 h-14 border-2 border-slate-400 rounded-lg bg-slate-50 flex flex-col items-center justify-center gap-1">
              <div className="w-6 h-1 bg-slate-300 rounded" />
              <div className="w-6 h-1 bg-slate-300 rounded" />
              <div className="w-6 h-1 bg-slate-300 rounded" />
            </div>
            {/* Particles flowing in */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={active ? { x: [30, 0], opacity: [0, 1, 0], y: [-i * 4, 0] } : {}}
                transition={{ delay: i * 0.5, duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
                className="absolute right-8 w-2 h-2 rounded-full bg-emerald-400"
                style={{ top: `${30 + i * 8}%` }}
              />
            ))}
            <p className="absolute bottom-0 right-0 text-xs text-emerald-600 font-medium">PBZ sampling</p>
          </div>
          <p className="text-slate-600 text-xs text-center leading-relaxed">Design a targeted strategy capturing real exposure for the workers most at risk.</p>
        </div>
      ),
      // Scene: instrument dial/gauge
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative w-16 h-16 mx-auto">
            {/* Gauge circle */}
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <path d="M10 50 A 25 25 0 0 1 50 50" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round"/>
              <motion.path
                d="M10 50 A 25 25 0 0 1 50 50"
                fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round"
                strokeDasharray="78"
                animate={active ? { strokeDashoffset: [78, 20, 78] } : { strokeDashoffset: 78 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Needle */}
              <motion.line
                x1="30" y1="30" x2="30" y2="12"
                stroke="#1a3a52" strokeWidth="2" strokeLinecap="round"
                animate={active ? { rotate: [-70, 10, -70] } : {}}
                style={{ transformOrigin: "30px 30px" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <circle cx="30" cy="30" r="3" fill="#1a3a52"/>
            </svg>
          </div>
          <p className="text-slate-500 text-xs text-center">Select instruments calibrated to detect agents of concern.</p>
        </div>
      ),
      // Scene: SEG grouping
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex gap-3 justify-center h-14 items-end">
            {[["bg-blue-300", "bg-blue-400"], ["bg-purple-300", "bg-purple-400"], ["bg-emerald-300", "bg-emerald-400"]].map(([light, dark], g) => (
              <motion.div
                key={g}
                animate={active ? { y: [0, -6, 0] } : {}}
                transition={{ delay: g * 0.3, duration: 1.4, repeat: Infinity }}
                className="flex gap-1 items-end"
              >
                <div className={`w-3 h-8 ${light} rounded-t-full`} />
                <div className={`w-3 h-10 ${dark} rounded-t-full`} />
              </motion.div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center">Group Similar Exposure Groups (SEGs) to maximize monitoring efficiency.</p>
        </div>
      ),
    ],
  },
  {
    step: "03",
    title: "Analyse & Interpret",
    scenes: [
      // Scene: bar chart building up with risk verdict
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-end gap-2 h-14 w-full justify-center">
            {[40, 65, 90, 55, 75].map((h, i) => (
              <motion.div
                key={i}
                className={`w-5 rounded-t ${i === 2 ? "bg-red-400" : "bg-emerald-400"}`}
                animate={active ? { height: [0, h * 0.55] } : { height: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={active ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-semibold border border-red-200"
            >
              Exceeds OEL
            </motion.div>
            <motion.div
              animate={active ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.4 }}
              className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold border border-emerald-200"
            >
              Acceptable
            </motion.div>
          </div>
          <p className="text-slate-500 text-xs text-center">Turn data into clear exposure profiles with actionable risk verdicts.</p>
        </div>
      ),
      // Scene: Bayesian probability curve
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="w-full h-14 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <motion.path
                d="M5 35 Q20 35 35 15 Q50 -5 65 15 Q80 35 95 35"
                fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2"
                fillRule="evenodd"
                initial={{ pathLength: 0 }}
                animate={active ? { pathLength: [0, 1, 0] } : { pathLength: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* uncertainty band */}
              <motion.rect
                x="45" y="5" width="25" height="30" fill="rgba(251,191,36,0.15)"
                animate={active ? { opacity: [0, 0.7, 0] } : { opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </svg>
            <span className="absolute bottom-0 right-2 text-xs text-amber-500 font-medium">uncertainty</span>
          </div>
          <p className="text-slate-500 text-xs text-center">Apply Bayesian analysis to quantify uncertainty and characterize the exposure tail.</p>
        </div>
      ),
      // Scene: benchmarking against standard levels
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="w-full h-14 relative flex flex-col justify-center gap-1.5">
            {[{ label: "OEL", pct: 72, color: "bg-red-400" }, { label: "TLV®", pct: 55, color: "bg-amber-400" }, { label: "Action", pct: 38, color: "bg-emerald-400" }].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-10 text-right">{label}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${color} rounded-full`}
                    animate={active ? { width: [`0%`, `${pct}%`, `${pct}%`] } : { width: "0%" }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center">Benchmark findings against Ontario OELs, ACGIH TLVs®, and CSA standards.</p>
        </div>
      ),
    ],
  },
  {
    step: "04",
    title: "Control & Communicate",
    scenes: [
      // Scene: hierarchy of controls pyramid
      ({ active }) => (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-full flex flex-col items-center gap-0.5">
            {[
              { label: "Eliminate", color: "bg-emerald-500", w: "w-16" },
              { label: "Substitute", color: "bg-emerald-400", w: "w-24" },
              { label: "Engineering", color: "bg-teal-400", w: "w-32" },
              { label: "Admin / PPE", color: "bg-slate-300", w: "w-40" },
            ].map(({ label, color, w }, i) => (
              <motion.div
                key={label}
                className={`${w} ${color} rounded text-white text-center py-0.5 text-xs font-medium`}
                animate={active ? { opacity: [0.5, 1, 0.5], scale: [0.97, 1.03, 0.97] } : {}}
                transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
              >
                {label}
              </motion.div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center mt-1">Prioritize controls using the hierarchy.</p>
        </div>
      ),
      // Scene: document / report being delivered
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative flex justify-center h-16 w-full items-center">
            <motion.div
              animate={active ? { y: [0, -8, 0], rotate: [-2, 2, -2] } : {}}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-14 h-16 bg-white border-2 border-[#1a3a52] rounded-lg shadow-md flex flex-col gap-1 p-2"
            >
              <div className="w-full h-1.5 bg-[#1a3a52] rounded" />
              <div className="w-3/4 h-1 bg-slate-200 rounded" />
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-2/3 h-1 bg-slate-200 rounded" />
              <div className="w-full h-1 bg-emerald-200 rounded mt-1" />
              <div className="w-4/5 h-1 bg-emerald-200 rounded" />
            </motion.div>
            {/* Arrow delivering */}
            <motion.div
              animate={active ? { x: [20, 0], opacity: [0, 1] } : { opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
              className="absolute right-4 text-emerald-500 text-lg font-bold"
            >
              →
            </motion.div>
          </div>
          <p className="text-slate-500 text-xs text-center">Deliver findings in formats accessible to JHSCs, management, and frontline staff.</p>
        </div>
      ),
      // Scene: three audience icons receiving the message
      ({ active }) => (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-end justify-center gap-5 h-14">
            {[
              { color: "bg-[#1a3a52]", label: "JHSC" },
              { color: "bg-emerald-600", label: "Mgmt" },
              { color: "bg-amber-500", label: "Workers" },
            ].map(({ color, label }, i) => (
              <motion.div
                key={label}
                animate={active ? { y: [0, -5, 0] } : {}}
                transition={{ delay: i * 0.3, duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-0.5"
              >
                <div className={`w-5 h-5 rounded-full ${color}`} />
                <div className={`w-3 h-7 ${color} rounded-sm`} />
                <span className="text-xs text-slate-500">{label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center">Plain language recommendations for workers, supervisors, and safety committees.</p>
        </div>
      ),
    ],
  },
];

function StepCard({ item, index }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % item.scenes.length);
    }, 3200 + index * 300);
    return () => clearInterval(interval);
  }, [item.scenes.length, index]);

  const Scene = item.scenes[sceneIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col"
    >
      <div className="text-4xl font-bold text-emerald-100 mb-4">{item.step}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{item.title}</h3>
      <div className="relative flex-1 min-h-[120px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            <Scene active={active} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-1 mt-4">
        {item.scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setSceneIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === sceneIndex ? "w-6 bg-emerald-500" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ApproachSteps() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((item, index) => (
        <StepCard key={item.step} item={item} index={index} />
      ))}
    </div>
  );
}