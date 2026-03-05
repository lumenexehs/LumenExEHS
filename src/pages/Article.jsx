import { useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, ClipboardList, Microscope, PhoneCall } from "lucide-react";
import { articles } from "@/components/home/KnowledgeHub";

// Article content database
const articleContent = {
  "mould-workplace": {
    metaTitle: "Mould in the Workplace: When to Worry, When to Act | LumenEx EHS",
    metaDescription: "Understand when workplace mould requires professional assessment. Ontario OHS guidance for EHS managers and facility operators.",
    problemSnapshot: "You've spotted mould on a ceiling tile, or employees are complaining about musty odours. Maybe someone has raised a health concern. The question isn't just 'is there mould?' — it's 'how much, what kind, and what's driving it?'",
    happening: [
      "Mould grows wherever moisture accumulates — roof leaks, condensation, HVAC issues, plumbing failures",
      "Visible mould is rarely the whole picture — hidden growth behind drywall or in ductwork is common",
      "Mycotoxin-producing species (like Stachybotrys) require lab analysis to identify",
      "Ontario OHSA general duty clause requires employers to investigate and remediate known hazards",
    ],
    whenToAct: [
      "Employees report respiratory symptoms, headaches, or fatigue",
      "Visible mould covers more than 1 m² (10 sq ft)",
      "A musty odour persists despite cleaning",
      "There has been a recent water intrusion or flood event",
      "Workers in specific areas are filing complaints repeatedly",
    ],
    approach: "A professional IAQ assessment includes air sampling, surface sampling, moisture mapping, and HVAC inspection. Results are compared against Health Canada guidelines and AIHA guidance. A written report identifies the scope of contamination, the likely source, and a remediation plan proportionate to the risk.",
    service: "iaq",
  },
  "radon-ontario": {
    metaTitle: "Radon in Ontario Buildings: Employer & Landlord Obligations | LumenEx EHS",
    metaDescription: "Ontario radon compliance requirements for workplaces and rental buildings. When to test, what the limits mean, and how to act.",
    problemSnapshot: "Radon is a colourless, odourless radioactive gas that rises from bedrock and accumulates in lower floors. It is the second leading cause of lung cancer in Canada — and the vast majority of Ontario buildings have never been tested. A March 2026 CBC investigation found that nearly half of all Canadian detached homes may exceed the World Health Organization's recommended threshold — even if they fall below Health Canada's current 200 Bq/m³ guideline.",
    happening: [
      "Radon is a naturally occurring uranium decay product — no workplace or home is automatically 'safe'",
      "Ontario's geology means elevated radon in many regions, including parts of the GTA",
      "Health Canada's guideline sits at 200 Bq/m³ — but this is double the WHO's recommended reference level of 100 Bq/m³",
      "Canada's 200 Bq/m³ threshold has not been updated since 2007; researchers and the David Suzuki Foundation are calling for a reduction to 100 Bq/m³",
      "The 2024 Cross Canada Radon Survey found ~20% of detached homes exceed 200 Bq/m³, and another 26% fall between 100–199 Bq/m³ — meaning nearly half exceed the WHO threshold",
      "Radon is responsible for an estimated 3,000 lung cancer deaths in Canada annually — the second-leading cause after smoking",
      "Modern mitigation techniques (sub-slab depressurization) can reduce indoor radon levels by over 80%",
    ],
    whenToAct: [
      "Your building has never had a radon test — most have not",
      "You have workers or tenants in basement or ground-floor spaces",
      "Readings come back between 100–199 Bq/m³ — technically below Health Canada's threshold, but above the WHO's recommended level",
      "A tenant or employee has raised a radon concern",
      "You are preparing a building for sale or occupancy change",
      "You are renewing an OHS program and want to address all identified risks proactively",
    ],
    approach: "We conduct long-term radon measurements (minimum 90 days, per Health Canada protocol) using calibrated electret ion chambers or alpha-track detectors. Results are interpreted against both Health Canada's 200 Bq/m³ guideline and the WHO's 100 Bq/m³ reference level, giving you a complete picture of risk — not just regulatory compliance. A remediation pathway (sub-slab depressurization, ventilation) is recommended wherever levels warrant action.",
    service: "radon",
  },
  "chemical-exposure-tlv": {
    metaTitle: "TLVs® Explained: Understanding Your Air Sampling Report | LumenEx EHS",
    metaDescription: "Plain-English guide to Threshold Limit Values for EHS managers. What your air sampling data means and what action it requires.",
    problemSnapshot: "Your hygienist handed you a report full of numbers, ppm values, and TLV® comparisons. You need to know: are my workers safe? Do I need to do something? And how do I explain this to management?",
    happening: [
      "TLVs® (Threshold Limit Values) are set by ACGIH — the most widely adopted occupational exposure limits in Ontario",
      "Ontario's O. Reg 833 sets legally binding OELs — some are more permissive than ACGIH TLVs®",
      "A result at 50% of the TLV® is not necessarily 'safe' — it depends on exposure duration, mixtures, and individual susceptibility",
      "Action levels typically trigger engineering controls, medical surveillance, or PPE upgrades",
      "Mixture effects must be calculated separately — multiple chemicals at sub-limit concentrations can still exceed combined limits",
    ],
    whenToAct: [
      "Any result exceeds 50% of the applicable OEL or TLV®",
      "Workers are using chemicals without documented exposure data",
      "A process change has introduced new chemicals or altered ventilation",
      "A Ministry of Labour inspection is anticipated",
      "Workers are reporting symptoms consistent with chemical exposure",
    ],
    approach: "Our industrial hygiene assessments follow AIHA sampling strategy guidelines. We design the sampling approach, conduct personal and area monitoring, and provide a written interpretation that is regulatory-defensible. Recommendations are practical, proportionate, and prioritized by risk.",
    service: "occupational_hygiene",
  },
  "noise-dosimetry": {
    metaTitle: "Noise Dosimetry 101: What to Expect from a Workplace Noise Survey | LumenEx EHS",
    metaDescription: "A plain-English guide to occupational noise assessment in Ontario. Who needs it, what the process involves, and what results mean.",
    problemSnapshot: "Hearing loss from occupational noise exposure is permanent — and almost entirely preventable. Ontario's noise regulation (O. Reg 381/15) requires employers to assess and control noise if it reaches or exceeds 85 dBA. Many employers don't know whether their workplaces qualify.",
    happening: [
      "Occupational noise-induced hearing loss (NIHL) develops gradually over years — workers rarely notice until it's severe",
      "The 85 dBA threshold is an 8-hour time-weighted average — short bursts of loud noise matter too",
      "Engineering controls (enclosures, isolation, damping) are required before relying on hearing protection",
      "Ontario's regulation requires audiometric testing programs where exposures are at or above the action level",
      "Failing to assess noise exposure is a due diligence gap that regulators flag routinely",
    ],
    whenToAct: [
      "Workers must raise their voice to speak at arm's length (a reliable rule of thumb for 85 dBA)",
      "Complaints about ringing in the ears (tinnitus) after shifts",
      "Workers wear hearing protection informally but no formal program exists",
      "A new machine or process has been introduced",
      "A Ministry of Labour inspector has raised noise as a concern",
    ],
    approach: "We conduct personal noise dosimetry and area sound level measurements using calibrated Type 1 and Type 2 sound level meters and dosimeters. Results are compared against Ontario O. Reg 381/15 and ACGIH TLV® for noise. We provide a written report with engineering and administrative control recommendations, and guidance on setting up a hearing conservation program.",
    service: "noise_physical",
  },
  "heat-stress-construction": {
    metaTitle: "Heat Stress on Ontario Construction Sites: Compliance & Controls | LumenEx EHS",
    metaDescription: "Ontario employer obligations for heat stress. What the general duty clause requires, how to assess risk, and practical controls for outdoor work.",
    problemSnapshot: "Ontario has no dedicated heat stress regulation — but that doesn't mean employers are off the hook. The OHSA general duty clause requires employers to take every reasonable precaution to protect workers. In the case of heat, courts and MOL inspectors apply this broadly.",
    happening: [
      "Heat stress risk is a function of air temperature, humidity, radiant heat, air movement, and workload",
      "Outdoor workers — especially in construction — face the highest risk during July-August",
      "Heat exhaustion and heat stroke are medical emergencies with long-term consequences",
      "Acclimatization is the most effective individual control — but it takes 7-14 days of gradual exposure",
      "Vulnerable workers (new employees, older workers, those on certain medications) face elevated risk",
    ],
    whenToAct: [
      "Forecasted humidex exceeds 40°C (Environment Canada heat warning)",
      "Workers are performing heavy work in direct sun or near radiant heat sources",
      "A worker has experienced heat-related illness at your worksite",
      "Your heat stress policy exists on paper but hasn't been reviewed or implemented",
      "New workers are being onboarded during summer months",
    ],
    approach: "We assess heat stress risk using validated indices (WBGT, Humidex, PHS) and worker observation. A written risk assessment identifies high-risk tasks and workers, and recommends a tiered control strategy — from engineering controls (shade, ventilation) to work-rest schedules, hydration protocols, and emergency response procedures.",
    service: "heat_stress",
  },
  "healthcare-iaq": {
    metaTitle: "Indoor Air Quality in Hospitals & Long-Term Care: A Higher Standard | LumenEx EHS",
    metaDescription: "IAQ assessment for healthcare settings in Ontario. Identifying chemical, biological, and HVAC-related air quality risks in clinical environments.",
    problemSnapshot: "Healthcare workers are exposed to a complex mixture of airborne hazards — from glutaraldehyde and formaldehyde used in sterilization, to aerosolized pathogens, to off-gassing from building materials. IAQ in healthcare settings isn't just a comfort issue — it's a patient and worker safety issue.",
    happening: [
      "Glutaraldehyde, ethylene oxide, and formaldehyde are common hazardous chemical disinfectants with TLVs® well below detectable odour thresholds",
      "HVAC pressure relationships between wards, isolation rooms, and corridors are critical infection control infrastructure",
      "Renovation work in occupied healthcare facilities requires infection control risk assessments (ICRA)",
      "Biological aerosols from patient care activities can persist in poorly ventilated spaces",
      "Staff in endoscopy, pathology, and sterile processing are disproportionately exposed",
    ],
    whenToAct: [
      "Staff in clinical areas report persistent headaches, eye irritation, or respiratory symptoms",
      "A renovation or construction project is underway in or adjacent to occupied clinical areas",
      "Your HVAC system has not been tested since installation",
      "A patient or staff infection cluster has been linked to an environmental source",
      "You are preparing for an Accreditation Canada review",
    ],
    approach: "Healthcare IAQ assessments combine air quality sampling, HVAC inspection and pressure testing, and chemical exposure monitoring. We work with infection control practitioners and facilities teams to identify risks, and provide remediation guidance aligned with CSA Z317 and Health Canada standards.",
    service: "iaq",
  },
};

