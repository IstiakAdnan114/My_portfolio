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
