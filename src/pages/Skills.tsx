import { motion } from "motion/react";
import {
  Cpu, Layout, Rocket, Terminal, Box, Lightbulb,
  Brain, Users, Clock, Handshake, MessageSquare, BarChart,
  FileSpreadsheet, Video, DraftingCompass, Frame
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
  video: Video,
  lightbulb: Lightbulb,
  brain: Brain,
  "user-tie": Users,
  clock: Clock,
  handshake: Handshake,
  comments: MessageSquare,
  "chart-line": BarChart
};

export default function Skills() {
  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-10 text-center flex items-center justify-center text-white">
              <Terminal className="mr-3 text-indigo-400" /> Technical Arsenal
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {portfolioData.skills?.technical?.map((skill, idx) => {
                const Icon = iconMap[skill.icon] || Box;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group"
                  >
                    <Icon className="mb-3 text-indigo-400 group-hover:text-indigo-300 transition-colors" size={28} />
                    <span className="text-xs font-bold text-center text-gray-400 group-hover:text-white uppercase tracking-wider">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-10 text-center flex items-center justify-center text-white">
              <Users className="mr-3 text-purple-400" /> Human Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {portfolioData.skills?.soft?.map((skill, idx) => {
                const Icon = iconMap[skill.icon] || Box;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group"
                  >
                    <Icon className="mb-3 text-purple-400 group-hover:text-purple-300 transition-colors" size={28} />
                    <span className="text-xs font-bold text-center text-gray-400 group-hover:text-white uppercase tracking-wider">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
