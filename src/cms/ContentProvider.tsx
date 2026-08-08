import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { portfolioData } from "../data";
import {
  fetchRemoteDraft,
  fetchRemotePublished,
  isSupabaseConfigured,
  publishRemote,
  saveRemoteDraft,
  supabase,
  uploadMedia,
} from "./supabase";

export type PortfolioContent = typeof portfolioData;

const PUBLISHED_KEY = "portfolio-cms-published-v1";
const DRAFT_KEY = "portfolio-cms-draft-v1";
const LOCAL_AUTH_KEY = "portfolio-cms-owner-password-v1";
const defaults = structuredClone(portfolioData);

const clone = <T,>(value: T): T => structuredClone(value);

function readLocal<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch {
    return null;
  }
}

function applyTheme(content: PortfolioContent) {
  const theme = content.site.theme;
  const root = document.documentElement;
  root.style.setProperty("--primary-color", theme.primary);
  root.style.setProperty("--secondary-color", theme.secondary);
  root.style.setProperty("--accent-color", theme.accent);
  root.style.setProperty("--bg-primary", theme.background);
  root.style.setProperty("--bg-secondary", theme.surface);
  root.style.setProperty("--text-primary", theme.text);
}

function replacePublishedObject(content: PortfolioContent) {
  for (const key of Object.keys(portfolioData)) delete (portfolioData as any)[key];
  Object.assign(portfolioData, clone(content));
  applyTheme(content);
}

async function hashPassword(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

interface CmsContextValue {
  ready: boolean;
  mode: "local-demo" | "supabase";
  published: PortfolioContent;
  draft: PortfolioContent;
  setDraft: (content: PortfolioContent) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<void>;
  resetDraft: () => Promise<void>;
  restoreDefaults: () => Promise<void>;
  upload: (file: File) => Promise<string>;
  authenticated: boolean;
  localOwnerExists: boolean;
  setupLocalOwner: (password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (password: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [published, setPublished] = useState<PortfolioContent>(() => readLocal(PUBLISHED_KEY) ?? clone(defaults));
  const [draft, setDraftState] = useState<PortfolioContent>(() => readLocal(DRAFT_KEY) ?? readLocal(PUBLISHED_KEY) ?? clone(defaults));
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [authenticated, setAuthenticated] = useState(false);
  const [localOwnerExists, setLocalOwnerExists] = useState(() => Boolean(localStorage.getItem(LOCAL_AUTH_KEY)));

  useEffect(() => {
    replacePublishedObject(published);
  }, [published]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let active = true;
    void (async () => {
      try {
        const remote = await fetchRemotePublished<PortfolioContent>();
        if (active && remote) {
          replacePublishedObject(remote);
          setPublished(remote);
        }
        const { data } = await supabase.auth.getSession();
        if (active) {
          setAuthenticated(Boolean(data.session));
          if (data.session) {
            const remoteDraft = await fetchRemoteDraft<PortfolioContent>();
            if (remoteDraft) setDraftState(clone(remoteDraft));
          }
        }
      } finally {
        if (active) setReady(true);
      }
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setAuthenticated(Boolean(session)));
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft]);

  const setDraft = (content: PortfolioContent) => setDraftState(clone(content));

  const saveDraft = async () => {
    if (isSupabaseConfigured) await saveRemoteDraft(draft);
    else localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  };

  const publish = async () => {
    if (isSupabaseConfigured) await publishRemote(draft);
    else {
      localStorage.setItem(PUBLISHED_KEY, JSON.stringify(draft));
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
    replacePublishedObject(draft);
    setPublished(clone(draft));
  };

  const resetDraft = async () => {
    const source = isSupabaseConfigured ? await fetchRemotePublished<PortfolioContent>() : published;
    setDraftState(clone(source ?? published));
  };

  const restoreDefaults = async () => {
    const restored = clone(defaults);
    setDraftState(restored);
    if (!isSupabaseConfigured) localStorage.setItem(DRAFT_KEY, JSON.stringify(restored));
  };

  const setupLocalOwner = async (password: string) => {
    if (password.length < 8) throw new Error("Use at least 8 characters.");
    localStorage.setItem(LOCAL_AUTH_KEY, await hashPassword(password));
    setLocalOwnerExists(true);
    setAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const allowedOwner = import.meta.env.VITE_OWNER_EMAIL?.trim().toLowerCase();
      if (allowedOwner && email.trim().toLowerCase() !== allowedOwner) {
        await supabase.auth.signOut();
        throw new Error("This account is not the configured owner.");
      }
      const remoteDraft = await fetchRemoteDraft<PortfolioContent>();
      setDraftState(clone(remoteDraft ?? published));
      setAuthenticated(true);
      return;
    }
    const saved = localStorage.getItem(LOCAL_AUTH_KEY);
    if (!saved || saved !== await hashPassword(password)) throw new Error("Incorrect password.");
    setAuthenticated(true);
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setAuthenticated(false);
  };

  const changePassword = async (password: string) => {
    if (password.length < 8) throw new Error("Use at least 8 characters.");
    if (supabase) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    } else {
      localStorage.setItem(LOCAL_AUTH_KEY, await hashPassword(password));
    }
  };

  const value = useMemo<CmsContextValue>(() => ({
    ready,
    mode: isSupabaseConfigured ? "supabase" : "local-demo",
    published,
    draft,
    setDraft,
    saveDraft,
    publish,
    resetDraft,
    restoreDefaults,
    upload: uploadMedia,
    authenticated,
    localOwnerExists,
    setupLocalOwner,
    login,
    logout,
    changePassword,
  }), [ready, published, draft, authenticated, localOwnerExists]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used inside ContentProvider");
  return context;
}
