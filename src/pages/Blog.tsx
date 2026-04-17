import { motion } from "motion/react";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../data";

export default function Blog() {
  return (
    <section className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              Blog & Insights
            </h2>
            <p className="text-gray-400 max-w-xl text-lg">
              Exploring the intersections of Industrial Engineering, automation, and the digital future.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="px-5 py-2 glass-card bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              {portfolioData.blogPosts.length} Articles
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolioData.blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer glass-card bg-white/5 border border-white/10 overflow-hidden h-full"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-6 text-xs text-gray-500 mb-4 font-mono">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-indigo-400" /> {post.date}</span>
                    <span className="flex items-center gap-2"><BookOpen size={14} className="text-indigo-400" /> 5 min read</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest text-[10px]">
                    Continue Reading <ArrowRight size={18} className="text-indigo-400" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
