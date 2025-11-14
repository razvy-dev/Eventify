import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ title: 'Home' }} />
      <Stack.Screen name="Auth/LogIn" options={{ title: 'Login' }} />
      <Stack.Screen name="Auth/SignUp" options={{ title: 'Signup' }} />
      <Stack.Screen name="Account/Account" options={{ title: 'Account' }} />
    </Stack>
  );
}
