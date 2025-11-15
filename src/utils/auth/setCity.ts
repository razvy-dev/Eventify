import supabase from "../supabase";

export async function setCity(userId: string, city: string) {
    try {
        const { error } = await supabase
            .from("users")
            .update({ city: city })
            .eq('id', userId)

        if (error) {
            console.log("SOmething didn't work correctly while updateing the city value.")
            return { succes: false }
        }

        return { succes: true, city: city }

    } catch (err) {
        console.log("Something went wrong while updating the city: ", err)
        throw err
    }
}