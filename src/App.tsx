import { useState, useEffect, ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, Linkedin, Github, GraduationCap, Trophy, Medal, 
  ChevronDown, ArrowDown, MapPin, Phone, ExternalLink, 
  Facebook, Download, Eye, Youtube, Sun, Moon,
  Cpu, Layout, Rocket, Terminal, Box, Lightbulb, 
  Brain, Users, Clock, Handshake, MessageSquare, BarChart, 
  FileSpreadsheet, Video, DraftingCompass, Frame, Menu, X,
  Images
} from "lucide-react";
import { portfolioData } from "./data";
import ParticlesBackground from "./components/ParticlesBackground";
import AdvancedLightbox from "./components/AdvancedLightbox";
import LightRays from "./components/LightRays";
import ProfileCard from "./components/ProfileCard";

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: { src: string; caption: string }[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0
  });

  const openPhotos = (category: string) => {
    const photoGroup = portfolioData.photos.find(p => p.category === category);
    if (photoGroup) {
      setLightboxState({
        isOpen: true,
        images: photoGroup.images,
        initialIndex: 0
      });
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-[100]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white font-space">Loading Experience...</h2>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, any> = {
    cube: Box,
    "drafting-compass": DraftingCompass,
    terminal: Terminal,
    python: Cpu,
    html5: Layout,
    "css3-alt": Frame,
    js: Rocket,
    video: Video,
    lightbulb: Lightbulb,
    brain: Brain,
    "user-tie": Users,
    clock: Clock,
    handshake: Handshake,
    comments: MessageSquare,
    "chart-line": BarChart,
    user: Users,
    microchip: Cpu,
    utensils: Rocket,
    car: Box,
    home: Layout,
    trophy: Trophy,
    medal: Medal,
    "chart-bar": BarChart,
    "file-excel": FileSpreadsheet
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const sectionId = id.startsWith('#') ? id.substring(1) : id;
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const NavLink = ({ href, children }: { href: string, children: ReactNode }) => (
    <a 
      href={href} 
      onClick={(e) => {
        e.preventDefault();
        scrollTo(href);
      }}
      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors cursor-pointer"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen transition-all duration-300 font-sans bg-[#111827] text-[#f1f5f9]">
      <ParticlesBackground />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#6366f1"
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={1.8}
          followMouse={true}
          mouseInfluence={0.03}
          noiseAmount={0.03}
          distortion={0.01}
        />
      </div>
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {portfolioData.name.toUpperCase()}
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#photos">Photos</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
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
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#photos">Photos</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center animated-bg overflow-hidden pt-16">
          {/* Floating Elements (Restored) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="floating absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="floating absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" style={{ animationDelay: "-2s" }}></div>
            <div className="floating absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl" style={{ animationDelay: "-4s" }}></div>
          </div>

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
                contactText="Let's Talk"
                onContactClick={() => scrollTo('contact')}
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
              <a href="#about" className="animate-bounce p-2 glass border rounded-full">
                <ArrowDown />
              </a>
            </div>
          </div>
        </section>

        {/* About & Education */}
        <section id="about" className="py-24 px-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card p-8 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {portfolioData.about}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <GraduationCap className="mr-3 text-indigo-600" /> Education
                </h3>
                {portfolioData.education.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className={`p-6 rounded-xl border-l-4 border-indigo-500 bg-white dark:bg-gray-800 shadow-sm`}
                  >
                    <h4 className="font-bold text-lg dark:text-indigo-400">{edu.institution}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{edu.degree}</p>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 md:ml-auto md:mr-auto space-y-12">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg pulse-glow"></div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 dark:bg-gray-800"
                  >
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{exp.period}</span>
                    <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.company}</p>
                    <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start">
                          <span className="mr-2 text-indigo-500">•</span> {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Technical */}
              <div className="glass-card p-8 dark:bg-gray-800">
                <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
                  <Terminal className="mr-3" /> Technical Skills
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolioData.skills.technical.map((skill, idx) => {
                    const Icon = iconMap[skill.icon] || Box;
                    return (
                      <div key={idx} className="flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors group">
                        <Icon className="mb-2 text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-center">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="glass-card p-8 dark:bg-gray-800">
                <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
                  <Users className="mr-3" /> Soft Skills
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolioData.skills.soft.map((skill, idx) => {
                    const Icon = iconMap[skill.icon] || Box;
                    return (
                      <div key={idx} className="flex flex-col items-center p-4 rounded-xl hover:bg-white/5 transition-colors group">
                        <Icon className="mb-2 text-purple-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-center">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="space-y-4">
              {portfolioData.projects.map((project, idx) => {
                const Icon = iconMap[project.icon] || Box;
                return (
                  <div key={idx} className="glass-card overflow-hidden dark:bg-gray-800">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-lg font-bold">{project.title}</span>
                      </div>
                      <ChevronDown className={`transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeAccordion === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 border-t border-white/10">
                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                              {project.links.map((link, lIdx) => (
                                <a 
                                  key={lIdx} 
                                  href={link.url} 
                                  target="_blank" 
                                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-bold"
                                >
                                  {link.type === 'github' ? <Github size={16} className="mr-2" /> : <ExternalLink size={16} className="mr-2" />}
                                  {link.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <section id="photos" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-6xl mx-auto text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Photo Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.photos.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openPhotos(item.category)}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden h-64">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Images size={32} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-left border-t border-white/5">
                    <h4 className="font-bold text-xl group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                      {item.title}
                      <span className="text-xs px-2 py-1 bg-indigo-500/20 rounded-md text-indigo-400">
                        {item.images.length} shot{item.images.length !== 1 ? 's' : ''}
                      </span>
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Advanced Lightbox */}
        {lightboxState.isOpen && (
          <AdvancedLightbox 
            images={lightboxState.images}
            initialIndex={lightboxState.initialIndex}
            onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
          />
        )}

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.achievements.map((item, idx) => {
                const Icon = iconMap[item.type] || Trophy;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 flex items-start dark:bg-gray-800"
                  >
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mr-6 text-indigo-600 dark:text-indigo-400">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">{item.date}</span>
                        {item.link && (
                          <a href={item.link} target="_blank" className="text-indigo-600 hover:underline text-xs font-bold">View Credentials</a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen py-24 flex flex-col items-center justify-center animated-bg text-white px-4">
          {/* Floating Contact Icons (Restored) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center" style={{ animationDelay: "0s" }}>
              <Mail />
            </div>
            <div className="floating absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center" style={{ animationDelay: "-2s" }}>
              <Phone />
            </div>
            <div className="floating absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center" style={{ animationDelay: "-4s" }}>
              <MapPin />
            </div>
            <div className="floating absolute top-1/2 right-10 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center" style={{ animationDelay: "-1s" }}>
              <Linkedin />
            </div>
          </div>

          <div className="max-w-4xl w-full text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              I am actively seeking new opportunities and would love to discuss how my skills and experience can benefit your team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <a href={`mailto:${portfolioData.email}`} className="glass-card p-8 group hover:scale-105">
                <Mail className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-2">Email Me</h3>
                <p className="opacity-80">{portfolioData.email}</p>
              </a>
              <a href={`tel:${portfolioData.phone}`} className="glass-card p-8 group hover:scale-105">
                <Phone className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-2">Call Me</h3>
                <p className="opacity-80">{portfolioData.phone}</p>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a href={portfolioData.socials.linkedin} target="_blank" className="p-4 glass-card rounded-full hover:scale-110"><Linkedin /></a>
              <a href={portfolioData.socials.facebook} target="_blank" className="p-4 glass-card rounded-full hover:scale-110"><Facebook /></a>
              <a href={portfolioData.socials.github} target="_blank" className="p-4 glass-card rounded-full hover:scale-110"><Github /></a>
              <a href={portfolioData.socials.researchgate} target="_blank" className="p-4 glass-card rounded-full hover:scale-110"><GraduationCap /></a>
              <a href={portfolioData.socials.grabcad} target="_blank" className="p-4 glass-card rounded-full hover:scale-110"><Box /></a>
            </div>

            <div className="mb-12">
               <a href="https://forms.gle/P8e7CxcbHiDF539F9" target="_blank" className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all">
                <MessageSquare className="mr-2" /> Tell me anything!
              </a>
            </div>

            <p className="opacity-60 text-sm">© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
