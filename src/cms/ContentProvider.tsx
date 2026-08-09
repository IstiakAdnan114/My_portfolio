import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
const SYNC_CHANNEL = "portfolio-cms-published-sync-v1";
const defaults = structuredClone(portfolioData);

const clone = <T,>(value: T): T => structuredClone(value);

function mergeWithDefaults<T>(fallback: T, saved: unknown): T {
  if (Array.isArray(fallback)) return (Array.isArray(saved) ? clone(saved) : clone(fallback)) as T;
  if (fallback && typeof fallback === "object") {
    const source = saved && typeof saved === "object" && !Array.isArray(saved) ? saved as Record<string, unknown> : {};
    return Object.fromEntries(Object.entries(fallback as Record<string, unknown>).map(([key, value]) => [key, mergeWithDefaults(value, source[key])])) as T;
  }
  return (saved === undefined || saved === null ? fallback : saved) as T;
}

const normalizeContent = (content: unknown): PortfolioContent => {
  const normalized = mergeWithDefaults(defaults, content);
  const savedProjects = content && typeof content === "object" && Array.isArray((content as any).projects)
    ? (content as any).projects as Array<Record<string, unknown>>
    : null;
  if (savedProjects) {
    normalized.projects = savedProjects.map((project, index) => {
      const projectFallback = defaults.projects.find(item => item.title === project.title) ?? defaults.projects[index];
      return projectFallback ? mergeWithDefaults(projectFallback, project) : project as any;
    });
  }
  const savedContact = content && typeof content === "object"
    ? (content as any)?.site?.pageCopy?.contact
    : null;
  // Existing installations used this field for a Google Forms link/button.
  // When the new form fields are absent, migrate that legacy button copy.
  if (!savedContact?.formHeading && savedContact?.messageButton === "Drop a Message") {
    normalized.site.pageCopy.contact.messageButton = defaults.site.pageCopy.contact.messageButton;
  }
  return normalized;
};

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
  const [published, setPublished] = useState<PortfolioContent>(() => normalizeContent(readLocal(PUBLISHED_KEY) ?? defaults));
  const [draft, setDraftState] = useState<PortfolioContent>(() => normalizeContent(readLocal(DRAFT_KEY) ?? readLocal(PUBLISHED_KEY) ?? defaults));
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [authenticated, setAuthenticated] = useState(false);
  const [localOwnerExists, setLocalOwnerExists] = useState(() => Boolean(localStorage.getItem(LOCAL_AUTH_KEY)));
  const syncChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    replacePublishedObject(published);
  }, [published]);

  useEffect(() => {
    const receivePublished = (content: PortfolioContent) => {
      const normalized = normalizeContent(content);
      replacePublishedObject(normalized);
      setPublished(clone(normalized));
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== PUBLISHED_KEY || !event.newValue) return;
      try { receivePublished(JSON.parse(event.newValue) as PortfolioContent); } catch { /* Ignore malformed external data. */ }
    };
    window.addEventListener("storage", handleStorage);
    if (typeof BroadcastChannel !== "undefined") {
      syncChannel.current = new BroadcastChannel(SYNC_CHANNEL);
      syncChannel.current.onmessage = event => receivePublished(event.data as PortfolioContent);
    }
    return () => {
      window.removeEventListener("storage", handleStorage);
      syncChannel.current?.close();
      syncChannel.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let active = true;
    void (async () => {
      try {
        const remote = await fetchRemotePublished<PortfolioContent>();
        if (active && remote) {
          const normalized = normalizeContent(remote);
          replacePublishedObject(normalized);
          setPublished(normalized);
        }
        const { data } = await supabase.auth.getSession();
        if (active) {
          setAuthenticated(Boolean(data.session));
          if (data.session) {
            const remoteDraft = await fetchRemoteDraft<PortfolioContent>();
            if (remoteDraft) setDraftState(normalizeContent(remoteDraft));
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

  const setDraft = (content: PortfolioContent) => setDraftState(normalizeContent(content));

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
    syncChannel.current?.postMessage(clone(draft));
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
      setDraftState(normalizeContent(remoteDraft ?? published));
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
