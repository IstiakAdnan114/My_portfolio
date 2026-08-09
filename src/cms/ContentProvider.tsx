import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { portfolioData } from "../data";
import { markdownToBlocks } from "../blog/blocks";
import {
  fetchCurrentAdminAccess,
  fetchRemoteDraft,
  fetchRemotePublished,
  isSupabaseConfigured,
  publishRemote,
  saveRemoteDraft,
  supabase,
  uploadMedia,
  type PortfolioAdminAccess,
} from "./supabase";

export type PortfolioContent = typeof portfolioData;

const PUBLISHED_KEY = "portfolio-cms-published-v1";
const DRAFT_KEY = "portfolio-cms-draft-v1";
const LOCAL_AUTH_KEY = "portfolio-cms-owner-password-v1";
const LOCAL_SESSION_KEY = "portfolio-cms-owner-session-v1";
const SYNC_CHANNEL = "portfolio-cms-published-sync-v1";
const defaults = structuredClone(portfolioData);
const localAdminAccess: PortfolioAdminAccess = { user_id: "local-owner", email: "Local browser owner", role: "owner", active: true, created_at: "" };

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
  const savedEducation = content && typeof content === "object" && Array.isArray((content as any).education)
    ? (content as any).education as Array<Record<string, unknown>>
    : null;
  if (savedEducation) {
    const emptyEducation = {
      ...defaults.education[0],
      institution: "",
      degree: "",
      period: "",
      color: "indigo",
      detailsLabel: "View study details",
      detailsTitle: "Study details",
      detailsIntro: "",
      catalogueUrl: "",
      courses: [],
    };
    normalized.education = savedEducation.map(education => {
      const exactFallback = defaults.education.find(item => item.institution === education.institution);
      const looksLikeIpe = /industrial|production|buet/i.test(`${education.institution ?? ""} ${education.degree ?? ""}`);
      const merged = mergeWithDefaults(exactFallback ?? (looksLikeIpe ? defaults.education[0] : emptyEducation), education);
      if (/buet/i.test(merged.institution) && merged.degree === "Department of Industrial and Production Engineering") {
        merged.degree = "B.Sc. in Industrial and Production Engineering (IPE)";
      } else if (/azizul haque/i.test(merged.institution) && merged.degree === "Science Background") {
        merged.degree = "Higher Secondary Certificate (HSC) — Science";
      } else if (/rural development academy/i.test(merged.institution) && merged.degree === "Science Background") {
        merged.degree = "Secondary School Certificate (SSC) — Science";
      }
      return merged;
    });
  }
  const savedBlogPosts = content && typeof content === "object" && Array.isArray((content as any).blogPosts)
    ? (content as any).blogPosts as Array<Record<string, unknown>>
    : null;
  if (savedBlogPosts) {
    normalized.blogPosts = savedBlogPosts.map((post, index) => {
      const postFallback = defaults.blogPosts.find(item => item.id === Number(post.id)) ?? defaults.blogPosts[index];
      return postFallback ? mergeWithDefaults(postFallback, post) : post as any;
    });
  }
  normalized.blogPosts = normalized.blogPosts.map(post => ({
    ...post,
    blocks: Array.isArray(post.blocks) && post.blocks.length
      ? post.blocks
      : markdownToBlocks(post.content ?? ""),
  }));
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
  publishedRevision: number;
  draft: PortfolioContent;
  setDraft: (content: PortfolioContent) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<void>;
  resetDraft: () => Promise<void>;
  restoreDefaults: () => Promise<void>;
  upload: (file: File) => Promise<string>;
  authenticated: boolean;
  adminAccess: PortfolioAdminAccess | null;
  localOwnerExists: boolean;
  setupLocalOwner: (password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (password: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [published, setPublished] = useState<PortfolioContent>(() => normalizeContent(readLocal(PUBLISHED_KEY) ?? defaults));
  const [publishedRevision, setPublishedRevision] = useState(0);
  const [draft, setDraftState] = useState<PortfolioContent>(() => normalizeContent(readLocal(DRAFT_KEY) ?? readLocal(PUBLISHED_KEY) ?? defaults));
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [authenticated, setAuthenticated] = useState(() => !isSupabaseConfigured && localStorage.getItem(LOCAL_SESSION_KEY) === "true");
  const [adminAccess, setAdminAccess] = useState<PortfolioAdminAccess | null>(() => !isSupabaseConfigured && localStorage.getItem(LOCAL_SESSION_KEY) === "true" ? localAdminAccess : null);
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
      setPublishedRevision(revision => revision + 1);
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
          setPublishedRevision(revision => revision + 1);
        }
        const { data } = await supabase.auth.getSession();
        if (active) {
          if (data.session) {
            const access = await fetchCurrentAdminAccess();
            if (access) {
              setAdminAccess(access);
              setAuthenticated(true);
              const remoteDraft = await fetchRemoteDraft<PortfolioContent>();
              if (remoteDraft) setDraftState(normalizeContent(remoteDraft));
            } else {
              await supabase.auth.signOut();
              setAdminAccess(null);
              setAuthenticated(false);
            }
          } else {
            setAdminAccess(null);
            setAuthenticated(false);
          }
        }
      } finally {
        if (active) setReady(true);
      }
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAdminAccess(null);
        setAuthenticated(false);
        return;
      }
      void fetchCurrentAdminAccess().then(access => {
        if (!active) return;
        setAdminAccess(access);
        setAuthenticated(Boolean(access));
      }).catch(() => {
        if (!active) return;
        setAdminAccess(null);
        setAuthenticated(false);
      });
    });
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
    setPublishedRevision(revision => revision + 1);
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
    localStorage.setItem(LOCAL_SESSION_KEY, "true");
    setLocalOwnerExists(true);
    setAdminAccess(localAdminAccess);
    setAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const access = await fetchCurrentAdminAccess();
      if (!access) {
        await supabase.auth.signOut();
        throw new Error("This account has not been authorized by the portfolio owner.");
      }
      const remoteDraft = await fetchRemoteDraft<PortfolioContent>();
      setDraftState(normalizeContent(remoteDraft ?? published));
      setAdminAccess(access);
      setAuthenticated(true);
      return;
    }
    const saved = localStorage.getItem(LOCAL_AUTH_KEY);
    if (!saved || saved !== await hashPassword(password)) throw new Error("Incorrect password.");
    localStorage.setItem(LOCAL_SESSION_KEY, "true");
    setAdminAccess(localAdminAccess);
    setAuthenticated(true);
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setAdminAccess(null);
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
    publishedRevision,
    draft,
    setDraft,
    saveDraft,
    publish,
    resetDraft,
    restoreDefaults,
    upload: uploadMedia,
    authenticated,
    adminAccess,
    localOwnerExists,
    setupLocalOwner,
    login,
    logout,
    changePassword,
  }), [ready, published, publishedRevision, draft, authenticated, adminAccess, localOwnerExists]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used inside ContentProvider");
  return context;
}
