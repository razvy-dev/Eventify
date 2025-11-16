import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type TabType = 'details' | 'photos' | 'videos' | 'reviews';

interface EventWrapperProps {
  eventId: string;
  eventTitle: string;
  photoUrl: string;
  children: React.ReactNode;
  onParticipate: () => void;
}

const { width } = Dimensions.get('window');

export default function EventWrapper({
  eventId,
  eventTitle,
  photoUrl,
  children,
  onParticipate,
}: EventWrapperProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [isLiked, setIsLiked] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    console.log('Share event:', eventId);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: photoUrl || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' }}
          style={styles.headerImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.gradient}
        />

        <View style={styles.topControls}>
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <ChevronLeft color="#fff" size={28} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.rightControls}>
            <TouchableOpacity
              onPress={handleLike}
              style={[styles.iconButton, isLiked && styles.likedButton]}
            >
              <Heart
                color="#fff"
                size={24}
                fill={isLiked ? '#fff' : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
              <Share2 color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {eventTitle}
          </Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <View style={styles.tabIconContainer}>
            <Text style={styles.tabIcon}>📋</Text>
          </View>
          {activeTab === 'details' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
          onPress={() => setActiveTab('photos')}
        >
          <View style={styles.tabIconContainer}>
            <Text style={styles.tabIcon}>📷</Text>
          </View>
          {activeTab === 'photos' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <View style={styles.tabIconContainer}>
            <Text style={styles.tabIcon}>▶️</Text>
          </View>
          {activeTab === 'videos' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
          onPress={() => setActiveTab('reviews')}
        >
          <View style={styles.tabIconContainer}>
            <Text style={styles.tabIcon}>⭐</Text>
          </View>
          {activeTab === 'reviews' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{children}</View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.participateButton} onPress={onParticipate}>
          <Text style={styles.participateButtonText}>Participate in Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 240,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  rightControls: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: 'rgba(239,68,68,0.8)',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeTab: {
    opacity: 1,
  },
  tabIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 40,
    height: 3,
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  participateButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  participateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
