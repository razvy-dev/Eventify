import supabase from "../supabase";

export async function getEnrichedUser(userId: string): Promise<any> {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()

    if (error) throw error
    
    if (!data || data.length === 0) {
        console.log("Not any corresponding enriched user yet")
    }

    return data
}