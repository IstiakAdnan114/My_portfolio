import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { optimizeImageForUpload } from "./imageOptimization";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export interface PortfolioAdminAccess {
  user_id: string;
  email: string;
  role: "owner" | "editor";
  active: boolean;
  created_at: string;
}

export async function fetchCurrentAdminAccess(): Promise<PortfolioAdminAccess | null> {
  if (!supabase) return null;
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (!userId) return null;
  const { data, error } = await supabase
    .from("portfolio_admins")
    .select("user_id,email,role,active,created_at")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();
  if (error) {
    if (error.code === "42P01") throw new Error("Run the latest supabase/schema.sql before using owner access.");
    throw error;
  }
  return data as PortfolioAdminAccess | null;
}

export async function fetchPortfolioAdmins(): Promise<PortfolioAdminAccess[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_admins")
    .select("user_id,email,role,active,created_at")
    .order("role", { ascending: false })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as PortfolioAdminAccess[];
}

export async function authorizePortfolioAdmin(email: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not connected.");
  const { error } = await supabase.rpc("authorize_portfolio_admin", { target_email: email.trim().toLowerCase() });
  if (error) throw error;
}

export async function setPortfolioAdminAccess(userId: string, active: boolean): Promise<void> {
  if (!supabase) throw new Error("Supabase is not connected.");
  const { error } = await supabase.rpc("set_portfolio_admin_access", { target_user_id: userId, target_active: active });
  if (error) throw error;
}

export async function requestPasswordReset(email: string): Promise<void> {
  if (!supabase) throw new Error("Email recovery becomes available after Supabase is connected.");
  const redirectTo = `${window.location.origin}/admin/access?recovery=1`;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo });
  if (error) throw error;
}

export async function fetchRemotePublished<T>(): Promise<T | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "main")
    .maybeSingle();
  if (error) throw error;
  return (data?.content as T | undefined) ?? null;
}

export async function fetchRemoteDraft<T>(): Promise<T | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_drafts")
    .select("content")
    .eq("id", "main")
    .maybeSingle();
  if (error) throw error;
  return (data?.content as T | undefined) ?? null;
}

export async function saveRemoteDraft(content: unknown) {
  if (!supabase) return;
  const { error } = await supabase
    .from("site_drafts")
    .upsert({ id: "main", content, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function publishRemote(content: unknown) {
  if (!supabase) return;
  const updated_at = new Date().toISOString();
  const [{ error: publishedError }, { error: draftError }] = await Promise.all([
    supabase.from("site_content").upsert({ id: "main", content, updated_at }),
    supabase.from("site_drafts").upsert({ id: "main", content, updated_at }),
  ]);
  if (publishedError) throw publishedError;
  if (draftError) throw draftError;
}

export async function uploadMedia(file: File): Promise<string> {
  const optimizedFile = await optimizeImageForUpload(file);

  if (!supabase) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(optimizedFile);
    });
  }

  const extension = optimizedFile.name.split(".").pop() || "bin";
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("portfolio-media").upload(path, optimizedFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
}
