import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, ExternalLink, Github, Box, DraftingCompass, 
  Terminal, Cpu, Layout, Frame, Rocket, Video
} from "lucide-react";
import { portfolioData } from "../data";

const iconMap: Record<string, any> = {
  cube: Box,
  "drafting-compass": DraftingCompass,
  terminal: Terminal,
  python: Cpu,
  html5: Layout,
  "css3-alt": Frame,
  js: Rocket,
  video: Video
};

export default function Projects() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-6">
          {portfolioData.projects.map((project, idx) => {
            const Icon = iconMap[project.icon] || Box;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card overflow-hidden bg-white/5 border border-white/10"
              >
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-6 shadow-lg shadow-indigo-500/20">
                      <Icon size={28} />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white block mb-1">{project.title}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest">{project.period}</span>
                    </div>
                  </div>
                  <ChevronDown className={`transition-transform duration-500 text-gray-500 ${activeAccordion === idx ? 'rotate-180 text-white' : ''}`} size={24} />
                </button>
                
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 border-t border-white/10 pt-10">
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {project.links.map((link, lIdx) => (
                            <a 
                              key={lIdx} 
                              href={link.url} 
                              target="_blank" 
                              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-600/20 text-sm font-bold"
                            >
                              {link.type === 'github' ? <Github size={18} className="mr-2" /> : <ExternalLink size={18} className="mr-2" />}
                              {link.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
