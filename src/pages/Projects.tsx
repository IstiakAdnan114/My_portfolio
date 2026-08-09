import { useState } from "react";
import { motion } from "motion/react";
import {
  ExternalLink, Github, Box, Cpu, Video, User, Utensils, Car, House,
  Images, Image as ImageIcon, ArrowUpRight
} from "lucide-react";
import { portfolioData } from "../data";
import AdvancedLightbox from "../components/AdvancedLightbox";

const iconMap: Record<string, any> = {
  user: User,
  microchip: Cpu,
  utensils: Utensils,
  car: Car,
  home: House,
  cube: Box,
};

const linkIconMap: Record<string, any> = {
  github: Github,
  youtube: Video,
};

export default function Projects() {
  const [lightbox, setLightbox] = useState<{
    images: { src: string; caption: string }[];
    initialIndex: number;
  } | null>(null);
  const copy = portfolioData.site.pageCopy.projects;

  const openGallery = (images: { src: string; caption: string }[], index = 0) => {
    if (images.length) setLightbox({ images, initialIndex: index });
  };

  return (
    <section className="pt-16 pb-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <Images size={14} /> {copy.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {copy.heading}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">{copy.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {portfolioData.projects.map((project, idx) => {
            const Icon = iconMap[project.icon] || Box;
            const gallery = project.images.filter(image => image.src);
            const coverImage = project.coverImage || gallery[0]?.src || "";

            return (
              <motion.article
                key={`${project.title}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (idx % 2) * 0.08 }}
                className="glass-card bg-white/5 border border-white/10 overflow-hidden group"
              >
                <button
                  type="button"
                  onClick={() => openGallery(gallery)}
                  disabled={!gallery.length}
                  className="relative w-full h-72 sm:h-80 overflow-hidden text-left disabled:cursor-default"
                  aria-label={gallery.length ? `Open ${project.title} photo gallery` : `${project.title} has no gallery photos yet`}
                >
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={`${project.title} project cover`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/70 flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 mb-5"><Icon size={38} /></div>
                      <p className="text-sm font-bold text-slate-300">Project visual coming soon</p>
                      <p className="text-xs text-slate-500 mt-2">Photos can be added from the owner dashboard</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur text-[10px] uppercase tracking-widest font-black border border-white/10">{project.period}</span>
                    {gallery.length > 0 && <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-[10px] uppercase tracking-widest font-black flex items-center gap-2"><Images size={13} /> {gallery.length} {gallery.length === 1 ? "photo" : "photos"}</span>}
                  </div>
                  {gallery.length > 0 && <span className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"><ImageIcon size={19} /></span>}
                </button>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center"><Icon size={23} /></div>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white">{project.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.tags.map(tag => <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-gray-300">{tag}</span>)}
                  </div>

                  {gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mb-7">
                      {gallery.slice(0, 4).map((image, imageIndex) => (
                        <button key={`${image.src}-${imageIndex}`} type="button" onClick={() => openGallery(gallery, imageIndex)} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-indigo-400 transition">
                          <img src={image.src} alt={image.caption || `${project.title} image ${imageIndex + 1}`} className="w-full h-full object-cover" />
                          {imageIndex === 3 && gallery.length > 4 && <span className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-sm font-black">+{gallery.length - 4}</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, linkIndex) => {
                      const LinkIcon = linkIconMap[link.type] || ExternalLink;
                      return <a key={`${link.url}-${linkIndex}`} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 text-sm font-bold transition"><LinkIcon size={16} /> {link.name} <ArrowUpRight size={14} className="text-slate-500" /></a>;
                    })}
                    {gallery.length > 0 && <button type="button" onClick={() => openGallery(gallery)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 text-sm font-bold transition"><Images size={16} /> View gallery</button>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {lightbox && <AdvancedLightbox images={lightbox.images} initialIndex={lightbox.initialIndex} onClose={() => setLightbox(null)} />}
    </section>
  );
}
