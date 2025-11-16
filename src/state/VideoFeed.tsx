import { create } from 'zustand';
import supabase from '../utils/supabase';

interface VideoFeedStore {
    loading: boolean
    error: any
    displayVideos: any[]

    fetchInitialVideos: () => Promise<void>
}

export const useVideoFeedStore = create<VideoFeedStore>((set, get) => ({
    loading: false,
    error: null,
    displayVideos: [],

    fetchInitialVideos: async () => {
        try {
            set({ loading: true, error: null })

            const { data, error } = await supabase
                .from("video_feed")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(20)

            if (error) {
                console.log("There was an error while reading video events from the database")
            }

            set({ loading: false, displayVideos: data})
        } catch {

        }
    }
}))