// App.tsx
import PostCard from '@/src/components/feed/PostCard';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LocationSelector from './LocationSelector';

const { width } = Dimensions.get('window');
const CARD_PADDING = 24;
const CARD_WIDTH = width - CARD_PADDING * 2;

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

// Feed events
const feedEvents = [
  {
    id: 4,
    title: "The Kooks",
    date: "Thu, Apr 19 · 20.00 Pm",
    location: "Razzmatazz",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400",
  },
  {
    id: 5,
    title: "The Wombats",
    date: "Fri, Apr 22 · 21.00 Pm",
    location: "Sala Apolo",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
  },
  {
    id: 6,
    title: "Foster The People",
    date: "Mon, Apr 25 · 17.30",
    location: "La Monumental",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
  },
];

function SystemBar() {
  return (
    <View style={styles.systemBar}>
      <Text style={styles.timeText}>9:41</Text>
      <View style={styles.statusIcons}>
        <Feather name="check" size={16} color="#2e3536" />
        <Feather name="wifi" size={16} color="#2e3536" />
        <Feather name="battery" size={16} color="#2e3536" />
      </View>
    </View>
  );
}

function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featuredEvents.length;
      setCurrentIndex(nextIndex);
      
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * CARD_WIDTH,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const toggleFavorite = (eventId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId);
      } else {
        newFavorites.add(eventId);
      }
      return newFavorites;
    });
  };

  const handleShare = async (eventTitle: string) => {
    try {
      await Share.share({
        message: `Check out this event: ${eventTitle}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.sectionTitle}>Hottest Events</Text>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
      >
        {featuredEvents.map((event) => (
          <View key={event.id} style={[styles.featuredCard, { width: CARD_WIDTH }]}>
            <Image
              source={{ uri: event.image }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredGradient} />
            
            {/* Play button */}
            <View style={styles.playButton}>
              <Feather name="play" size={32} color="#fff" style={{ marginLeft: 4 }} />
            </View>

            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{event.badge}</Text>
            </View>

            {/* Event info */}
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredDate}>{event.date}</Text>
              <Text style={styles.featuredTitle}>{event.title}</Text>
              <View style={styles.featuredFooter}>
                <View style={styles.locationInfo}>
                  <Feather name="map-pin" size={14} color="#2e3536" />
                  <Text style={styles.featuredLocation} numberOfLines={1}>
                    {event.location}
                  </Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => toggleFavorite(event.id)}>
                    <Feather 
                      name="heart" 
                      size={18} 
                      color="#2e3536"
                      fill={favorites.has(event.id) ? "#2e3536" : "transparent"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleShare(event.title)}>
                    <Feather name="share-2" size={18} color="#2e3536" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicators */}
      <View style={styles.indicators}>
        {featuredEvents.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentIndex(index);
              scrollViewRef.current?.scrollTo({
                x: index * CARD_WIDTH,
                animated: true,
              });
            }}
          >
            <View
              style={[
                styles.indicator,
                index === currentIndex && styles.indicatorActive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function EventFeed() {
  return (
    <View style={styles.feedContainer}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {feedEvents.map((event) => (
        <PostCard key={event.id} event={event} />
      ))}
    </View>
  );
}

function BottomNavigation() {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}>
        <Feather name="home" size={24} color="#333538" fill="#333538" />
        <Text style={styles.navLabelActive}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Feather name="search" size={24} color="#BDBDBD" />
        <Text style={styles.navLabel}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Feather name="play" size={24} color="#BDBDBD" />
        <Text style={styles.navLabel}>Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Feather name="user" size={24} color="#BDBDBD" />
        <Text style={styles.navLabel}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SystemBar />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LocationSelector />
        <FeaturedCarousel />
        <EventFeed />
      </ScrollView>

      <BottomNavigation />
      
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
  sectionTitle: {
    fontSize: 16,
    color: '#2e3536',
    marginBottom: 20,
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(46,53,54,0.78)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  navButton: {
    padding: 4,
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#BDBDBD',
  },
  navLabelActive: {
    fontSize: 10,
    color: '#333538',
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