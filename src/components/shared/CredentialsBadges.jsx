import { motion } from "framer-motion";

const credentials = [
  {
    acronym: "CIH",
    full: "Certified Industrial Hygienist",
    body: "ABIH",
    color: "bg-[#1a3a52] text-white border-[#1a3a52]"
  },
  {
    acronym: "CSP",
    full: "Certified Safety Professional",
    body: "BCSP",
    color: "bg-[#0F2A4A] text-white border-[#0F2A4A]"
  },
  {
    acronym: "CRSP",
    full: "Canadian Registered Safety Professional",
    body: "BCRSP",
    color: "bg-emerald-700 text-white border-emerald-700"
  }
];

export default function CredentialsBadges({ dark = false }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {credentials.map((cred, index) => (
        <motion.div
          key={cred.acronym}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 shadow-sm ${cred.color}`}
        >
          <div className="text-2xl font-extrabold tracking-tight">{cred.acronym}</div>
          <div>
            <div className="text-xs font-semibold opacity-90">{cred.full}</div>
            <div className="text-xs opacity-70">{cred.body} Certified</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}