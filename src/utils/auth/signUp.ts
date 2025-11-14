import { Session, User } from "@supabase/supabase-js";
import supabase from "../supabase";

interface SignUpProfileData {
  firstName?: string
  lastName?: string
  profile_picture?: string // optional
}

export async function signUpWithEmail(
  email: string,
  password: string,
  profileData: SignUpProfileData = {}
): Promise<{
  user: User | null
  session: Session | null
}> {
  // 1️⃣ Create the user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  if (!data.user) throw new Error("User not created")

  const userId = data.user.id

  // 2️⃣ Insert a profile row with optional profile_picture
  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: userId, // link profile row to auth user
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        profile_picture: null, // always start empty
      },
    ])

  if (profileError) throw profileError

  return { user: data.user, session: data.session }
}
