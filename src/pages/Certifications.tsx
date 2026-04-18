import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ExternalLink, Filter, Search, X, Image as ImageIcon } from "lucide-react";
import { portfolioData } from "../data";

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ["All", ...new Set(portfolioData.certifications.map(c => c.category))];

  const filteredCerts = activeCategory === "All" 
    ? portfolioData.certifications 
    : portfolioData.certifications.filter(c => c.category === activeCategory);

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <Award size={14} /> My Credentials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Licenses & Certifications
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A track record of continuous learning, workshops, and verified professional achievements.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 text-gray-500 mr-2 border-r border-white/10 pr-4">
            <Filter size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                activeCategory === cat 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 border-indigo-500" 
                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div 
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="glass-card overflow-hidden bg-white/5 border border-white/10 group flex flex-col relative"
              >
                {/* Visual Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black text-gray-300 uppercase tracking-widest">
                    {cert.category}
                  </span>
                </div>

                <div 
                  className="h-52 overflow-hidden relative cursor-zoom-in group-hover:h-56 transition-all duration-500"
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600/20">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <ImageIcon size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <Award size={20} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none">{cert.issuer}</span>
                        <p className="text-gray-500 text-[10px] font-mono mt-1">{cert.date}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-6 text-white leading-tight group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="mt-auto">
                    {cert.link ? (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full text-[10px] font-black text-white bg-indigo-600/80 hover:bg-indigo-600 py-3 rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-indigo-900/20"
                      >
                        Verify Credential <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button 
                        onClick={() => setSelectedImage(cert.image)}
                        className="flex items-center justify-center gap-2 w-full text-[10px] font-black text-gray-400 border border-white/10 hover:border-white/20 py-3 rounded-xl transition-all uppercase tracking-widest hover:text-white"
                      >
                        View Certificate <ImageIcon size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Search size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No certifications found in this category.</p>
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-[2010] max-w-[95vw] max-h-[90vh] flex items-center justify-center cursor-zoom-out"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <img 
                src={selectedImage} 
                alt="Certificate" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl bg-white/5"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Simple Floating Close Button for Certifications */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="fixed top-20 right-6 z-[2100] group flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full transition-all hover:scale-110 active:scale-95 border-2 border-white/40 glow-red"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
