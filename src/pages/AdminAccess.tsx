import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, KeyRound, Loader2, LockKeyhole, LogOut, Mail, Plus, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { useCms } from "../cms/ContentProvider";
import {
  authorizePortfolioAdmin,
  fetchPortfolioAdmins,
  requestPasswordReset,
  setPortfolioAdminAccess,
  type PortfolioAdminAccess,
} from "../cms/supabase";

function PasswordForm() {
  const { changePassword } = useCms();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (password !== confirm) { setMessage("The passwords do not match."); return; }
    setBusy(true);
    try {
      await changePassword(password);
      setPassword("");
      setConfirm("");
      setMessage("Password updated successfully.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to update the password.");
    } finally {
      setBusy(false);
    }
  };

  return <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
    <div className="flex items-center gap-3 mb-2"><KeyRound className="text-indigo-300" /><h2 className="text-xl font-bold">Change password</h2></div>
    <p className="text-sm text-slate-400 mb-6">Use at least 8 characters. A longer, unique password is safer.</p>
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm text-slate-300">New password<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} className="admin-input mt-2" /></label>
      <label className="block text-sm text-slate-300">Confirm new password<input type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={event => setConfirm(event.target.value)} className="admin-input mt-2" /></label>
      {message && <p className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">{message}</p>}
      <button disabled={busy} className="admin-action primary">{busy ? <Loader2 size={17} className="animate-spin" /> : <Check size={17} />} Update password</button>
    </form>
  </section>;
}

