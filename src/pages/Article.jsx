import { useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, ClipboardList, Microscope, PhoneCall } from "lucide-react";
import { articles } from "@/components/home/KnowledgeHub";
import HeatStressAssessor from "@/components/tools/HeatStressAssessor";

// Article content database
const articleContent = {
  "butadiene-epa": {
    metaTitle: "EPA Moves to Regulate 1,3-Butadiene: What Employers Should Know | LumenEx EHS",
    metaDescription: "The U.S. EPA has found 1,3-butadiene presents unreasonable risk to workers in 11 occupational conditions of use. Here's what this means for Canadian employers in manufacturing and chemical handling.",
    problemSnapshot: "On February 26, 2026, the U.S. EPA finalized its risk evaluation for 1,3-butadiene — a colorless, flammable gas used in the manufacture of synthetic rubber, plastics, adhesives, and paints — finding that it presents an unreasonable risk to workers under 11 conditions of occupational use. Under TSCA, a proposed risk management rule is expected within one year. For employers in manufacturing, processing, and chemical handling environments, this is a clear signal that chemical exposure oversight is tightening — and that waiting for finalized rules is not the strongest strategy.",
    happening: [
      "1,3-butadiene is classified as a human carcinogen and is present in a wide range of industrial processes including manufacture, import, processing, repackaging, recycling, and disposal operations",
      "The EPA's risk evaluation identified unreasonable risk during 11 specific occupational conditions of use — covering a broad spectrum of worker roles and exposure pathways",
      "Regulatory actions taken by major jurisdictions like the EPA routinely influence client expectations, procurement standards, and corporate EHS programs across North America",
      "Many organizations do not have a complete picture of where 1,3-butadiene may be present — directly in raw materials, or indirectly in fuels, process streams, or formulations",
      "Exposure documentation is increasingly expected not just for regulatory compliance, but for insurance, due diligence, and health or compensation inquiries",
      "The gap between 'no current rule' and 'no current risk' is one that employers can no longer afford to assume away — particularly for classified carcinogens",
    ],
    whenToAct: [
      "Your facility handles synthetic rubber, plastics, adhesives, solvents, fuels, or chemical intermediates where 1,3-butadiene may be present as a raw material, byproduct, or process stream",
      "Your chemical inventory has not been reviewed against current occupational hygiene exposure benchmarks in the past two years",
      "Workers perform transfer, blending, maintenance, packaging, or waste handling tasks with limited exposure documentation",
      "Controls such as local exhaust ventilation, enclosure, or respiratory protection have not been formally assessed for adequacy",
      "A client, insurer, or regulator has requested evidence of hazard communication, exposure monitoring, or risk control documentation",
      "Your organization is preparing for an EHS audit, due diligence review, or expansion of chemical operations",
    ],
    approach: "We conduct structured chemical exposure assessments that begin with inventory review and hazard identification, followed by exposure pathway analysis, control effectiveness review, and — where warranted — personal or area air monitoring. Our deliverables are written to support both internal decision-making and external scrutiny: regulatory inquiries, client due diligence, and long-term health documentation. We also assist with hazard communication updates, control gap identification, and prioritized remediation plans.",
    quote: {
      text: "Chemical risk does not disappear simply because it is familiar. Well-known substances often remain significant risks when exposure is poorly understood, insufficiently monitored, or weakly controlled.",
      attribution: "Bite-size OHS — LumenEx EHS, March 2026",
      source: "EPA Final Risk Evaluation: 1,3-Butadiene (Feb 26, 2026)",
      sourceUrl: "https://www.epa.gov/assessing-and-managing-chemicals-under-tsca/risk-management-13-butadiene",
    },
    service: "occupational_hygiene",
  },
  "odour-ambulances": {
    metaTitle: "Ambulances Called, Schools Closed: What a Mystery Odour Really Means | LumenEx EHS",
    metaDescription: "A swimming pool mechanical issue sent students home sick and drew fire engines to a UK school. Here's what that means for Canadian school boards and their duty to investigate.",
    problemSnapshot: "In January 2026, a 'mystery odour' near a swimming pool at Green Park School in Wolverhampton triggered a 12:20pm emergency call, three fire engines, paramedic treatment for nauseous students, and a two-day school closure. A second neighbouring school — Stowlawn Primary — was shut as a precaution. The source was believed to be a mechanical issue, but that determination came after the emergency response, not before.",
    happening: [
      "Swimming pools generate chloramines — compounds formed when chlorine reacts with sweat, urine, and other organic matter — which can cause respiratory irritation, eye irritation, and nausea even at relatively low concentrations",
      "Mechanical failures in pool HVAC or chemical dosing systems can cause rapid, concentrated releases of chlorine gas or chloramines into occupied areas",
      "Schools often lack real-time air quality monitoring, meaning the first alert is a person reporting symptoms — by which point exposures may already be significant",
      "Because pool areas are enclosed and often poorly ventilated relative to occupancy, contaminants can build quickly and migrate into adjacent occupied spaces",
      "The response at Green Park involved specialist atmospheric monitoring equipment — the type of assessment that should ideally precede a decision to re-open, not just close",
      "Two schools were closed, multiple students were treated by paramedics, and parents were notified — all from a source that was, ultimately, a 'mechanical issue'",
    ],
    whenToAct: [
      "Students or staff near a pool or mechanical room report nausea, headaches, or eye/throat irritation",
      "A chemical or chlorine-like smell is detectable outside the pool area in corridors, gyms, or classrooms",
      "Pool chemical dosing equipment has recently been serviced, adjusted, or replaced",
      "HVAC units serving the pool area have not been inspected or balanced in the past 12 months",
      "An odour complaint has been dismissed or monitored without a root cause being confirmed",
      "A school is preparing to re-open after an odour-related closure and needs documented clearance",
    ],
    approach: "We conduct a structured chemical and air quality assessment of pool environments including chloramine monitoring (trichloramine), chlorine gas detection, ventilation effectiveness testing, and HVAC review. For post-incident clearance, we provide a written report that gives boards a defensible, documented basis for re-opening — and a preventive maintenance framework to reduce recurrence.",
    quote: {
      text: "No serious concerns were identified — but ambulances were still called, two schools were closed, and parents were alarmed for two days. A professional assessment before re-opening is not optional.",
      attribution: "LumenEx EHS — Indoor Air Quality Assessment Practice",
      source: "Ref: The Sun — Schools closed & ambulances called after mystery odour (Jan 2026)",
      sourceUrl: "https://www.thesun.co.uk/news/37971927/school-closure-ambulances-mystery-odour-nauseous-pupils/",
    },
    service: "iaq",
  },
  "odour-schools": {
    metaTitle: "Unexplained Odours in Schools: When to Close, When to Investigate | LumenEx EHS",
    metaDescription: "A persistent or sudden odour in a school is a trigger for professional investigation — not just airing out the room. Ontario guidance for school boards and facility managers.",
    problemSnapshot: "A teacher notices a chemical smell near the HVAC intake. Students start complaining of headaches. A principal is left deciding: do we send kids home, or wait and see? School boards across Canada have faced this scenario — and in several documented cases, the delay in acting led to school closures, media coverage, and loss of community trust.",
    happening: [
      "Odours in schools can originate from dozens of sources: sewage gas, off-gassing building materials, HVAC contamination, chemical storage, nearby industrial sites, or underground infrastructure",
      "The nose is not a reliable detector — many hazardous compounds (carbon monoxide, radon, formaldehyde) are odourless, while some strongly odorous compounds are relatively low-risk",
      "When an odour is reported, the instinct to 'air it out and monitor' can delay identification of an actual source — and erode staff and parent confidence",
      "Schools are high-density occupancy buildings with populations that include children, who are more physiologically vulnerable to airborne exposures than adults",
      "Ontario's OHSA general duty clause applies to school workers — boards have legal obligations to investigate known and suspected hazards",
      "A school closure due to odour, without a clear root cause identified, often repeats — the smell returns because the source was never confirmed",
    ],
    whenToAct: [
      "A staff member or student reports a chemical, sewage, or 'gas-like' smell that cannot be immediately explained",
      "Multiple people in the same area report headaches, eye irritation, nausea, or dizziness",
      "The odour persists or recurs after standard cleaning or ventilation",
      "The school has recently undergone renovation, new flooring, painting, or HVAC servicing",
      "An HVAC system has not been inspected or recommissioned in over a year",
      "Parents are contacting the board with health concerns — regardless of whether a formal complaint has been filed",
    ],
    approach: "We conduct a structured odour investigation that combines a walkthrough assessment, HVAC inspection, and targeted air sampling — prioritizing likely sources based on building history, ventilation layout, and reported odour characteristics. Sampling can include VOCs, formaldehyde, sewage gas indicators (hydrogen sulfide), carbon dioxide, and particulates. We provide a written root cause assessment and remediation guidance that gives school boards a defensible, documented response.",
    quote: {
      text: "Parents want answers. And the school board needs to be able to say: we investigated, here's what we found, and here's what we're doing about it.",
      attribution: "LumenEx EHS — Indoor Air Quality Assessment Practice",
      source: "Ref: Global News — Sicamous school closure due to unexplained odour",
      sourceUrl: "https://globalnews.ca/news/5934466/sicamous-school-closure-unexplained-odour/",
    },
    service: "iaq",
  },
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
    quote: {
      text: "Canada's radon guideline is due for an update. Having a higher guideline can lead to some complacency and prevent remedial action, when it would be cost effective to lower it and have clear health benefits.",
      attribution: "Lisa Gue, National Policy Manager, David Suzuki Foundation",
      source: "CBC News, March 4, 2026",
      sourceUrl: "https://www.cbc.ca/news/health/radon-guidelines-canada-9.7113142",
    },
    service: "radon",
  },
  "chemical-exposure-tlv": {
    metaTitle: "TLVs® Explained: Understanding Your Air Sampling Report | LumenEx EHS",
    metaDescription: "Plain-English guide to Threshold Limit Values for EHS managers. What your air sampling data means and what action it requires.",
    problemSnapshot: "Your hygienist handed you a report full of numbers, ppm values, and TLV® comparisons. You need to know: are my workers safe? Do I need to do something? And how do I explain this to management?",
    happening: [
      "Occupational Exposure Limits (OELs) are the cornerstone of air sampling interpretation — Ontario's O. Reg 833 sets legally binding limits, and additional guidance values are widely referenced in professional practice",
      "A result at 50% of the applicable OEL is not necessarily 'safe' — it depends on exposure duration, chemical mixtures, and individual susceptibility",
      "Results must be interpreted in context — the same concentration can represent different levels of risk depending on the chemical, the task, and the worker",
      "Action levels typically trigger engineering controls, medical surveillance, or PPE upgrades",
      "Mixture effects must be calculated separately — multiple chemicals at sub-limit concentrations can still exceed combined limits",
    ],
    whenToAct: [
      "Any result exceeds 50% of the applicable OEL or published guidance value",
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
    approach: "We conduct personal noise dosimetry and area sound level measurements using calibrated Type 1 and Type 2 sound level meters and dosimeters. Results are compared against Ontario O. Reg 381/15 and applicable occupational noise exposure guidelines. We provide a written report with engineering and administrative control recommendations, and guidance on setting up a hearing conservation program.",
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
      "Glutaraldehyde, ethylene oxide, and formaldehyde are common hazardous chemical disinfectants with occupational exposure limits well below detectable odour thresholds",
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

        {/* News Quote (if present) */}
        {content.quote && (
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <blockquote className="border-l-4 border-[#d4af7a] pl-6 py-2">
              <p className="text-slate-800 text-lg italic leading-relaxed mb-3">"{content.quote.text}"</p>
              <footer className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{content.quote.attribution}</span>
                {" — "}
                <a href={content.quote.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a3a52] transition-colors">
                  {content.quote.source}
                </a>
              </footer>
            </blockquote>
          </motion.section>
        )}

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

        {/* Interactive Tool — Heat Stress only */}
        {id === "heat-stress-construction" && (
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌡️</span>
              <h2 className="text-lg font-bold text-slate-900">Primary Assessment Tool</h2>
            </div>
            <p className="text-slate-600 text-sm mb-4">Use this ACGIH TLV®-based screener to estimate heat stress risk for your site conditions. Enter today's environmental data and your work type to get an immediate risk classification and recommended controls.</p>
            <HeatStressAssessor />
          </motion.section>
        )}

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-slate-200 rounded-xl p-5 bg-slate-50"
        >
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-600">Disclaimer: </span>
            The information provided in this article is for general informational and educational purposes only. It does not constitute professional occupational hygiene, legal, or regulatory advice, and should not be relied upon as such. Workplace conditions vary significantly — a qualified occupational hygienist should be consulted before making decisions about exposure assessment, control measures, or regulatory compliance. LumenEx EHS accepts no liability for actions taken or not taken based on the content of this article. References to third-party news sources, regulations, or guidelines are provided for context and do not imply endorsement.
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