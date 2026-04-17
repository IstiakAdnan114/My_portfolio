import { motion } from "motion/react";
import { BookOpen, FileText, Users, Calendar, ExternalLink, Bookmark } from "lucide-react";
import { portfolioData } from "../data";

export default function Publications() {
  const categories = ["Journal", "Conference", "Poster", "Under Review", "Working Paper"];

  const formatAuthors = (authors: string) => {
    const name = "Md. Istiak Adnan";
    if (!authors.includes(name)) return authors;
    
    const parts = authors.split(name);
    return (
      <>
        {parts[0]}
        <span className="text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4">{name}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <BookOpen size={14} /> My Research
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Publications & Research
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive list of journals, conference papers, and active research items exploring industrial optimization and AI integration.
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category) => {
            const categoryPubs = portfolioData.publications.filter(p => p.type === category);
            if (categoryPubs.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-indigo-500/50"></span>
                    {category}s
                  </h3>
                  <div className="flex-1 h-[1px] bg-white/5"></div>
                </div>

                <div className="space-y-6">
                  {categoryPubs.map((pub, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="glass-card p-8 bg-white/5 border border-white/10 group relative overflow-hidden"
                    >
                      {/* Status Badge */}
                      <div className="absolute top-0 right-0 px-4 py-1.5 bg-indigo-500/10 border-l border-b border-white/10 rounded-bl-xl">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                          {pub.status}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                            {pub.title}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium mb-6">
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-indigo-500/50" />
                              <span className="text-gray-400">
                                {formatAuthors(pub.authors)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bookmark size={16} className="text-indigo-500/50" />
                              <span className="italic text-gray-400">{pub.journal}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-indigo-500/50" />
                              <span>{pub.year}</span>
                            </div>
                          </div>

                          {pub.link && pub.link !== "#" && (
                            <a 
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-400 hover:text-white transition-all uppercase tracking-widest group/link bg-indigo-500/5 px-4 py-2 rounded-lg border border-indigo-500/10 hover:border-indigo-500/50"
                            >
                              View Publication <ExternalLink size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                          )}
                        </div>
                        
                        <div className="hidden md:block">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-gray-600">
                            <FileText size={32} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
