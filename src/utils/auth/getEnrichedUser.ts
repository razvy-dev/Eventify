import supabase from "../supabase";

export async function getEnrichedUser(userId: string): Promise<any> {
    // Changed from "users" to "profiles" to match your signup table
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()

    if (error) {
        console.log("Error fetching profile:", error)
        return null
    }
    
    if (!data) {
        console.log("No corresponding profile found yet")
        return null
    }

    return data
}