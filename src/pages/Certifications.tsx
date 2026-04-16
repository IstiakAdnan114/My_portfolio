import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";
import { portfolioData } from "../data";

export default function Certifications() {
  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Licenses & Certifications
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A track record of continuous learning and professional development in engineering and management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card overflow-hidden bg-white/5 border border-white/10 group h-full flex flex-col"
            >
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="p-8 flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 shadow-inner">
                    <Award size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{cert.issuer}</span>
                    <p className="text-gray-500 text-xs font-mono">{cert.date}</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mt-auto border border-white/10 px-4 py-2 rounded-lg hover:border-indigo-500/50">
                  VERIFY CREDENTIALS <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
