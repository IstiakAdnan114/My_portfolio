import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Certifications from "./pages/Certifications";
import NoticeBoard from "./pages/NoticeBoard";
import Photos from "./pages/Photos";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import Publications from "./pages/Publications";

export default function App() {
  useEffect(() => {
    // Force dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
