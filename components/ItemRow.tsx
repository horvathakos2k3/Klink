import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Item, useTrip } from "../context/TripContext";

export default function ItemRow({
  item,
  onEdit,
  onRemove,
}: {
  item: Item;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { t } = useTrip();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.price}>{item.price} {t("currency")}</Text>
          <Text style={styles.chevron}>{expanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          {item.quantity !== "" && (
            <Text style={styles.detailLine}>{t("quantity")}: {item.quantity}</Text>
          )}
          <Text style={styles.detailLine}>{t("paidBy")}: {item.paidBy}</Text>
          <Text style={styles.detailLine}>
            {t("sharedBy")}: {item.sharedBy.join(", ")}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit}>
              <Text style={styles.edit}>{t("edit")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRemove}>
              <Text style={styles.remove}>{t("remove")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  name: { fontSize: 16, fontWeight: "500" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { fontSize: 15, fontWeight: "500" },
  chevron: { fontSize: 12, color: "#999" },
  details: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    gap: 4,
  },
  detailLine: { fontSize: 13, color: "#666" },
  actions: { flexDirection: "row", gap: 20, marginTop: 8 },
  edit: { fontSize: 13, color: "#0F6E56", fontWeight: "500" },
  remove: { fontSize: 13, color: "#A32D2D", fontWeight: "500" },
});