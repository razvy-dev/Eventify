import supabase from "../supabase"

export async function signOutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}