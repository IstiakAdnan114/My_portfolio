import { useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown, ArrowUp, Check, ChevronDown, ChevronRight, Download, ExternalLink,
  Eye, FileJson, ImagePlus, Loader2, LockKeyhole, LogOut, Palette, Plus, RotateCcw,
  Save, Settings, ShieldCheck, Trash2, Upload, UserRound, Wifi, WifiOff
} from "lucide-react";
import { useCms, type PortfolioContent } from "../cms/ContentProvider";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const sectionLabels: Record<string, string> = {
  profile: "Profile & contact",
  account: "Account & security",
  site: "Site design & pages",
  education: "Education",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  publications: "Publications",
  certifications: "Certifications",
  achievements: "Achievements",
  blogPosts: "Blog posts",
  notices: "Notices",
  photos: "Photo galleries",
};

const profileKeys = ["name", "title", "email", "phone", "location", "avatarUrl", "cvUrl", "quote", "about", "socials"];
const titleCase = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, c => c.toUpperCase());
const clone = <T,>(value: T): T => structuredClone(value);

function blankLike(value: JsonValue, key = ""): JsonValue {
  if (typeof value === "string") return "";
  if (typeof value === "number") return key === "id" ? Date.now() : 0;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [childKey, blankLike(child, childKey)]));
  }
  return "";
}

function getAtPath(root: any, path: (string | number)[]) {
  return path.reduce((value, part) => value[part], root);
}

function setAtPath(root: any, path: (string | number)[], nextValue: JsonValue) {
  const next = clone(root);
  let target = next;
  path.slice(0, -1).forEach(part => { target = target[part]; });
  target[path[path.length - 1]] = nextValue;
  return next;
}

function OwnerLogin() {
  const { mode, localOwnerExists, setupLocalOwner, login } = useCms();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isSetup = mode === "local-demo" && !localOwnerExists;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isSetup) {
        if (password !== confirm) throw new Error("The passwords do not match.");
        await setupLocalOwner(password);
      } else await login(email, password);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-shell min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center mb-6"><LockKeyhole /></div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-300 mb-3">Portfolio CMS</p>
        <h1 className="text-3xl font-bold text-white mb-3">{isSetup ? "Create your owner password" : "Owner sign in"}</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          {isSetup ? "This one-time setup protects the local demonstration dashboard." : "Sign in to edit, preview, and publish your portfolio."}
        </p>
        <form onSubmit={submit} className="space-y-5">
          {mode === "supabase" && (
            <label className="block text-sm text-slate-300">Owner email
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="admin-input mt-2" autoComplete="email" />
            </label>
          )}
          <label className="block text-sm text-slate-300">Password
            <input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="admin-input mt-2" autoComplete={isSetup ? "new-password" : "current-password"} />
          </label>
          {isSetup && (
            <label className="block text-sm text-slate-300">Confirm password
              <input required minLength={8} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="admin-input mt-2" autoComplete="new-password" />
            </label>
          )}
          {error && <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 px-5 py-3.5 font-bold text-white flex items-center justify-center gap-2">
            {busy ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}{isSetup ? "Activate dashboard" : "Sign in"}
          </button>
        </form>
        <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white"><Eye size={16} /> Return to website</Link>
      </div>
    </div>
  );
}

interface FieldEditorProps {
  label: string;
  value: JsonValue;
  path: (string | number)[];
  onChange: (path: (string | number)[], value: JsonValue) => void;
  onUpload: (file: File) => Promise<string>;
  depth?: number;
}

