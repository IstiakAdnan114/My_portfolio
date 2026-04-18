import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin, ArrowDown, Play, Pause, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { portfolioData } from "../data";
import ProfileCard from "../components/ProfileCard";

const FuzzyQuote = ({ text }: { text: string }) => {
  const [isAnimate, setIsAnimate] = useState(true);

  return (
    <div className="relative group inline-block mt-4 mb-2">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`text-indigo-400 font-mono italic text-sm sm:text-lg px-2 py-1 rounded select-none ${isAnimate ? 'animate-fuzzy' : ''}`}
      >
        "{text}"
      </motion.p>
      
      <button 
        onClick={() => setIsAnimate(!isAnimate)}
        className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        title={isAnimate ? "Pause animation" : "Play animation"}
      >
        {isAnimate ? <Pause size={14} className="text-indigo-400" /> : <Play size={14} className="text-green-400" />}
      </button>
    </div>
  );
};

const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="border-r-2 border-orange-400 pr-1 animate-pulse">
      {displayText}
    </span>
  );
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <ProfileCard
            name={portfolioData.name}
            title={portfolioData.title}
            handle="adnanistiak111"
            status="Available for work"
            avatarUrl={portfolioData.avatarUrl}
            contactText="Get in Touch"
            onContactClick={() => navigate("/contact")}
            behindGlowEnabled={true}
            behindGlowColor="rgba(99, 102, 241, 0.4)"
            innerGradient="linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(99, 102, 241, 0.2) 100%)"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 font-space"
        >
          <Typewriter text={portfolioData.name} />
        </motion.h1>

        <FuzzyQuote text={portfolioData.quote} />

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl font-semibold mb-6 text-yellow-300"
        >
          {portfolioData.title}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto mb-8 opacity-90 text-lg"
        >
          {portfolioData.about.split('\n')[0]}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-10"
        >
          <a
            href={portfolioData.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20"
          >
            <Download size={18} className="mr-2" /> Download CV
          </a>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <a href={portfolioData.socials.linkedin} target="_blank" className="p-3 glass-card rounded-full hover:scale-110"><Linkedin /></a>
          <a href={portfolioData.socials.github} target="_blank" className="p-3 glass-card rounded-full hover:scale-110"><Github /></a>
          <a href={`mailto:${portfolioData.email}`} className="p-3 glass-card rounded-full hover:scale-110"><Mail /></a>
        </div>

        <div className="flex flex-col items-center">
          <p className="flex items-center text-sm opacity-80 mb-8">
            <MapPin size={16} className="mr-2" /> {portfolioData.location}
          </p>
          <Link to="/about" className="animate-bounce p-3 glass border border-white/20 rounded-full hover:bg-white/10 transition-colors">
            <ArrowDown />
          </Link>
        </div>
      </div>
    </section>
  );
}
