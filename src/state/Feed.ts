import { create } from 'zustand'
import getFeed from '../utils/content/getFeed'

interface FeedStore {
    loading: boolean
    error: any
    displayedPosts: any[]

    fetchInitialPosts: (city: string) => Promise<void>
}

export const useFeedStore = create<FeedStore>((set, get) => ({
    loading: false,
    error: null,
    displayedPosts: [],

    fetchInitialPosts: async (city: string) => {
        try {
            console.log(city)
            set({ loading: true, error: null });

            const { data, error } = await getFeed(city);

            if (error) {
                set({ loading: false, error: error, displayedPosts: [] });
                return []; // Return empty array on error
            }

            // Success path: set the data and stop loading
            set({ loading: false, displayedPosts: data, error: null });
            return data; // Return the data

        } catch (error: any) {
            console.log("Something went wrong while getting initial feed posts", error);
            set({ loading: false, error: error, displayedPosts: [] }); 
            return []; // Return empty array on catch
        }
    },

    getNextEvent: async (city: string, ) => {
        console.log("message")
    }
}))