import { Calendar, MapPin, XCircle } from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function EventDetails({ event }: any) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar color="#2563eb" size={20} />
            <Text style={styles.sectionTitle}>When</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Start:</Text>
              <Text style={styles.dateValue}>
                {formatDate(event.start_date)} · {formatTime(event.start_date)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>End:</Text>
              <Text style={styles.dateValue}>
                {formatDate(event.end_date)} · {formatTime(event.end_date)}
              </Text>
            </View>
            <TouchableOpacity style={styles.addToCalendarButton}>
              <Text style={styles.addToCalendarText}>Add to calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin color="#2563eb" size={20} />
            <Text style={styles.sectionTitle}>Location</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.locationName}>{event.name}</Text>
            <Text style={styles.locationAddress}>{event.location}</Text>
            <TouchableOpacity style={styles.viewMapButton}>
              <Text style={styles.viewMapText}>View on maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).springify()}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <XCircle color="#dc2626" size={20} />
            <Text style={styles.sectionTitle}>Refund Policy</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.refundText}>{event.refund_policy}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).springify()}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>ℹ️</Text>
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.aboutText}>{event.description}</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  addToCalendarButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCalendarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  viewMapButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMapText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  refundText: {
    fontSize: 14,
    color: '#dc2626',
    lineHeight: 20,
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 32,
  },
});
