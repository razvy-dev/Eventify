import supabase from "../supabase";

export default async function addEvent(
    name: string,
    startDate: string,
    endDate: string,
    location: string,
    userId: string,
    city: string,
    website?: string
) {
    try {
        const { data, error } = await supabase
            .from("events")
            .insert([
                {
                    name: name,
                    start_date: startDate,
                    end_date: endDate,
                    location: location,
                    user_id: userId,
                    city: city,
                    website: website
                }
            ])
            .select()
            .single();

        if (error) {
            console.log("An error appeared while creating this event in the database: ", error)
            throw error
        }

        return { succes: true, data: data }
    } catch (error) {
        console.log("A wierd error happened while creating this event in the databse", error)
        throw error
    }
}