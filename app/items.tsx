import { StyleSheet, Text, View } from "react-native";
import { useTrip } from "../context/TripContext";

export default function ItemsScreen() {
  const { people } = useTrip();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What did you buy?</Text>
      <Text style={styles.subtitle}>
        {people.length} people: {people.join(", ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
});