import { Stack } from "expo-router";
import TabLayout from './(tabs)';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="RequestDetail"
        options={{ headerShown: false, title: "deets" }}
      />
      <Stack.Screen
        name="myrequests"
        options={{ headerShown: false, title: "deets" }}
      />
    </Stack>
  );
}

