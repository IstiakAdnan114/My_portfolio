import { motion } from "motion/react";
import {
  Cpu, BarChart, Globe, Code, DraftingCompass, Sparkles
} from "lucide-react";
import { portfolioData } from "../data";

const categoryIcons: Record<string, any> = {
  "Data & ML": BarChart,
  "Manufacturing & Analysis": DraftingCompass,
  "Embedded & IoT": Cpu,
  "Web Development": Code,
  "Languages": Globe
};

export default function Skills() {
  return (
    <section className="pt-16 pb-24 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <Sparkles size={14} /> {portfolioData.site.pageCopy.skills.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            {portfolioData.site.pageCopy.skills.heading}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {portfolioData.site.pageCopy.skills.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.skills.map((category, idx) => {
            const Icon = categoryIcons[category.category] || Cpu;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-500"
              >
                <div className="flex items-center mb-8">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 mr-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-sm text-gray-300 font-medium transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
