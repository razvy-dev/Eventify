import supabase from "../supabase";

/**
 * Deletes an event from the 'events' table by its id.
 * @param eventId - The id of the user whose events we are reading
 * @returns A promise with success or error info
 */

export async function getOwnedEvents(userId: string) {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("organizer_id", userId)
            .order("created_at", { ascending: false })

        if (error) {
            console.log("There was an error while reading owned events: ", error)
            throw error;
        }

        return { succes: true, data: data }
    } catch (err: any) {
        console.error("Error getting owned events: ", err);
        throw err
    }
}