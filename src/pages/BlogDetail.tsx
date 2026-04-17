import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, BookOpen, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { portfolioData } from "../data";

export default function BlogDetail() {
  const { id } = useParams();
  const post = portfolioData.blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-indigo-400 font-bold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
              </Link>
              
              <div className="flex gap-4 mb-6">
                <span className="px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-300 font-mono">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-indigo-400" /> Md. Istiak Adnan
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-400" /> {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-400" /> 5 min read
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 md:p-16 bg-white/5 border border-white/10"
        >
          <div className="markdown-body prose prose-invert prose-indigo max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Author Footer */}
        <div className="mt-16 p-8 border-t border-white/10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/30">
            <img src="https://picsum.photos/seed/adnan/200/200" alt="Md. Istiak Adnan" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Md. Istiak Adnan</h4>
            <p className="text-gray-400 text-sm">Industrial & Production Engineer | BUET | Tech Enthusiast</p>
          </div>
        </div>
      </div>
    </article>
  );
}
