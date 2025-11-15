// App.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useAuthStore } from '../state/Auth';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { user, loading } = useAuthStore();
    const router = useRouter();
  
  useEffect(() => {
    if (!loading) {
      // Delay navigation to ensure root layout is mounted
      const id = setTimeout(() => {
        router.replace(user ? '/Feed/Feed' : '/Home');
      }, 50); // 50ms delay is usually enough
      return () => clearTimeout(id);
    }
  }, [loading, user, router]);


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Vertical gradient stripes */}
      <LinearGradient
        colors={['#8B0000', '#600000', '#8B0000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* App Name */}
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Eventify
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
