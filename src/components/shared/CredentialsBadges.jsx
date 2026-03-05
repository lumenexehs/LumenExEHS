import { motion } from "framer-motion";

const logos = [
  {
    name: "CIH",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/c87874c5b_CIH-BGC-1.png",
    bg: "bg-white"
  },
  {
    name: "CSP",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e35794f13_1742923500322.jpg",
    bg: "bg-black"
  },
  {
    name: "CRSP",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/53789e80a_BCRSP_CRSP.png",
    bg: "bg-white"
  }
];

export default function CredentialsBadges({ dark = false }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
      {logos.map((logo, index) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.12 }}
          className={`rounded-2xl overflow-hidden ${logo.bg} p-3 flex items-center justify-center ring-2 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.12)]`}
          style={{ width: 130, height: 130 }}
        >
          <img
            src={logo.url}
            alt={`${logo.name} credential logo`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}