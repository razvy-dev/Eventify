import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');
const CARD_PADDING = 24;
const CARD_WIDTH = width - CARD_PADDING * 2;

export default function FeaturedCarousel({ featuredEvents }: any) {
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
  }, [currentIndex, featuredEvents.length]);

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
        {featuredEvents.map((event: any) => (
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
        {featuredEvents.map((_: any, index: any) => (
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

const styles = StyleSheet.create({
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
})