function FieldEditor({ label, value, path, onChange, onUpload, depth = 0 }: FieldEditorProps) {
  const [open, setOpen] = useState(depth < 2);
  const [uploading, setUploading] = useState(false);
  const imageField = /image|avatar|photo|thumbnail|src/i.test(label);
  const longText = typeof value === "string" && (value.length > 100 || /about|content|description|excerpt|points/i.test(label));

  if (Array.isArray(value)) {
    const addItem = () => {
      const template = value.length ? blankLike(value[value.length - 1]) : "";
      onChange(path, [...value, template]);
    };
    const move = (index: number, direction: -1 | 1) => {
      const next = [...value];
      const target = index + direction;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      onChange(path, next);
    };
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
        <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
          <span className="font-bold text-white flex items-center gap-2">{open ? <ChevronDown size={17} /> : <ChevronRight size={17} />}{titleCase(label)} <span className="text-xs text-slate-500">({value.length})</span></span>
        </button>
        {open && <div className="px-4 pb-4 space-y-4">
          {value.map((item, index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-300">{titleCase(label).replace(/s$/, "")} {index + 1}</span>
                <div className="flex gap-1">
                  <button type="button" aria-label="Move up" onClick={() => move(index, -1)} className="admin-icon-btn"><ArrowUp size={15} /></button>
                  <button type="button" aria-label="Move down" onClick={() => move(index, 1)} className="admin-icon-btn"><ArrowDown size={15} /></button>
                  <button type="button" aria-label="Delete" onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))} className="admin-icon-btn hover:!text-red-300"><Trash2 size={15} /></button>
                </div>
              </div>
              <FieldEditor label={`${label} item`} value={item} path={[...path, index]} onChange={onChange} onUpload={onUpload} depth={depth + 1} />
            </div>
          ))}
          <button type="button" onClick={addItem} className="w-full border border-dashed border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold"><Plus size={17} /> Add {titleCase(label).replace(/s$/, "")}</button>
        </div>}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className={depth ? "space-y-4" : "rounded-2xl border border-white/10 p-5 space-y-4"}>
        {depth === 0 && <h3 className="font-bold text-lg text-white">{titleCase(label)}</h3>}
        {Object.entries(value).map(([key, child]) => <FieldEditor key={key} label={key} value={child} path={[...path, key]} onChange={onChange} onUpload={onUpload} depth={depth + 1} />)}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm text-slate-300"><span>{titleCase(label)}</span><input type="checkbox" checked={value} onChange={e => onChange(path, e.target.checked)} className="w-5 h-5 accent-indigo-500" /></label>;
  }

  if (typeof value === "number") {
    return <label className="block text-sm text-slate-300">{titleCase(label)}<input type="number" value={value} onChange={e => onChange(path, Number(e.target.value))} className="admin-input mt-2" /></label>;
  }

  const stringValue = value == null ? "" : String(value);
  const isHexColor = /^#[0-9a-f]{6}$/i.test(stringValue);
  return (
    <label className="block text-sm text-slate-300">
      <span className="flex items-center justify-between gap-3"><span>{titleCase(label)}</span>{isHexColor && <span className="w-5 h-5 rounded-full border border-white/20" style={{ background: stringValue }} />}</span>
      <div className="mt-2 flex gap-2">
        {isHexColor && <input aria-label={`${label} color picker`} type="color" value={stringValue} onChange={e => onChange(path, e.target.value)} className="h-11 w-14 rounded-lg bg-transparent border border-white/10 p-1" />}
        {longText ? <textarea value={stringValue} onChange={e => onChange(path, e.target.value)} rows={Math.min(14, Math.max(4, Math.ceil(stringValue.length / 100)))} className="admin-input resize-y" /> : <input value={stringValue} onChange={e => onChange(path, e.target.value)} className="admin-input" />}
        {imageField && <label className="admin-icon-btn h-11 w-11 shrink-0 cursor-pointer" title="Upload image">
          {uploading ? <Loader2 size={17} className="animate-spin" /> : <ImagePlus size={17} />}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);
            try { onChange(path, await onUpload(file)); } finally { setUploading(false); }
          }} />
        </label>}
      </div>
    </label>
  );
}

