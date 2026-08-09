import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, ExternalLink, GraduationCap, LibraryBig, UserRound, X } from "lucide-react";
import { useCms, type PortfolioContent } from "../cms/ContentProvider";

type EducationEntry = PortfolioContent["education"][number];

function CurriculumDialog({ education, onClose }: { education: EducationEntry; onClose: () => void }) {
  const groupedCourses = useMemo(() => {
    const groups = new Map<string, EducationEntry["courses"]>();
    education.courses.forEach(course => {
      const category = course.category.trim() || "Other subjects";
      groups.set(category, [...(groups.get(category) ?? []), course]);
    });
    return [...groups.entries()];
  }, [education]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-x-0 bottom-0 top-14 sm:top-16 z-[100] bg-slate-950/85 backdrop-blur-md px-3 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-5 md:px-10 flex items-start justify-center"
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-title"
        className="w-full max-w-5xl max-h-full overflow-y-auto overscroll-contain rounded-3xl border border-indigo-300/20 bg-[#0b1120] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
      >
        <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-transparent">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase tracking-[0.2em]">
              <LibraryBig size={16} /> Course catalogue
            </div>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close curriculum"
              className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={19} />
            </button>
          </div>
          <h2 id="curriculum-title" className="text-2xl sm:text-4xl font-bold text-white max-w-3xl">
            {education.detailsTitle}
          </h2>
          <p className="mt-4 text-slate-300 leading-relaxed max-w-3xl">{education.detailsIntro}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            {education.courses.length > 0 && (
              <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1.5 text-indigo-200">
                {education.courses.length} {education.courses.length === 1 ? "subject" : "subjects"}
              </span>
            )}
            {education.catalogueUrl && (
              <a href={education.catalogueUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-slate-300 hover:text-white hover:border-indigo-400/40 transition-colors">
                Official department catalogue <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {groupedCourses.length ? (
            <div className="space-y-9">
              {groupedCourses.map(([category, courses]) => (
                <section key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-indigo-400/60" />
                    <h3 className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">{category}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                      <article key={`${course.code}-${course.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 hover:border-indigo-400/25 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            {course.code && <p className="text-xs font-mono font-bold text-indigo-300 mb-1">{course.code}</p>}
                            <h4 className="font-bold text-white text-lg leading-snug">{course.title}</h4>
                          </div>
                          {course.credits && <span className="shrink-0 text-[11px] font-semibold rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-slate-400">{course.credits} cr.</span>}
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{course.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-slate-400">
              Additional subjects can be added from the admin dashboard.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const { published } = useCms();
  const [selectedEducationIndex, setSelectedEducationIndex] = useState<number | null>(null);
  const selectedEducation = selectedEducationIndex === null ? null : published.education[selectedEducationIndex] ?? null;

  return (
    <section className="pt-16 pb-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <UserRound size={14} /> {published.site.pageCopy.about.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            {published.site.pageCopy.about.heading}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {published.site.pageCopy.about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-8 bg-white/5 border border-white/10"
          >
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {published.about}
            </p>
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
              <GraduationCap className="mr-3 text-indigo-400" /> {published.site.pageCopy.about.educationHeading}
            </h3>
            {published.education.map((edu, idx) => (
              <motion.div
                key={`${edu.institution}-${idx}`}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl border-l-4 border-indigo-500 glass-card bg-white/5 border border-white/10 shadow-sm"
              >
                <h4 className="font-bold text-lg text-indigo-400">{edu.institution}</h4>
                <p className="text-gray-300 mt-1">{edu.degree}</p>
                <div className="mt-2 flex flex-col items-start gap-4">
                  <span className="text-sm text-slate-400 font-mono tracking-tight">{edu.period}</span>
                  {(edu.detailsIntro || edu.courses.length > 0) && (
                    <button
                      type="button"
                      onClick={() => setSelectedEducationIndex(idx)}
                      aria-haspopup="dialog"
                      className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-200 hover:text-white rounded-full border border-indigo-400/25 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 transition-all"
                    >
                      <BookOpen size={16} /> {edu.detailsLabel || "View study details"}
                      <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedEducation && <CurriculumDialog education={selectedEducation} onClose={() => setSelectedEducationIndex(null)} />}
    </section>
  );
}
