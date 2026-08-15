import { Stack } from "expo-router";
import { TripProvider } from "../context/TripContext";

export default function RootLayout() {
  return (
    <TripProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Klink" }} />
        <Stack.Screen name="items" options={{ title: "Items" }} />
      </Stack>
    </TripProvider>
  );
}