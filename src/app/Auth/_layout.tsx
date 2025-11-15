// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* SplashScreen is always the first screen */}
      <Stack.Screen name="SplashScreen" />
    </Stack>
  );
}