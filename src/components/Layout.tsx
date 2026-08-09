import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { portfolioData } from "../data";
import LightRays from "./LightRays";
import FloatingLines from "./FloatingLines";
import { useCms } from "../cms/ContentProvider";

interface LayoutProps {
  children: ReactNode;
}

const BACKGROUND_LINE_GRADIENT = ["#1d1710", "#202922", "#231c1d"];
const BACKGROUND_WAVES: Array<'middle'> = ['middle'];

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
  const currentNavigationIndex = navigation.findIndex(item => item.path === location.pathname);
  const currentNavigationItem = currentNavigationIndex >= 0 ? navigation[currentNavigationIndex] : null;
  const blogPost = location.pathname.startsWith("/blog/")
    ? portfolioData.blogPosts.find(post => `/blog/${post.id}` === location.pathname)
    : null;
  const pageTitle = blogPost?.title ?? currentNavigationItem?.label ?? "Portfolio";
  const nextNavigationItem = currentNavigationIndex >= 0 && navigation.length > 1
    ? navigation[(currentNavigationIndex + 1) % navigation.length]
    : null;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Give every route its own browser-tab title while keeping the page design unchanged.
  useEffect(() => {
    document.title = `${pageTitle} | ${portfolioData.name}`;
  }, [pageTitle, portfolioData.name]);

  return (
    <div className="min-h-screen font-sans text-[#f1f5f9] relative overflow-x-hidden" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="fixed inset-0 pointer-events-none z-[0] tech-grid opacity-20" style={{ backgroundColor: theme.background }}></div>
      <div className="fixed inset-0 pointer-events-none z-[0] tech-grid-sub opacity-30"></div>

      <div className="fixed inset-0 pointer-events-none z-[1] opacity-40">
        <FloatingLines
          linesGradient={BACKGROUND_LINE_GRADIENT}
          enabledWaves={BACKGROUND_WAVES}
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
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(165,180,252,0.28)] hover:from-indigo-200 hover:to-purple-200 transition-all">
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
        {nextNavigationItem && (
          <nav aria-label="Continue to next page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2 flex justify-end">
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={nextNavigationItem.path}
                className="group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3.5 transition-colors"
              >
                <span className="text-right">
                  <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">Next page</span>
                  <span className="block text-sm font-bold text-gray-200 group-hover:text-white">{nextNavigationItem.label}</span>
                </span>
                <span className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </motion.div>
          </nav>
        )}
      </main>

      <footer className="py-12 border-t border-white/10 glass mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
