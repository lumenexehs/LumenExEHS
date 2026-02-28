import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const frames = [
  {
    label: "Testing Flame",
    level: "Safe",
    methane: "0%",
    desc: "Normal air — flame burns steady and clean.",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.3)",
    height: 28,
    width: 14,
  },
  {
    label: "1¼% Methane",
    level: "Low",
    methane: "1.25%",
    desc: "Trace methane detected — faint blue cap appears.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.3)",
    height: 36,
    width: 16,
  },
  {
    label: "2% Methane",
    level: "Caution",
    methane: "2%",
    desc: "Blue cap enlarges — action required.",
    color: "#a3e635",
    glow: "rgba(163,230,53,0.35)",
    height: 48,
    width: 20,
  },
  {
    label: "5% Methane",
    level: "Warning",
    methane: "5%",
    desc: "Flame lengthens — hazard clearly visible.",
    color: "#facc15",
    glow: "rgba(250,204,21,0.4)",
    height: 62,
    width: 24,
  },
  {
    label: "10% Methane",
    level: "Danger",
    methane: "10%",
    desc: "Explosive range begins — evacuate now.",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.45)",
    height: 78,
    width: 28,
  },
  {
    label: "15–20% Methane",
    level: "Critical",
    methane: "15–20%",
    desc: "Maximum explosibility — immediately dangerous.",
    color: "#f87171",
    glow: "rgba(248,113,113,0.5)",
    height: 96,
    width: 32,
  },
];

export default function SafetyLampAnimation() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % frames.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [playing]);

  const frame = frames[current];

  return (
    <div className="bg-[#0a1a2e] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-white/10">
        <p className="text-[#d4af7a] text-xs font-semibold uppercase tracking-widest mb-0.5">
          Garforth Safety Lamp
        </p>
        <p className="text-white/50 text-xs">Flame shapes — methane detection</p>
      </div>

      {/* Main visual */}
      <div className="flex items-end justify-center gap-2 px-6 pt-6 pb-2" style={{ minHeight: 160 }}>
        {frames.map((f, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPlaying(false); }}
            className="flex flex-col items-center gap-1 group"
          >
            {/* Flame */}
            <motion.div
              animate={{
                height: i === current ? f.height : f.height * 0.6,
                width: i === current ? f.width : f.width * 0.7,
                opacity: i === current ? 1 : 0.4,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                background: `radial-gradient(ellipse at bottom, white 0%, ${f.color} 40%, transparent 100%)`,
                boxShadow: i === current ? `0 0 18px 6px ${f.glow}` : "none",
                borderRadius: "50% 50% 20% 20%",
                transformOrigin: "bottom center",
              }}
            />
            {/* Wick base */}
            <div
              className="rounded-full"
              style={{
                width: i === current ? f.width + 4 : f.width * 0.7 + 2,
                height: 4,
                background: i === current ? f.color : "#334155",
                boxShadow: i === current ? `0 0 6px 2px ${f.glow}` : "none",
                transition: "all 0.5s",
              }}
            />
          </button>
        ))}
      </div>

      {/* Labels row */}
      <div className="flex justify-center gap-2 px-6 pb-4">
        {frames.map((f, i) => (
          <div
            key={i}
            className="text-center"
            style={{ width: 40 }}
          >
            <div
              className="text-center text-[9px] leading-tight"
              style={{ color: i === current ? f.color : "#475569" }}
            >
              {f.methane}
            </div>
          </div>
        ))}
      </div>

      {/* Info card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mx-5 mb-5 rounded-xl p-4 border"
          style={{
            borderColor: frame.color + "44",
            background: frame.color + "11",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-semibold text-sm">{frame.label}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: frame.color + "33", color: frame.color }}
            >
              {frame.level}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">{frame.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between px-5 pb-4">
        <div className="flex gap-1.5">
          {frames.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPlaying(false); }}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                background: i === current ? frame.color : "#334155",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-[10px] text-slate-500 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/30"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Source credit */}
      <div className="px-5 pb-4">
        <p className="text-slate-600 text-[9px] text-center">
          Based on Garforth Lamps — Crown Copyright © 1977 · National Coal Board / SMRE / HSE
        </p>
      </div>
    </div>
  );
}