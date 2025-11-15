import { StyleSheet, Text, View } from "react-native";
import PostCard from "./PostCard";

export default function EventFeed({ feedEvents }: any) {
  return (
    <View style={styles.feedContainer}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {feedEvents.map((event: any) => (
        <PostCard key={event.id} event={event} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
      feedContainer: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#2e3536',
        marginBottom: 20,
    },
})