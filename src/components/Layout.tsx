import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "../data";
import LightRays from "./LightRays";
import FloatingLines from "./FloatingLines";
import { useCms } from "../cms/ContentProvider";

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
      className={`text-sm font-medium transition-colors ${isActive
        ? "text-indigo-400 font-bold"
        : "text-gray-300 hover:text-indigo-400"
        }`}
    >
      {children}
    </Link>
  );
};

export default function Layout({ children }: LayoutProps) {
  useCms();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = portfolioData.site.navigation.filter(item => item.visible);
  const theme = portfolioData.site.theme;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen font-sans text-[#f1f5f9] relative overflow-x-hidden" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="fixed inset-0 pointer-events-none z-[0] tech-grid opacity-20" style={{ backgroundColor: theme.background }}></div>
      <div className="fixed inset-0 pointer-events-none z-[0] tech-grid-sub opacity-30"></div>

      <div className="fixed inset-0 pointer-events-none z-[1] opacity-40">
        <FloatingLines
          linesGradient={["#1d1710", "#202922", "#231c1d"]}
          enabledWaves={['middle']}
          lineCount={10}
          lineDistance={12}
          bendRadius={5.0}
          bendStrength={-0.2}
          interactive={false}
          parallax={true}
        />
      </div>
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden opacity-30">
        <LightRays
          raysOrigin="top-center"
          raysColor={theme.primary}
          raysSpeed={0.3}
          lightSpread={0.6}
          rayLength={2.0}
          followMouse={false}
          noiseAmount={0}
          distortion={0}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 z-[100] w-full backdrop-blur-md border-b border-white/10" style={{ backgroundColor: `${theme.background}f2` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {portfolioData.name.toUpperCase()}
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navigation.map(item => <NavLink key={item.path} to={item.path}>{item.label}</NavLink>)}
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
              className="md:hidden bg-[#0f172a]/98 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navigation.map(item => <NavLink key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>{item.label}</NavLink>)}
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
