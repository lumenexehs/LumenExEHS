import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16 bg-[#0F2A4A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Legal</span>
            <h1 className="text-4xl font-bold text-white mt-3">Privacy Policy</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate max-w-none">
          <p className="text-slate-500 text-sm mb-10">Last updated: February 2026</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4">When you contact us through this website, we may collect:</p>
          <ul className="text-slate-600 mb-8 space-y-1 list-disc pl-5">
            <li>Name, email address, phone number, and company name</li>
            <li>Details of your inquiry or project description</li>
            <li>Technical data such as browser type and IP address (collected automatically)</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4">We use the information collected to:</p>
          <ul className="text-slate-600 mb-8 space-y-1 list-disc pl-5">
            <li>Respond to your inquiries and provide requested services</li>
            <li>Send service-related communications</li>
            <li>Improve our website and service offerings</li>
            <li>Comply with legal obligations under Ontario and Canadian law</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Disclosure of Information</h2>
          <p className="text-slate-600 mb-8">We do not sell or rent your personal information to third parties. Information may be disclosed where required by law or as necessary to provide professional services under a formal engagement agreement.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Security</h2>
          <p className="text-slate-600 mb-8">We implement reasonable administrative and technical safeguards to protect personal information against unauthorized access, disclosure, or loss. However, no method of internet transmission is completely secure.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Retention</h2>
          <p className="text-slate-600 mb-8">Personal information is retained only as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
          <p className="text-slate-600 mb-8">Under PIPEDA and Ontario's privacy legislation, you have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at info@lumenexehs.ca.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact</h2>
          <p className="text-slate-600 mb-2">For privacy-related questions or concerns:</p>
          <p className="text-slate-700 font-medium">info@lumenexehs.ca</p>
          <p className="text-slate-600">Toronto, Ontario, Canada</p>
        </div>
      </section>
    </div>
  );
}