import { Ionicons } from "@expo/vector-icons";
import * as Audio from "expo-audio";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function EventVideoCard({ item }: { item: any }) {
  // Create video player
  const player = useVideoPlayer(item.video, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  useEffect(() => {
    // Enable audio even in silent mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Fullscreen Video */}
      <VideoView
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen
        contentFit="cover"
      />

      {/* Floating Action Buttons */}
      <View
        style={{
          position: "absolute",
          right: 20,
          top: "40%",
          alignItems: "center",
          gap: 20,
        }}
      >
        <FloatingIcon icon="person-circle-outline" />
        <FloatingIcon icon="heart-outline" />
        <FloatingIcon icon="chatbubble-ellipses-outline" />
        <FloatingIcon icon="share-social-outline" />
      </View>

      {/* Going Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 110,
          left: 20,
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: "black",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Ionicons name="star" size={14} color="white" />
        <Text style={{ color: "white", fontWeight: "600" }}>Going?</Text>
      </TouchableOpacity>
    </View>
  );
}

function FloatingIcon({ icon }: { icon: string }) {
  return (
    <TouchableOpacity
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.9)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={icon} size={26} color="#333" />
    </TouchableOpacity>
  );
}
