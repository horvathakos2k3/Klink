import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ItemRow from "../components/ItemRow";
import { useTrip } from "../context/TripContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ItemsScreen() {
  const { people, items, addItem, updateItem, removeItem } = useTrip();
const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [paidBy, setPaidBy] = useState<string | null>(null);
  const [shareMode, setShareMode] = useState<"all" | "some">("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  function toggleSelected(person: string) {
    if (selected.includes(person)) {
      setSelected(selected.filter((p) => p !== person));
    } else {
      setSelected([...selected, person]);
    }
  }

  function handleSave() {
    const priceNumber = parseFloat(price);
    const sharedBy = shareMode === "all" ? people : selected;

    if (name.trim() === "") return;
    if (isNaN(priceNumber) || priceNumber <= 0) return;
    if (paidBy === null) return;
    if (sharedBy.length === 0) return;

    const itemData = {
      name: name.trim(),
      quantity,
      price: priceNumber,
      paidBy,
      sharedBy,
    };

    if (editingId === null) {
      addItem(itemData);
    } else {
      updateItem(editingId, itemData);
    }

    setName("");
    setQuantity("");
    setPrice("");
    setPaidBy(null);
    setShareMode("all");
    setSelected([]);
    setEditingId(null);
  }

  function handleEdit(id: string) {
    const item = items.find((it) => it.id === id);
    if (!item) return;

    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price.toString());
    setPaidBy(item.paidBy);

    const isEveryone =
      item.sharedBy.length === people.length &&
      people.every((p) => item.sharedBy.includes(p));
    setShareMode(isEveryone ? "all" : "some");
    setSelected(isEveryone ? [] : item.sharedBy);

    setEditingId(id);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
    >
      <Text style={styles.title}>What did you buy?</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex2]}
          placeholder="Item name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.flex1]}
          placeholder="Qty"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, styles.flex1]}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.currency}>lei</Text>
      </View>

      <Text style={styles.label}>Who paid?</Text>
      <View style={styles.chipRow}>
        {people.map((person) => (
          <TouchableOpacity
            key={person}
            style={[styles.chip, paidBy === person && styles.chipActive]}
            onPress={() => setPaidBy(person)}
          >
            <Text style={[styles.chipText, paidBy === person && styles.chipTextActive]}>
              {person}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Who shares it?</Text>
      <View style={styles.segment}>
        <TouchableOpacity
          style={[styles.segmentButton, shareMode === "all" && styles.segmentActive]}
          onPress={() => setShareMode("all")}
        >
          <Text style={[styles.segmentText, shareMode === "all" && styles.segmentTextActive]}>
            Everyone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, shareMode === "some" && styles.segmentActive]}
          onPress={() => setShareMode("some")}
        >
          <Text style={[styles.segmentText, shareMode === "some" && styles.segmentTextActive]}>
            Selected
          </Text>
        </TouchableOpacity>
      </View>

      {shareMode === "some" && (
        <View style={styles.chipRow}>
          {people.map((person) => (
            <TouchableOpacity
              key={person}
              style={[styles.chip, selected.includes(person) && styles.chipActive]}
              onPress={() => toggleSelected(person)}
            >
              <Text
                style={[styles.chipText, selected.includes(person) && styles.chipTextActive]}
              >
                {person}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <Text style={styles.addButtonText}>
          {editingId === null ? "+ Add item" : "Save changes"}
        </Text>
      </TouchableOpacity>

      {items.length > 0 && (
        <View style={styles.listSection}>
          <Text style={styles.label}>Items ({items.length})</Text>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onEdit={() => handleEdit(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  currency: { fontSize: 16, color: "#666" },
  label: { fontSize: 14, color: "#666", marginBottom: 8 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: "#0F6E56", borderColor: "#0F6E56" },
  chipText: { fontSize: 14, color: "#333" },
  chipTextActive: { color: "#fff" },
  segment: { flexDirection: "row", gap: 8, marginBottom: 16 },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  segmentActive: { backgroundColor: "#0F6E56", borderColor: "#0F6E56" },
  segmentText: { fontSize: 14, color: "#333" },
  segmentTextActive: { color: "#fff" },
  addButton: {
    backgroundColor: "#0F6E56",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  listSection: { marginTop: 4 },
});