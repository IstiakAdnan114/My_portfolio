import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../data";
import ProfileCard from "../components/ProfileCard";

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
            handle="adnanistiak"
            status="Available for work"
            avatarUrl="https://picsum.photos/seed/adnan/600/600"
            contactText="Get in Touch"
            onContactClick={() => {}} // This will navigate via Link wrap in future or just keep for aesthetics
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
