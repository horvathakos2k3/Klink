import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TripProvider } from "../context/TripContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TripProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Klink" }} />
          <Stack.Screen name="items" options={{ title: "Items" }} />
        </Stack>
      </TripProvider>
    </SafeAreaProvider>
  );
}