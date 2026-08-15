import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PeopleScreen() {
  const router = useRouter();
  const [people, setPeople] = useState<string[]>([]);
  const [name, setName] = useState("");

  function addPerson() {
    const trimmed = name.trim();
    if (trimmed === "") return;
    setPeople([...people, trimmed]);
    setName("");
  }

  function removePerson(indexToRemove: number) {
    setPeople(people.filter((_, index) => index !== indexToRemove));
  }

  const canContinue = people.length >= 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kik voltak?</Text>
      <Text style={styles.subtitle}>Add meg mindenki nevét.</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Név"
          value={name}
          onChangeText={setName}
          onSubmitEditing={addPerson}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPerson}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.personRow}>
            <Text style={styles.personName}>{item}</Text>
            <TouchableOpacity onPress={() => removePerson(index)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
        onPress={() => router.push("/items")}
        disabled={!canContinue}
      >
        <Text style={styles.nextButtonText}>Tovább</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 20 },
  inputRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    backgroundColor: "#0F6E56",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontSize: 24 },
  list: { flex: 1 },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  personName: { fontSize: 16 },
  removeText: { fontSize: 16, color: "#bbb" },
  nextButton: {
    backgroundColor: "#0F6E56",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  nextButtonDisabled: { backgroundColor: "#ccc" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});