import { Session, User } from "@supabase/supabase-js"
import supabase from "../supabase"

export async function signInWithEmail(email: string, password: string): Promise<{
  user: User | null
  session: Session | null
}> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return { user: data.user, session: data.session }
}