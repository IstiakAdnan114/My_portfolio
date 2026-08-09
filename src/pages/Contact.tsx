import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Mail, Linkedin, Github, Facebook, GraduationCap, Box, 
  Phone, MapPin, Send, CheckCircle2, AlertCircle
} from "lucide-react";
import { portfolioData } from "../data";
import { submitContactMessage } from "../cms/messages";

export default function Contact() {
  const copy = portfolioData.site.pageCopy.contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      await submitContactMessage(form);
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setStatus("success");
    } catch (reason) {
      setFeedback(reason instanceof Error ? reason.message : "Unable to send your message right now.");
      setStatus("error");
    }
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            <Mail size={14} /> {copy.badge}
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            {copy.heading}
          </h1>
          <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-10 group bg-white/5 border border-white/10 relative"
          >
            <a 
              href={`mailto:${portfolioData.email}`}
              className="absolute inset-0 z-0"
              aria-label="Email me"
            ></a>
            <div className="relative z-10 pointer-events-none">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Mail className="transition-transform group-hover:scale-110" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Address</h3>
              <p className="text-gray-300 font-mono text-sm break-all">{portfolioData.email}</p>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(portfolioData.email);
                  alert("Email copied to clipboard!");
                }}
                className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 pointer-events-auto underline cursor-pointer"
              >
                Copy to clipboard
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-10 group bg-white/5 border border-white/10 relative"
          >
            <a 
              href={`tel:${portfolioData.phone}`}
              className="absolute inset-0 z-0"
              aria-label="Call me"
            ></a>
            <div className="relative z-10 pointer-events-none">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Phone className="transition-transform group-hover:scale-110" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile Number</h3>
              <p className="text-gray-300 font-mono text-sm">{portfolioData.phone}</p>
              <span className="mt-4 block text-xs text-purple-400 opacity-60">
                Click to call
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href={portfolioData.socials.linkedin} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Linkedin /></a>
          <a href={portfolioData.socials.facebook} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Facebook /></a>
          <a href={portfolioData.socials.github} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Github /></a>
          <a href={portfolioData.socials.researchgate} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><GraduationCap /></a>
          <a href={portfolioData.socials.grabcad} target="_blank" className="p-5 glass-card rounded-2xl hover:bg-white/10 hover:scale-110 transition-all text-gray-300 hover:text-white"><Box /></a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card text-left p-6 sm:p-10 bg-white/5 border border-white/10 mb-8"
        >
          <div className="text-center mb-9">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center mx-auto mb-4"><Send size={25} /></div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">{copy.formHeading}</h3>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">{copy.formDescription}</p>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-8 text-center" role="status">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">{copy.successTitle}</h4>
              <p className="text-gray-300 mb-5">{copy.successMessage}</p>
              <button type="button" onClick={() => setStatus("idle")} className="text-sm font-bold text-emerald-300 hover:text-white">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="text-sm font-semibold text-gray-300">{copy.nameLabel}
                  <input required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="contact-input mt-2" placeholder="Your full name" />
                </label>
                <label className="text-sm font-semibold text-gray-300">{copy.emailLabel}
                  <input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="contact-input mt-2" placeholder="you@example.com" />
                </label>
              </div>
              <label className="text-sm font-semibold text-gray-300 block">{copy.subjectLabel}
                <input required minLength={3} maxLength={160} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="contact-input mt-2" placeholder="What would you like to discuss?" />
              </label>
              <label className="text-sm font-semibold text-gray-300 block">{copy.messageLabel}
                <textarea required minLength={10} maxLength={5000} rows={7} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="contact-input mt-2 resize-y" placeholder="Write your message here..." />
              </label>
              <label className="absolute -left-[9999px]" aria-hidden="true">Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
              </label>
              {status === "error" && <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 px-4 py-3 text-sm"><AlertCircle size={18} />{feedback}</div>}
              <button disabled={status === "sending"} className="w-full sm:w-auto min-w-48 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition">
                <Send size={18} /> {status === "sending" ? "Sending..." : copy.messageButton}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
