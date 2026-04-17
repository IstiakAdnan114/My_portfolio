import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Calendar, ArrowRight, X } from "lucide-react";
import { portfolioData } from "../data";

interface Notice {
  title: string;
  content: string;
  date: string;
  priority: string;
}

export default function NoticeBoard() {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-500/15 border border-red-500/20 text-red-400 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 animate-pulse">
            <Bell size={14} /> LIVE NEWSFEED
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Announcement Board
          </h2>
          <p className="text-gray-400 text-lg">
            Stay updated with my latest workshops, collaborations, and project launches.
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {portfolioData.notices.map((notice, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-10 bg-white/5 border border-white/10 border-l-4 transition-all hover:translate-x-2 ${
                notice.priority === 'high' ? 'border-red-500' : 'border-indigo-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  {notice.priority === 'high' && <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>}
                  {notice.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <Calendar size={12} className="text-indigo-400" /> {notice.date}
                </div>
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed mb-6 italic">
                {notice.content}
              </p>
              
              <div 
                onClick={() => setSelectedNotice(notice)}
                className="flex items-center gap-2 text-[10px] font-black text-indigo-400 group cursor-pointer hover:gap-4 transition-all uppercase tracking-[0.2em]"
              >
                Details <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass-card p-10 bg-slate-900 border border-white/10 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedNotice(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${
                selectedNotice.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'
              }`}>
                {selectedNotice.priority === 'high' ? 'High Priority' : 'Information'}
              </div>

              <h3 className="text-3xl font-bold mb-4 text-white uppercase tracking-tight">
                {selectedNotice.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-8">
                <Calendar size={14} className="text-indigo-400" /> {selectedNotice.date}
              </div>

              <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap border-t border-white/5 pt-8">
                {selectedNotice.content}
              </div>
              
              <div className="mt-12 flex justify-end">
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-[10px]"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
