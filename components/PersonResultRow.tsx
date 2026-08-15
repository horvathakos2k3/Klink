import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Balance, ShareLine } from "../logic/settle";

export default function PersonResultRow({
  balance,
  remaining,
  shares,
}: {
  balance: Balance;
  remaining: number;
  shares: ShareLine[];
}) {
  const [expanded, setExpanded] = useState(false);
  const isSettled = remaining === 0;
  const positive = remaining >= 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.name}>{balance.person}</Text>
        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              isSettled ? styles.settled : positive ? styles.pos : styles.neg,
            ]}
          >
            {isSettled
              ? "settled"
              : positive
              ? `gets ${remaining} lei`
              : `pays ${-remaining} lei`}
          </Text>
          <Text style={styles.chevron}>{expanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.detailLine}>
            Paid in total: {balance.paid.toFixed(2)} lei
          </Text>
          <Text style={styles.detailLine}>
            Own share total: {balance.owed.toFixed(2)} lei
          </Text>
          {shares.length > 0 && <Text style={styles.subHeader}>Shares:</Text>}
          {shares.map((s, i) => (
            <View key={i} style={styles.shareLine}>
              <Text style={styles.shareName}>{s.itemName}</Text>
              <Text style={styles.shareAmount}>{s.share.toFixed(2)} lei</Text>
            </View>
          ))}
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
  right: { flexDirection: "row", alignItems: "center", gap: 10 },
  amount: { fontSize: 15, fontWeight: "500" },
  pos: { color: "#0F6E56" },
  neg: { color: "#A32D2D" },
  settled: { color: "#999" },
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
  subHeader: { fontSize: 13, fontWeight: "500", marginTop: 6 },
  shareLine: { flexDirection: "row", justifyContent: "space-between" },
  shareName: { fontSize: 13, color: "#666" },
  shareAmount: { fontSize: 13, color: "#666" },
});