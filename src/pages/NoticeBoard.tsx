import { motion } from "motion/react";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "../data";

export default function NoticeBoard() {
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
              
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 group cursor-pointer hover:gap-4 transition-all uppercase tracking-[0.2em]">
                Details <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
