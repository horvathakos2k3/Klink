import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PersonResultRow from "../components/PersonResultRow";
import { useTrip } from "../context/TripContext";
import {
  computeBalances,
  computePersonShares,
  computeTransfers,
} from "../logic/settle";

export default function ResultsScreen() {
  const { people, items, settledTransfers, toggleSettled } = useTrip();
  const insets = useSafeAreaInsets();

  const balances = computeBalances(people, items);
  const transfers = computeTransfers(balances);

  const openTransfers = transfers.filter(
    (t) => !settledTransfers.includes(t.key)
  );
  const allSettled = transfers.length > 0 && openTransfers.length === 0;

  function remainingFor(person: string): number {
    let remaining = 0;
    for (const t of transfers) {
      if (settledTransfers.includes(t.key)) continue;
      if (t.from === person) remaining -= Math.ceil(t.amount);
      if (t.to === person) remaining += Math.ceil(t.amount);
    }
    return remaining;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
    >
      <Text style={styles.title}>Who pays what?</Text>

      {allSettled && (
        <View style={styles.settledBanner}>
          <Text style={styles.settledBannerText}>All settled up! 🎉</Text>
        </View>
      )}

      <Text style={styles.sectionLabel}>Transfers</Text>
      {transfers.length === 0 ? (
        <Text style={styles.empty}>Everyone is settled up.</Text>
      ) : (
        <View style={styles.transferBox}>
          {transfers.map((t) => {
            const settled = settledTransfers.includes(t.key);
            return (
              <View key={t.key} style={styles.transferRow}>
                <View style={styles.transferLeft}>
                  <Text style={[styles.transferText, settled && styles.struck]}>
                    {t.from} → {t.to}
                  </Text>
                  <Text style={[styles.transferAmount, settled && styles.struck]}>
                    {Math.ceil(t.amount)} lei
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.checkButton, settled && styles.checkButtonDone]}
                  onPress={() => toggleSettled(t.key)}
                >
                  <Text style={[styles.checkText, settled && styles.checkTextDone]}>
                    {settled ? "✓ Paid" : "Mark paid"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.sectionLabel}>Per person</Text>
      {balances.map((b) => (
        <PersonResultRow
          key={b.person}
          balance={b}
          remaining={remainingFor(b.person)}
          shares={computePersonShares(b.person, items)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
  sectionLabel: { fontSize: 14, color: "#666", marginBottom: 8, marginTop: 4 },
  empty: { fontSize: 15, color: "#0F6E56", marginBottom: 20 },
  settledBanner: {
    backgroundColor: "#E1F5EE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  settledBannerText: { fontSize: 16, fontWeight: "600", color: "#0F6E56" },
  transferBox: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
  },
  transferRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transferLeft: { flex: 1 },
  transferText: { fontSize: 16 },
  transferAmount: { fontSize: 14, color: "#0F6E56", fontWeight: "500", marginTop: 2 },
  struck: { textDecorationLine: "line-through", color: "#bbb" },
  checkButton: {
    borderWidth: 1,
    borderColor: "#0F6E56",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  checkButtonDone: { backgroundColor: "#0F6E56", borderColor: "#0F6E56" },
  checkText: { fontSize: 13, color: "#0F6E56", fontWeight: "500" },
  checkTextDone: { color: "#fff" },
});