function AdminAllowlist() {
  const [admins, setAdmins] = useState<PortfolioAdminAccess[]>([]);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => setAdmins(await fetchPortfolioAdmins());
  useEffect(() => { void load().catch(reason => setMessage(reason instanceof Error ? reason.message : "Unable to load administrators.")); }, []);

  const add = async (event: FormEvent) => {
    event.preventDefault();
    setBusy("add"); setMessage("");
    try {
      await authorizePortfolioAdmin(email);
      setEmail("");
      await load();
      setMessage("Administrator access granted.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to grant access.");
    } finally { setBusy(""); }
  };

  const toggle = async (admin: PortfolioAdminAccess) => {
    setBusy(admin.user_id); setMessage("");
    try {
      await setPortfolioAdminAccess(admin.user_id, !admin.active);
      await load();
      setMessage(admin.active ? "Administrator access disabled." : "Administrator access restored.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to update access.");
    } finally { setBusy(""); }
  };

  return <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7 lg:col-span-2">
    <div className="flex items-center gap-3 mb-2"><UserCheck className="text-indigo-300" /><h2 className="text-xl font-bold">Authorized administrators</h2></div>
    <p className="text-sm text-slate-400 mb-6 leading-relaxed">Only accounts listed here can open the dashboard. Create the person in Supabase Authentication first, then authorize their email here. Editors can manage portfolio content but cannot grant access to anyone else.</p>
    <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-6">
      <input type="email" required value={email} onChange={event => setEmail(event.target.value)} className="admin-input" placeholder="collaborator@example.com" />
      <button disabled={busy === "add"} className="admin-action primary shrink-0">{busy === "add" ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />} Allow administrator</button>
    </form>
    {message && <p className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100 mb-5">{message}</p>}
    <div className="space-y-3">
      {admins.map(admin => <article key={admin.user_id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0"><p className="font-semibold text-white truncate">{admin.email}</p><div className="flex flex-wrap gap-2 mt-2"><span className="text-[10px] font-black uppercase tracking-widest rounded-full bg-indigo-500/10 text-indigo-300 px-2.5 py-1">{admin.role}</span><span className={`text-[10px] font-black uppercase tracking-widest rounded-full px-2.5 py-1 ${admin.active ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>{admin.active ? "Active" : "Disabled"}</span></div></div>
        {admin.role !== "owner" && <button type="button" disabled={busy === admin.user_id} onClick={() => void toggle(admin)} className={`admin-action shrink-0 ${admin.active ? "danger" : "secondary"}`}>{busy === admin.user_id ? <Loader2 size={17} className="animate-spin" /> : admin.active ? <UserX size={17} /> : <UserCheck size={17} />}{admin.active ? "Disable access" : "Restore access"}</button>}
      </article>)}
    </div>
  </section>;
}

export default function AdminAccess() {
  const cms = useCms();
  const [email, setEmail] = useState(import.meta.env.VITE_OWNER_EMAIL ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [forgot, setForgot] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const isSetup = cms.mode === "local-demo" && !cms.localOwnerExists;

  useEffect(() => { document.title = `Owner Access | ${cms.published.name}`; }, [cms.published.name]);

  const submitAccess = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      if (forgot) {
        await requestPasswordReset(email);
        setMessage("If that authorized account exists, a recovery email has been sent.");
      } else if (isSetup) {
        if (password !== confirm) throw new Error("The passwords do not match.");
        await cms.setupLocalOwner(password);
      } else await cms.login(email, password);
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to continue.");
    } finally { setBusy(false); }
  };

  if (!cms.ready) return <div className="admin-shell min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-300" size={32} /></div>;

  return <div className="admin-shell min-h-screen text-slate-100 px-4 py-8 sm:py-12">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link to={cms.authenticated ? "/admin" : "/"} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={17} /> {cms.authenticated ? "Back to dashboard" : "Back to website"}</Link>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-300">Portfolio access center</p>
      </div>

      {!cms.authenticated ? <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-slate-950/85 p-7 sm:p-8 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center mb-5">{forgot ? <Mail /> : <LockKeyhole />}</div>
        <h1 className="text-3xl font-bold mb-3">{forgot ? "Recover access" : isSetup ? "Create owner access" : "Owner sign in"}</h1>
        <p className="text-slate-400 leading-relaxed mb-7">{forgot ? "Supabase will email a secure recovery link. Passwords are never sent or stored by this website." : "A valid session will be remembered automatically on this trusted browser until you sign out."}</p>
        <form onSubmit={submitAccess} className="space-y-4">
          {cms.mode === "supabase" && <label className="block text-sm text-slate-300">Email<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className="admin-input mt-2" /></label>}
          {!forgot && <label className="block text-sm text-slate-300">Password<input type="password" required minLength={8} autoComplete={isSetup ? "new-password" : "current-password"} value={password} onChange={event => setPassword(event.target.value)} className="admin-input mt-2" /></label>}
          {isSetup && !forgot && <label className="block text-sm text-slate-300">Confirm password<input type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={event => setConfirm(event.target.value)} className="admin-input mt-2" /></label>}
          {message && <p className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">{message}</p>}
          <button disabled={busy} className="admin-action primary w-full justify-center">{busy ? <Loader2 size={17} className="animate-spin" /> : forgot ? <Mail size={17} /> : <ShieldCheck size={17} />}{forgot ? "Send recovery email" : isSetup ? "Activate access" : "Sign in"}</button>
        </form>
        {cms.mode === "supabase" ? <button type="button" onClick={() => { setForgot(!forgot); setMessage(""); }} className="w-full mt-5 text-sm text-slate-400 hover:text-white">{forgot ? "Return to sign in" : "Forgot your password?"}</button> : !isSetup && <p className="text-xs text-slate-500 text-center mt-5">Email recovery is enabled when Supabase is connected.</p>}
      </div> : <>
        <section className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 sm:p-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Automatic login active</p><h1 className="text-2xl sm:text-3xl font-bold">{cms.adminAccess?.email}</h1><p className="text-sm text-slate-400 mt-2">This browser will restore your secure session automatically. Sign out when using a shared device.</p></div>
          <div className="flex flex-wrap gap-2"><Link to="/admin" className="admin-action primary"><ShieldCheck size={17} /> Open dashboard</Link><button onClick={() => void cms.logout()} className="admin-action secondary"><LogOut size={17} /> Sign out</button></div>
        </section>
        <div className="grid lg:grid-cols-2 gap-6">
          <PasswordForm />
          {cms.mode === "local-demo" && <section className="rounded-3xl border border-amber-400/20 bg-amber-500/[0.07] p-6 sm:p-7"><h2 className="text-xl font-bold mb-2">Local demonstration</h2><p className="text-sm text-slate-400 leading-relaxed">Automatic access applies only to this browser. Connect Supabase for verified email recovery and owner-controlled access for other people.</p></section>}
          {cms.mode === "supabase" && cms.adminAccess?.role === "owner" && <AdminAllowlist />}
        </div>
      </>}
    </div>
  </div>;
}
