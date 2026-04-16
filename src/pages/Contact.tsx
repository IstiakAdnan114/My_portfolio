import { motion } from "motion/react";
import { 
  Mail, Linkedin, Github, Facebook, GraduationCap, Box, 
  MessageSquare, Phone, MapPin 
} from "lucide-react";
import { portfolioData } from "../data";

export default function Contact() {
  return (
    <section className="relative min-h-[80vh] py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="floating absolute top-20 left-10 w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/20" style={{ animationDelay: "0s" }}>
          <Mail size={32} className="text-indigo-400" />
        </div>
        <div className="floating absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/20" style={{ animationDelay: "-2s" }}>
          <Phone size={40} className="text-purple-400" />
        </div>
        <div className="floating absolute bottom-32 left-1/4 w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/20" style={{ animationDelay: "-4s" }}>
          <MapPin size={28} className="text-blue-400" />
        </div>
        <div className="floating absolute top-1/2 right-10 w-28 h-28 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/20" style={{ animationDelay: "-1s" }}>
          <Linkedin size={36} className="text-emerald-400" />
        </div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            Let's Build Together
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
            I'm currently exploring new opportunities in Industrial Production Engineering and Automation. Let's start a conversation!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <motion.a 
            href={`mailto:${portfolioData.email}`} 
            whileHover={{ y: -10 }}
            className="glass-card p-10 group bg-white/5 border border-white/10"
          >
            <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Mail className="transition-transform group-hover:scale-110" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Address</h3>
            <p className="text-gray-400 font-mono text-sm">{portfolioData.email}</p>
          </motion.a>
          
          <motion.a 
            href={`tel:${portfolioData.phone}`} 
            whileHover={{ y: -10 }}
            className="glass-card p-10 group bg-white/5 border border-white/10"
          >
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Phone className="transition-transform group-hover:scale-110" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Mobile Number</h3>
            <p className="text-gray-400 font-mono text-sm">{portfolioData.phone}</p>
          </motion.a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href={portfolioData.socials.linkedin} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Linkedin /></a>
          <a href={portfolioData.socials.facebook} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Facebook /></a>
          <a href={portfolioData.socials.github} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Github /></a>
          <a href={portfolioData.socials.researchgate} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><GraduationCap /></a>
          <a href={portfolioData.socials.grabcad} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Box /></a>
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-16"
        >
          <a href="https://forms.gle/P8e7CxcbHiDF539F9" target="_blank" className="inline-flex items-center px-10 py-5 bg-white text-indigo-900 font-black rounded-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all uppercase tracking-widest text-xs">
            <MessageSquare className="mr-3" size={20} /> Drop a Message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
