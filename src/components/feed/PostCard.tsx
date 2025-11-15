import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PostCard({ event }: { event: typeof feedEvents[0] }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.title}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <View style={styles.eventCard}>
      <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventLocationRow}>
          <Feather name="map-pin" size={14} color="#262627" />
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>
      </View>
      <View style={styles.eventActions}>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Feather 
            name="heart" 
            size={18} 
            color="#2e3536"
            fill={isFavorite ? "#2e3536" : "transparent"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="share-2" size={18} color="#2e3536" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: 'rgba(129,110,148,0.7)',
    height: 84,
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  eventImage: {
    width: 89,
    height: 84,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventDate: {
    fontSize: 12,
    color: '#262627',
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262627',
    marginBottom: 6,
  },
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#262627',
  },
  eventActions: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -18 }],
    flexDirection: 'row',
    gap: 16,
  },
})

