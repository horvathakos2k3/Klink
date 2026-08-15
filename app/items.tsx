import { StyleSheet, Text, View } from "react-native";

export default function ItemsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mit vettetek?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "600" },
});