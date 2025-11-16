// app/_layout.tsx
import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../state/Auth';

export default function RootLayout() {
  const [selectedScreen, setSelectedScreen] = useState("home")
  const { user } = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        router.push("/Feed/Feed")
      } else {
        router.push("/Home")
      }
    })
  })

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* SplashScreen is always the first screen */}
        <Stack.Screen name="SplashScreen" />
      </Stack>
      
      {/* This is the bottom navigation bar. 
        It is placed OUTSIDE the Stack so it can overlay ALL screens. 
      */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => { router.push("/Feed/Feed"); setSelectedScreen("home")}}>
          <Feather name="home" size={24} color={selectedScreen === "home" ? "#333538" : "#BDBDBD"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => { router.push("/Search/SearchScreen"); setSelectedScreen("search") }}>
          <Feather name="search" size={24} color={selectedScreen === "search" ? "#333538" : "#BDBDBD"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => { router.push("/VideoFeed/VideoFeed"); setSelectedScreen("video")}}>
          <Feather name="play" size={24} color={selectedScreen === "video" ? "#333538" : "#BDBDBD"}  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => { router.push("/Account/Account"); setSelectedScreen("account") }}>
          {/* Note: Moved onPress from Feather to TouchableOpacity */}
          <Feather name="user" size={24} color={selectedScreen === "account" ? "#333538" : "#BDBDBD"} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 40,
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
})