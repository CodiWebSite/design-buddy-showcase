import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { AuditResult } from "./types";

/**
 * Persists an audit result so it can be retrieved later via a public link.
 * Returns the new audit id (UUID) on success, or null on failure.
 */
export async function saveAudit(result: AuditResult): Promise<string | null> {
  const { data, error } = await supabase
    .from("audits")
    .insert([
      {
        url: result.url,
        result: JSON.parse(JSON.stringify(result)) as Json,
      },
    ])
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to save audit:", error);
    return null;
  }
  return data.id;
}

/**
 * Loads a previously saved audit by id. Returns null if not found.
 */
export async function loadAudit(id: string): Promise<AuditResult | null> {
  const { data, error } = await supabase
    .from("audits")
    .select("result")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    console.error("Failed to load audit:", error);
    return null;
  }
  return data.result as unknown as AuditResult;
}