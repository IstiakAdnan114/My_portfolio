import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { portfolioData } from "../data";

export default function About() {
  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          About My Journey
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-8 bg-white/5 border border-white/10"
          >
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {portfolioData.about}
            </p>
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
              <GraduationCap className="mr-3 text-indigo-400" /> Education
            </h3>
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl border-l-4 border-indigo-500 glass-card bg-white/5 border border-white/10 shadow-sm"
              >
                <h4 className="font-bold text-lg text-indigo-400">{edu.institution}</h4>
                <p className="text-gray-300">{edu.degree}</p>
                <span className="text-sm text-white-400 font-mono tracking-tighter">{edu.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
