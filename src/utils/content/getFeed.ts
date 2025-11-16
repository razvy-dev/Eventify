import supabase from "../supabase";

export default async function getFeed(city: string) {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("city", city)
            .order("created_at", { ascending: false } )
            .limit(20)
        
        if (error) {
            console.log("There was an error in supabase while reading this data", error)
            return { error }
        }

        return { data: data, error: null }

    } catch (error) {
        console.log("There was an error while reading feed from the database", error)
        return { error }
    }
}