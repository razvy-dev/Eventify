import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getEnrichedUser } from '../utils/auth/getEnrichedUser'
import { getSession } from '../utils/auth/getSession'
import { signInWithEmail } from '../utils/auth/signIn'
import { signOutUser } from '../utils/auth/signOut'
import { signUpWithEmail } from '../utils/auth/signUp'

export type Profile = {
  firstName?: string
  lastName?: string
  profile_picture?: string
  // add any other fields from your profiles table
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

          let enrichedUser = undefined
          if (session) {
            const profileData = await getEnrichedUser(session.user.id)
            enrichedUser = {
              ...session.user,
              profile: profileData,
            }
          }

          set({
            user: enrichedUser ?? null,
            session: session ?? null,
            loading: false,
          })
        } catch (err: any) {
          set({ error: err.message, loading: false })
        }
      },

      signUp: async (email, password) => {
        try {
          set({ loading: true, error: null })
          const { user, session } = await signUpWithEmail(email, password)
          set({ user, session, loading: false })
        } catch (err: any) {
          set({ error: err.message, loading: false })
        }
      },

      signIn: async (email, password) => {
        try {
          set({ loading: true, error: null })
          const { user, session } = await signInWithEmail(email, password)
          set({ user, session, loading: false })
        } catch (err: any) {
          set({ error: err.message, loading: false })
        }
      },

      signOut: async () => {
        try {
          set({ loading: true })
          await signOutUser()
          set({ user: null, session: null, loading: false })
        } catch (err: any) {
          set({ error: err.message, loading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: () => AsyncStorage,
    }
  )
)
