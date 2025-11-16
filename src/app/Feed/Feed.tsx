// App.tsx
import EventFeed from '@/src/components/events/EventFeed';
import FeaturedCarousel from '@/src/components/events/FeaturedCarousel';
import { useAuthStore } from '@/src/state/Auth';
import { useFeedStore } from '@/src/state/Feed';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import LocationSelector from '../../components/events/LocationSelector';

// Featured events for the carousel (hottest events)
const featuredEvents = [
  {
    id: 1,
    title: "La Rosalia",
    date: "Mon, Apr 18 · 21:00 Pm",
    location: "Sala oftatului, Bucharest",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    badge: "Hot",
  },
  {
    id: 2,
    title: "Castrare Team Leader",
    date: "Tue, Apr 19 · 21:00 Pm",
    location: "Clinica Rahova, Sectorul 5",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    badge: "New",
  },
  {
    id: 3,
    title: 'Proiectie "Hotii de subiecte"',
    date: "Wed, Apr 20 · 21:00 Pm",
    location: "Cinema Tortura, Sector 3",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800",
    badge: "Trending",
  },
];

export default function Feed() {
  const [feedEvents, setEvents] = useState([])
  const { user } = useAuthStore()
  console.log(user)
  // CORRECT: returns an object containing the function and the variable
const fetchInitialPosts = useFeedStore((s) => s.fetchInitialPosts);
const displayedPosts = useFeedStore((s) => s.displayedPosts);
const userCity = useAuthStore((s) => s.user?.city);

useEffect(() => {
  const city = "Bucharest";
  
  const fetchEvents = async (currentCity: string) => {
    const newEvents = await fetchInitialPosts(currentCity); 
    
    if (Array.isArray(newEvents)) {
      setEvents(newEvents);
      console.log(newEvents)
    }
  };

  fetchEvents("city: ", city);
}, [userCity, fetchInitialPosts]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LocationSelector />
        <FeaturedCarousel featuredEvents={featuredEvents} />
        <EventFeed feedEvents={feedEvents} />
      </ScrollView>
      
      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef7f5',
  },
  systemBar: {
    backgroundColor: '#eef7f5',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 0) + 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e3536',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  carouselContainer: {
    marginBottom: 24,
  },
  carouselContent: {
    paddingRight: 0,
  },
  featuredCard: {
    height: 280,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#008060',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(129,110,148,0.78)',
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  featuredDate: {
    fontSize: 12,
    color: '#2e3536',
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e3536',
    marginBottom: 8,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
    marginRight: 8,
  },
  featuredLocation: {
    fontSize: 12,
    color: '#2e3536',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(46,53,54,0.3)',
  },
  indicatorActive: {
    width: 24,
    backgroundColor: '#2e3536',
  },
  feedContainer: {
    marginTop: 24,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: [{ translateX: -67.5 }],
    width: 135,
    height: 5,
    backgroundColor: '#2e3536',
    borderRadius: 2.5,
  },
});