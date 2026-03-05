import { motion } from "framer-motion";

const logos = [
  {
    name: "CSP",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/e35794f13_1742923500322.jpg",
    link: "https://www.bcsp.org/"
  },
  {
    name: "CIH",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/c87874c5b_CIH-BGC-1.png",
    link: "https://gobgc.org/cih/"
  },
  {
    name: "CRSP",
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69851d4d33bc1cfaaa36d43f/53789e80a_BCRSP_CRSP.png",
    link: "https://bcrsp.ca/en"
  }
];

export default function CredentialsBadges({ dark = false }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
      {logos.map((logo, index) => (
        <motion.a
          key={logo.name}
          href={logo.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.12 }}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: 130, height: 130 }}
        >
          <img
            src={logo.url}
            alt={`${logo.name} credential logo`}
            className="w-full h-full object-contain"
          />
        </motion.a>
      ))}
    </div>
  );
}