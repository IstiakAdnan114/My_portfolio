import { isSupabaseConfigured, supabase } from "./supabase";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
  read_at: string | null;
}

export interface NewContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

const LOCAL_MESSAGES_KEY = "portfolio-cms-contact-messages-v1";
export const MESSAGE_EVENT = "portfolio-cms-message-change";

function readLocalMessages(): ContactMessage[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_MESSAGES_KEY) || "[]") as ContactMessage[];
  } catch {
    return [];
  }
}

function writeLocalMessages(messages: ContactMessage[]) {
  localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages));
  window.dispatchEvent(new Event(MESSAGE_EVENT));
}

function cleanInput(input: NewContactMessage) {
  return {
    name: input.name.trim().slice(0, 100),
    email: input.email.trim().toLowerCase().slice(0, 254),
    subject: input.subject.trim().slice(0, 160),
    message: input.message.trim().slice(0, 5000),
  };
}

export async function submitContactMessage(input: NewContactMessage) {
  // Honeypot: bots commonly fill fields hidden from real visitors.
  if (input.website?.trim()) return;
  const clean = cleanInput(input);
  if (clean.name.length < 2) throw new Error("Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(clean.email)) throw new Error("Please enter a valid email address.");
  if (clean.subject.length < 3) throw new Error("Please add a subject.");
  if (clean.message.length < 10) throw new Error("Please write a slightly longer message.");

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("contact_messages").insert(clean);
    if (error) throw error;
    return;
  }

  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    ...clean,
    status: "unread",
    created_at: new Date().toISOString(),
    read_at: null,
  };
  writeLocalMessages([entry, ...readLocalMessages()]);
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id,name,email,subject,message,status,created_at,read_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ContactMessage[];
  }
  return readLocalMessages().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function setMessageRead(id: string, read: boolean) {
  const nextStatus = read ? "read" : "unread";
  const readAt = read ? new Date().toISOString() : null;
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("contact_messages").update({ status: nextStatus, read_at: readAt }).eq("id", id);
    if (error) throw error;
    return;
  }
  writeLocalMessages(readLocalMessages().map(item => item.id === id ? { ...item, status: nextStatus, read_at: readAt } : item));
}

export async function deleteContactMessage(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  writeLocalMessages(readLocalMessages().filter(item => item.id !== id));
}
