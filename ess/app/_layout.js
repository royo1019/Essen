import { Stack } from "expo-router";
import TabLayout from './(tabs)'; 

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{ headerShown: false, title: "Home" }} 
      />
    </Stack>
  );
}

