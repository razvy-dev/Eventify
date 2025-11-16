import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import addEvent from '../utils/events/addEvent'
import { deleteEvent } from '../utils/events/deleteEvent'
import { getOwnedEvents } from '../utils/events/getOwnedEvents'

type EventsState = {
    error: string | null
    loading: boolean
    ownedEvents: any[]

    deleteEvent: (eventId: string) => Promise<void>
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      loading: false,
      error: null,
      ownedEvents: [],

      getOwnedEvents: async (userId: string) => {
        try {
            set({ loading: true, error: null })
            const { succes, data } = await getOwnedEvents(userId)

            if (!succes) {
                console.log("Something went wrong from supabase when trying to get owned events for this user.")
            }

            set({ ownedEvents: data, loading: false, error: null })
        } catch (error: any) {
            console.log("Something worked wrong when getting your events from the database: ", error);
            set({ loading: false, error: error})
            throw error
        }
      },

      addEvent: async (name: string, startDate: string, endDate: string, location: string, userId: string, city: string, website?: string) => {
        try {
            set({ loading: true, error: null })
            const { succes, data } = await addEvent(name, startDate, endDate, location, userId, city, website)

            if (!succes) {
                console.log("A wierd error came up when trying to add this event")
                return;
            }

            set((state) => ({
                loading: false,
                ownedEvents: [...state.ownedEvents, data]
            }))

        } catch (error: any) {
            console.error("A wierd error came up while trying to add this event: ", error)
            set({ loading: false, error: error })
            throw error
        }
      },

      deleteEvent: async (eventId: string) => {
        try {
            set({ loading: true, error: null })
            const { success } = await deleteEvent(eventId)

            if (success) {
                console.log("The event was deleted succesfully. ")

            }

            set((state) => ({
                loading: false,
                // Create a new array that filters out the deleted event
                ownedEvents: state.ownedEvents.filter(
                (event) => event.id !== eventId // Assumes your event has an 'id'
                )
            }))

        } catch (err: any) {
            console.error("Delete event error: ", err)
            set({ error: err.message, loading: false })
            throw err
        }
      }

    }),
    {
      name: 'events-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)