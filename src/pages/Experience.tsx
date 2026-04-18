import { motion } from "motion/react";
import { portfolioData } from "../data";

export default function Experience() {
  const professionalExp = portfolioData.experience.filter(exp => 
    exp.role === "Industrial Attachment Trainee" || exp.company.includes("Udvash")
  );
  
  const leadershipExp = portfolioData.experience.filter(exp => 
    exp.role !== "Industrial Attachment Trainee" && !exp.company.includes("Udvash")
  );

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          My Journey
        </motion.h2>
        
        {/* Professional Experience Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
            <span className="w-8 h-1 bg-indigo-500 mr-4 rounded-full"></span>
            Professional Experience
          </h3>
          <div className="relative border-l-2 border-indigo-900 ml-4 lg:ml-8 space-y-12">
            {professionalExp.map((exp, idx) => (
              <div key={idx} className="relative pl-8 lg:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full border-4 border-[#0f172a] shadow-lg pulse-glow"></div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 bg-white/5 border border-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                  <ul className="space-y-3 text-gray-300">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className="mr-3 text-indigo-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span> 
                        <p className="text-sm leading-relaxed">{pt}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Service Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
            <span className="w-8 h-1 bg-purple-500 mr-4 rounded-full"></span>
            Leadership & Service
          </h3>
          <div className="relative border-l-2 border-purple-900 ml-4 lg:ml-8 space-y-12">
            {leadershipExp.map((exp, idx) => (
              <div key={idx} className="relative pl-8 lg:pl-12">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-600 rounded-full border-4 border-[#0f172a] shadow-lg"></div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 bg-white/5 border border-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                  <ul className="space-y-3 text-gray-300">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className="mr-3 text-purple-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span> 
                        <p className="text-sm leading-relaxed">{pt}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
