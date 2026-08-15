import { StyleSheet, Text, View } from "react-native";

export default function PeopleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kik voltak?</Text>
      <Text style={styles.subtitle}>Add meg mindenki nevét.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});