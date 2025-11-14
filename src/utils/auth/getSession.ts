import { Session } from "@supabase/supabase-js"
import supabase from "../supabase"

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}