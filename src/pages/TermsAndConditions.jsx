import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16 bg-[#0F2A4A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">Legal</span>
            <h1 className="text-4xl font-bold text-white mt-3">Terms & Conditions</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate max-w-none">
          <p className="text-slate-500 text-sm mb-10">Last updated: February 2026</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-8">By accessing or using the LumenEx EHS website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site or services.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Services</h2>
          <p className="text-slate-600 mb-8">LumenEx EHS provides occupational hygiene and environmental health & safety consulting services in Ontario. All professional services are governed by separate engagement agreements and applicable Ontario legislation. Content on this website is for informational purposes only and does not constitute professional advice.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Intellectual Property</h2>
          <p className="text-slate-600 mb-8">All content on this website, including text, images, logos, and reports, is the property of LumenEx EHS and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written consent.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Limitation of Liability</h2>
          <p className="text-slate-600 mb-8">LumenEx EHS shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content. Professional advice is provided only through formal engagement agreements.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Links to Third-Party Sites</h2>
          <p className="text-slate-600 mb-8">This website may contain links to third-party websites. LumenEx EHS is not responsible for the content or practices of those sites and does not endorse them.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Governing Law</h2>
          <p className="text-slate-600 mb-8">These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>

          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact</h2>
          <p className="text-slate-600 mb-2">For questions regarding these Terms & Conditions, contact us at:</p>
          <p className="text-slate-700 font-medium">info@lumenexehs.ca</p>
        </div>
      </section>
    </div>
  );
}