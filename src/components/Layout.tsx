import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "../data";
import ParticlesBackground from "./ParticlesBackground";
import LightRays from "./LightRays";

interface LayoutProps {
  children: ReactNode;
}

const NavLink = ({ to, children, onClick }: { to: string, children: ReactNode, onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        isActive 
          ? "text-indigo-400 font-bold" 
          : "text-gray-300 hover:text-indigo-400"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen transition-all duration-300 font-sans bg-[#0f172a] text-[#f1f5f9] overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/40 rounded-full blur-[150px]"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-purple-900/10 rounded-full blur-[100px]" style={{ animationDelay: "-3s" }}></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4f46e5"
          raysSpeed={0.3}
          lightSpread={0.9}
          rayLength={2.0}
          followMouse={true}
          mouseInfluence={0.02}
          noiseAmount={0.02}
          distortion={0.01}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {portfolioData.name.toUpperCase()}
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/skills">Skills</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/certifications">Certifications</NavLink>
            <NavLink to="/notices">Notices</NavLink>
            <NavLink to="/photos">Photos</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                <NavLink to="/experience" onClick={() => setIsMenuOpen(false)}>Experience</NavLink>
                <NavLink to="/skills" onClick={() => setIsMenuOpen(false)}>Skills</NavLink>
                <NavLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
                <NavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
                <NavLink to="/certifications" onClick={() => setIsMenuOpen(false)}>Certifications</NavLink>
                <NavLink to="/notices" onClick={() => setIsMenuOpen(false)}>Notices</NavLink>
                <NavLink to="/photos" onClick={() => setIsMenuOpen(false)}>Photos</NavLink>
                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 relative z-10">
        {children}
      </main>

      <footer className="py-12 border-t border-white/10 glass mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
