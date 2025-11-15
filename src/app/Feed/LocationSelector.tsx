import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function LocationSelector() {
  return (
    <View style={styles.locationContainer}>
      <Text style={styles.findEventsText}>Find events in</Text>
      <View style={styles.locationRow}>
        <Feather name="map-pin" size={20} color="#2e3536" />
        <Text style={styles.cityText}>Bucharest</Text>
        <Feather name="chevron-down" size={20} color="#2e3536" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    locationContainer: {
        marginBottom: 24,
    },
    findEventsText: {
        fontSize: 16,
        color: '#262627',
        textDecorationLine: 'underline',
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 8,
    },
    cityText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2e3536',
    },
})