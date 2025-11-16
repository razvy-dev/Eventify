import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getEnrichedUser } from '../utils/auth/getEnrichedUser'
import { getSession } from '../utils/auth/getSession'
import { setCity } from '../utils/auth/setCity'
import { signInWithEmail } from '../utils/auth/signIn'
import { signOutUser } from '../utils/auth/signOut'
import { signUpWithEmail } from '../utils/auth/signUp'

export type Profile = {
  firstName?: string
  lastName?: string
  profile_picture?: string
  city: string
}

export type AppUser = User & {
  profile?: Profile
}

type AuthState = {
  user: AppUser | null
  session: Session | null
  loading: boolean
  error: string | null

  initialize: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setCity: (city: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,
      error: null,

      initialize: async () => {
        try {
          set({ loading: true })
          const session = await getSession()

          if (!session) {
            set({ user: null, session: null, loading: false })
            return
          }

          // Fetch profile data
          try {
            const profileData = await getEnrichedUser(session.user.id)
            console.log("profile: ", profileData)
            const enrichedUser: AppUser = {
              ...session.user,
              profile: profileData || undefined,
            }
            set({ user: enrichedUser, session, loading: false })
          } catch (profileError) {
            console.log("Could not fetch profile, using basic user data:", profileError)
            // Still set the user even if profile fetch fails
            set({ user: session.user, session, loading: false })
          }
        } catch (err: any) {
          console.error("Initialize error:", err)
          set({ error: err.message, loading: false, user: null, session: null })
        }
      },

      signUp: async (email, password) => {
        try {
          set({ loading: true, error: null })
          const { user, session } = await signUpWithEmail(email, password)
          
          if (!user) {
            throw new Error("User not created")
          }

          // Fetch profile data if user exists
          try {
            const profileData = await getEnrichedUser(user.id)
            const enrichedUser: AppUser = {
              ...user,
              profile: profileData || undefined,
            }
            set({ user: enrichedUser, session, loading: false })
          } catch (profileError) {
            console.log("Could not fetch profile after signup:", profileError)
            // Still set the user even if profile fetch fails
            set({ user, session, loading: false })
          }
        } catch (err: any) {
          console.error("SignUp error:", err)
          set({ error: err.message, loading: false })
          throw err
        }
      },

      signIn: async (email, password) => {
        try {
          set({ loading: true, error: null })
          const { user, session } = await signInWithEmail(email, password)
          
          if (!user) {
            throw new Error("Login failed")
          }

          // Fetch profile data if user exists
          try {
            const profileData = await getEnrichedUser(user.id)
            const enrichedUser: AppUser = {
              ...user,
              profile: profileData || undefined,
            }
            set({ user: enrichedUser, session, loading: false })
          } catch (profileError) {
            console.log("Could not fetch profile after login:", profileError)
            // Still set the user even if profile fetch fails
            set({ user, session, loading: false })
          }
        } catch (err: any) {
          console.error("SignIn error:", err)
          set({ error: err.message, loading: false })
          throw err
        }
      },

      signOut: async () => {
        try {
          set({ loading: true })
          await signOutUser()
          set({ user: null, session: null, loading: false, error: null })
        } catch (err: any) {
          console.error("SignOut error:", err)
          set({ error: err.message, loading: false })
          throw err
        }
      },

      setCity: async (newCity: string) => {
        try {
          set({ loading: true, error: null });

          const user = useAuthStore.getState().user;
          if (!user) throw new Error("No logged-in user found.");

          // Call your API function with userId + city
          const { succes, city } = await setCity(user.id, newCity);

          if (!succes) {
            throw new Error("Failed to update city in Supabase");
          }

          // Update user object in Zustand
          set((state) => ({
            loading: false,
            user: state.user ? { ...state.user, city: city } : null,
          }));
        } catch (error: any) {
          console.log("There was a state error while uploading the city: ", error);
          set({ loading: false, error });
        }
      }

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)