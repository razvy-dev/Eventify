import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="Auth/LogIn" options={{ title: 'Login', headerShown: false  }} />
      <Stack.Screen name="Auth/SignUp" options={{ title: 'Signup', headerShown: false  }} />
      <Stack.Screen name="Auth/SelectLocation" options={{ title: 'Select Location', headerShown: false }} />
      <Stack.Screen name="Auth/PickCity" options={{ title: 'Pick Location', headerShown: false }} />
      <Stack.Screen name="Account/Account" options={{ title: 'Account',  headerShown: false  }} />
    </Stack>
  );
}
