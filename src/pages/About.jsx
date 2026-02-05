import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Award, 
  Users, 
  Target, 
  Heart,
  CheckCircle,
  ArrowRight,
  Building2,
  Shield
} from "lucide-react";

const team = [
  {
    name: "Dr. Robert Harrison",
    role: "Founder & CEO",
    bio: "25+ years in environmental consulting, former EPA senior advisor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    role: "Director of Safety",
    bio: "CSP certified, OSHA authorized instructor with 15 years experience",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  },
  {
    name: "James Thompson",
    role: "Senior Environmental Scientist",
    bio: "PE, QEP certified with expertise in air quality and remediation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Lisa Chen",
    role: "Compliance Manager",
    bio: "Specializes in EPA, OSHA, and state regulatory compliance",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  }
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our work and recommendations."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver exceptional quality and continuously improve our expertise."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We build lasting relationships based on trust and mutual success."
  },
  {
    icon: Heart,
    title: "Commitment",
    description: "We're dedicated to protecting people and the environment."
  }
];

const certifications = [
  "ISO 14001:2015 Certified",
  "ISO 45001:2018 Certified",
  "OSHA Authorized Training Provider",
  "EPA Smart Sectors Partner",
  "AIHA Member Organization",
  "NAEM Corporate Member"
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F2A4A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Two Decades of EHS Excellence
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Since 2005, we've been helping organizations create safer workplaces 
              and more sustainable operations through expert consulting and unwavering commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded by Dr. Robert Harrison after his tenure at the EPA, our firm 
                  was built on a simple belief: every organization deserves access to 
                  expert EHS guidance that makes a real difference.
                </p>
                <p>
                  What started as a small consultancy has grown into a full-service 
                  EHS firm serving clients across manufacturing, energy, healthcare, 
                  and construction industries throughout North America.
                </p>
                <p>
                  Today, our team of 40+ certified professionals brings decades of 
                  combined experience to every project, ensuring our clients receive 
                  the highest caliber of service and expertise.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">40+</div>
                    <div className="text-sm text-slate-500">Team Members</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15+</div>
                    <div className="text-sm text-slate-500">Certifications</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-emerald-100">Years of Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Meet the Experts
            </h2>
            <p className="text-lg text-slate-600">
              Industry veterans dedicated to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <div className="text-emerald-600 font-medium text-sm mb-2">
                  {member.role}
                </div>
                <p className="text-slate-500 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-[#0F2A4A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Certifications & Memberships
            </h2>
            <p className="text-slate-400">
              Recognized excellence in environmental, health, and safety consulting
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-lg p-4 text-center"
              >
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Ready to partner with a team that truly understands your EHS challenges?
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full group"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}