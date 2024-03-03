import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/Colors";

function BalanceCard() {
  const currentBalance = 1000;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Current Balance</Text>
      <Text style={styles.balance}>RM{currentBalance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,

    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: "white",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default BalanceCard;
