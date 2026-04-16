import { useState } from "react";
import { motion } from "motion/react";
import { Images, Camera } from "lucide-react";
import { portfolioData } from "../data";
import AdvancedLightbox from "../components/AdvancedLightbox";

export default function Photos() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: { src: string; caption: string }[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0
  });

  const openPhotos = (category: string) => {
    const photoGroup = portfolioData.photos.find(p => p.category === category);
    if (photoGroup) {
      setLightboxState({
        isOpen: true,
        images: photoGroup.images,
        initialIndex: 0
      });
    }
  };

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
            <Camera size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Visual Memories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            A glimpse into my life outside of engineering—travels, volunteering, and photography.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.photos.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => openPhotos(item.category)}
              className="glass-card overflow-hidden group cursor-pointer bg-white/5 border border-white/10"
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="p-5 bg-white backdrop-blur-xl rounded-full text-indigo-900 transform translate-y-8 group-hover:translate-y-0 transition-transform shadow-2xl">
                    <Images size={32} />
                  </div>
                </div>
              </div>
              <div className="p-8 text-left border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xl group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-black px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/20 rounded-md text-indigo-400 uppercase">
                    {item.images.length} SHOTS
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxState.isOpen && (
        <AdvancedLightbox 
          images={lightboxState.images}
          initialIndex={lightboxState.initialIndex}
          onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
        />
      )}
    </section>
  );
}
