# Copilot / AI Agent Instructions for Eventify

This file contains concise, actionable guidance to help AI coding agents be productive in this Expo + Supabase project.

- **Project type:** Expo (React Native) app using `expo-router` and file-based routing. App code lives in `src/app` and follows Expo's file-based routing conventions.
- **Entry point / scripts:** `package.json` uses `"main": "expo-router/entry"`. Use `npm start` or `npx expo start` (or `npm run android|ios|web`) to run the app. `npm run reset-project` runs `scripts/reset-project.js`.

- **Auth & backend:** Supabase is the backend. The client is configured in `src/utils/supabase.ts` and relies on env vars `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_API_KEY`. Supabase auth uses `AsyncStorage` for session persistence.

- **State management:** Authentication and user state are handled with Zustand in `src/state/Auth.ts`. Typical pattern:
  - Low-level auth operations live in `src/utils/auth/*` (e.g. `signUp.ts`, `signIn.ts`, `signOut.ts`, `getEnrichedUser.ts`, `setProfilePicture.ts`).
  - `useAuthStore` exposes `initialize`, `signUp`, `signIn`, `signOut` and persists to AsyncStorage via `persist` middleware.
  - Utility functions throw errors; the store usually catches them, sets an `error` string, and often re-throws for UI handling.

- **Database conventions:** The runtime expects a `users` profile table linked to Supabase Auth via `id` (see `signUpWithEmail` which inserts into `users` with `id: userId`). Profile fields include `firstName`, `lastName`, and `profile_picture`.

- **Integration patterns to follow:**
  - Prefer calling helper functions in `src/utils/auth/*` from stores or components instead of directly calling `supabase` from UI components.
  - When fetching user data use `getEnrichedUser(userId)` to combine Auth user and profile row.
  - For file uploads/profile pictures follow existing helper `setProfilePicture.ts` (uploads/updates via Supabase storage or profile column) — use its pattern for error handling and returning the updated profile URL.

- **Environment & secrets:** Environment variables are referenced as `process.env.EXPO_PUBLIC_*`. Expect them to be set via Expo's environment configuration for local dev and CI. Do not hardcode keys.

- **Code style & patterns:**
  - TypeScript is used across the project. Keep types in helper files (e.g. `AppUser`, `Profile` in `src/state/Auth.ts`).
  - Error handling pattern: low-level utils throw, stores log and set `error` and frequently rethrow. Preserve this flow when adding new auth utilities.
  - State updates use `set({ ... })` inside Zustand actions; follow existing structure for `loading`/`error` flags.

- **Files to inspect before changing behavior:**
  - `src/utils/supabase.ts` — Supabase client config
  - `src/utils/auth/*.ts` — auth helpers and DB interactions
  - `src/state/Auth.ts` — store wiring and flow examples
  - `src/app` — page/routes and layout (`_layout.tsx`) using file-based routing

- **Build / run commands (dev):**
  - Install: `npm install`
  - Start: `npm start` or `npx expo start`
  - Platform quick run: `npm run android` / `npm run ios` / `npm run web`
  - Lint: `npm run lint`

- **What NOT to change without PR / discussion:**
  - `src/utils/supabase.ts` client options (storage, autoRefreshToken) unless fixing a bug — changing session behavior impacts all auth flows.
  - The shape of the `users` profile row without updating all call sites (`getEnrichedUser`, `state/Auth.ts`, and signup flow).

- **Examples:**
  - To create a new signup flow, mimic `src/utils/auth/signUp.ts` which calls `supabase.auth.signUp(...)` then inserts a row into `users` with `id: data.user.id`.
  - To read the current session, use `getSession()` (in `src/utils/auth/getSession.ts`) and then `getEnrichedUser(session.user.id)` to fetch profile data.

- **Search keywords** (useful for automated changes): `useAuthStore`, `getEnrichedUser`, `signUpWithEmail`, `profile_picture`, `src/utils/supabase.ts`.

If anything in this file is unclear or you'd like more detail for specific areas (security, CI, or mobile build steps), tell me which section to expand and I'll iterate.
