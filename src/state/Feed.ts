import { create } from 'zustand'
import getFeed from '../utils/content/getFeed'

interface FeedStore {
    loading: boolean
    error: any
    displayedPosts: any[]
}

export const useFeedStore = create<FeedStore>((set, get) => ({
    loading: false,
    error: null,
    displayedPosts: [],

    fetchInitialPosts: async (city: string) => {
        try {
            set({ loading: true, error: null })

            const { data, error } = await getFeed(city)

            if (error) {
                set({ displayedPosts: data, error: error})
            }

            set({ displayedPosts: data, error: null})

        } catch (error: any) {
            console.log("Something went wrong while getting initial feed posts", error)
            set({ loading: false, error: error })
        }
    },

    getNextEvent: async (city: string) => {
        console.log("message")
    }
}))