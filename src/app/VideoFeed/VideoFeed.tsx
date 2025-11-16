// app/feed/index.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventVideoCard from "../../components/video/EventVideoCard";
import FilterWrapper from "../../components/wrappers/FilterWrapper";
import supabase from "../../utils/supabase"; // Adjimust the import path to your supabase client

export default function FeedScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos from Supabase
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('video_feed')
        .select('*')
        .order('created_at', { ascending: false }); // Order by most recent first

      if (fetchError) throw fetchError;

      console.log("vidoes", data)

      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const screenHeight = Dimensions.get("window").height;

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F4", justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading videos...</Text>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F4", justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>Error loading videos: {error}</Text>
      </SafeAreaView>
    );
  }

  // Empty state
  if (videos.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F4", justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#666' }}>No videos available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F4" }}>
      <FilterWrapper />

<FlatList
  data={videos}
  keyExtractor={(item) => item.id}
  
  renderItem={({ item }) => (
    <View style={{ height: screenHeight }}>
      <EventVideoCard item={item} />
    </View>
  )}

  pagingEnabled
  snapToInterval={screenHeight}
  decelerationRate="fast"
  showsVerticalScrollIndicator={false}

  onRefresh={fetchVideos}
  refreshing={loading}
/>
    </SafeAreaView>
  );
}