// utils/deleteEvent.ts
import supabase from '../supabase'; // adjust the path to your supabase client

/**
 * Deletes an event from the 'events' table by its id.
 * @param eventId - The id of the event to delete
 * @returns A promise with success or error info
 */
export async function deleteEvent(eventId: string | number) {
  try {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error deleting event:', err);
    throw err
  }
}