export default function Article() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const article = useMemo(() => articles.find((a) => a.id === id), [id]);
  const content = articleContent[id];

  if (!article || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Article not found</h2>
          <Link to={createPageUrl("KnowledgeHub")}>
            <Button>Browse All Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#0F2A4A] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={article.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2A4A]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to={createPageUrl("KnowledgeHub")}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>
          <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
            {article.tag}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-slate-300 text-sm">{article.date} · {article.readTime}</p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 space-y-14">

        {/* Problem Snapshot */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide text-sm">Problem Snapshot</h2>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed border-l-4 border-amber-400 pl-5">
            {content.problemSnapshot}
          </p>
        </motion.section>

        {/* What's Really Happening */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <Microscope className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">What's Really Happening</h2>
          </div>
          <ul className="space-y-3">
            {content.happening.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* When to Take Action */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-[#1a3a52]" />
            <h2 className="text-lg font-bold text-slate-900">When to Take Action</h2>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 space-y-3">
            {content.whenToAct.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Professional Approach */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <Microscope className="w-5 h-5 text-[#d4af7a]" />
            <h2 className="text-lg font-bold text-slate-900">Our Professional Approach</h2>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {content.approach}
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0F2A4A] rounded-2xl p-8 text-center"
        >
          <PhoneCall className="w-8 h-8 text-[#d4af7a] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Get a Clear Answer?</h3>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Talk to a CIH. Describe what you're dealing with — we'll tell you what we can do and what it will cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={`${createPageUrl("Contact")}?service=${content.service}`}>
              <Button className="bg-[#d4af7a] hover:bg-[#c49d68] text-[#1a3a52] font-semibold px-7 rounded-full">
                Request an Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to={`${createPageUrl("Contact")}?service=general`}>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3a52] px-7 rounded-full bg-transparent">
                Book a Free 30-Min Consult
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}