function AdminDashboard() {
  const cms = useCms();
  const [section, setSection] = useState("profile");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const sectionKeys = useMemo(() => ["profile", "site", ...Object.keys(cms.draft).filter(key => !profileKeys.includes(key) && key !== "site"), "account"], [cms.draft]);

  const update = (path: (string | number)[], value: JsonValue) => cms.setDraft(setAtPath(cms.draft, path, value));
  const run = async (name: string, action: () => Promise<void>, success: string) => {
    setBusy(name); setNotice("");
    try { await action(); setNotice(success); } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Something went wrong."); }
    finally { setBusy(""); }
  };
  const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(cms.draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
    URL.revokeObjectURL(url);
  };
  const activeFields = section === "profile"
    ? profileKeys.map(key => [key, (cms.draft as any)[key]] as const)
    : section === "account" ? [] : [[section, (cms.draft as any)[section]]] as const;

  return (
    <div className="admin-shell min-h-screen text-slate-100">
      <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div><p className="font-black tracking-tight">Portfolio CMS</p><p className="text-[10px] text-slate-500 uppercase tracking-widest">Owner dashboard</p></div>
          <div className="flex items-center gap-2">
            <span className={`hidden sm:flex items-center gap-2 text-xs rounded-full px-3 py-1.5 ${cms.mode === "supabase" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>{cms.mode === "supabase" ? <Wifi size={14} /> : <WifiOff size={14} />}{cms.mode === "supabase" ? "Supabase connected" : "Local demo"}</span>
            <Link to="/" target="_blank" className="admin-icon-btn" title="Open public site"><ExternalLink size={17} /></Link>
            <button onClick={() => void cms.logout()} className="admin-icon-btn" title="Sign out"><LogOut size={17} /></button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] border-r border-white/10 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {sectionKeys.map(key => <button key={key} onClick={() => setSection(key)} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${section === key ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>{sectionLabels[key] ?? titleCase(key)}</button>)}
          </div>
        </aside>

        <main className="min-w-0 p-4 md:p-8 lg:p-10">
          {cms.mode === "local-demo" && <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100"><strong>Demo mode:</strong> everything works, but content is stored only in this browser. Adding your Supabase values switches the same dashboard to secure cloud storage.</div>}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-8">
            <div><p className="text-xs font-black text-indigo-300 uppercase tracking-[0.2em] mb-2">Editing</p><h1 className="text-3xl font-bold">{sectionLabels[section] ?? titleCase(section)}</h1></div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => void run("save", cms.saveDraft, "Draft saved.")} className="admin-action secondary">{busy === "save" ? <Loader2 className="animate-spin" size={17} /> : <Save size={17} />} Save draft</button>
              <button onClick={() => void run("publish", cms.publish, "Published successfully.")} className="admin-action primary">{busy === "publish" ? <Loader2 className="animate-spin" size={17} /> : <Check size={17} />} Publish changes</button>
              <Link to="/" target="_blank" className="admin-action secondary"><Eye size={17} /> View site</Link>
            </div>
          </div>

          {notice && <div className="mb-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-100 px-4 py-3 text-sm">{notice}</div>}

          {section === "site" && <div className="mb-6 grid sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 p-4"><Palette className="text-indigo-300 mb-3" /><p className="font-bold">Theme controls</p><p className="text-xs text-slate-500 mt-1">Change the global palette.</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><Settings className="text-indigo-300 mb-3" /><p className="font-bold">Page copy</p><p className="text-xs text-slate-500 mt-1">Edit headings and buttons.</p></div>
            <div className="rounded-2xl border border-white/10 p-4"><Eye className="text-indigo-300 mb-3" /><p className="font-bold">Navigation</p><p className="text-xs text-slate-500 mt-1">Rename, reorder, or hide links.</p></div>
          </div>}

          {section === "account" ? <AccountSettings onChangePassword={cms.changePassword} mode={cms.mode} /> : <div className="space-y-5">
            {activeFields.map(([key, value]) => <FieldEditor key={key} label={key} value={value as JsonValue} path={[key]} onChange={update} onUpload={cms.upload} />)}
          </div>}

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><FileJson size={19} className="text-indigo-300" /> Backup & recovery</h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={downloadBackup} className="admin-action secondary"><Download size={17} /> Export backup</button>
              <button onClick={() => importRef.current?.click()} className="admin-action secondary"><Upload size={17} /> Import backup</button>
              <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={async e => {
                const file = e.target.files?.[0]; if (!file) return;
                try { cms.setDraft(JSON.parse(await file.text()) as PortfolioContent); setNotice("Backup loaded as a draft. Review it, then publish."); } catch { setNotice("That file is not a valid portfolio backup."); }
                e.target.value = "";
              }} />
              <button onClick={() => void run("reset", cms.resetDraft, "Unpublished edits discarded.")} className="admin-action secondary"><RotateCcw size={17} /> Discard draft</button>
              <button onClick={() => { if (confirm("Load the original website content into your draft? Nothing changes publicly until you publish.")) void run("defaults", cms.restoreDefaults, "Original content loaded as a draft."); }} className="admin-action danger"><Trash2 size={17} /> Restore original</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function AccountSettings({ onChangePassword, mode }: { onChangePassword: (password: string) => Promise<void>; mode: "local-demo" | "supabase" }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return <div className="max-w-xl rounded-2xl border border-white/10 bg-white/[0.025] p-6">
    <div className="flex items-center gap-3 mb-3"><UserRound className="text-indigo-300" /><h2 className="text-xl font-bold">Change owner password</h2></div>
    <p className="text-sm text-slate-400 mb-6">{mode === "supabase" ? "This updates your Supabase owner account password." : "This updates the password for this browser's demonstration dashboard."}</p>
    <form className="space-y-4" onSubmit={async event => {
      event.preventDefault(); setMessage("");
      if (password !== confirmPassword) { setMessage("The passwords do not match."); return; }
      setBusy(true);
      try { await onChangePassword(password); setPassword(""); setConfirmPassword(""); setMessage("Password updated successfully."); }
      catch (reason) { setMessage(reason instanceof Error ? reason.message : "Unable to update the password."); }
      finally { setBusy(false); }
    }}>
      <label className="block text-sm text-slate-300">New password<input className="admin-input mt-2" type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <label className="block text-sm text-slate-300">Confirm new password<input className="admin-input mt-2" type="password" minLength={8} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></label>
      {message && <p className="text-sm rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-3">{message}</p>}
      <button disabled={busy} className="admin-action primary">{busy ? <Loader2 className="animate-spin" size={17} /> : <LockKeyhole size={17} />} Update password</button>
    </form>
  </div>;
}

export default function Admin() {
  const cms = useCms();
  if (!cms.ready) return <div className="admin-shell min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-300" size={32} /></div>;
  return cms.authenticated ? <AdminDashboard /> : <OwnerLogin />;
}
