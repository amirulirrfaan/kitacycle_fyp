import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons
import Colors from "../constants/Colors";
import PrimaryButton from "../components/PrimaryButton";
import BalanceCard from "../components/Dashboard/BalanceCard";
import CircleSlider from "../components/Dashboard/CircleSlider";
import NewsSlider from "../components/Dashboard/NewsSlider";

function CustomerDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingUserText}>Hi User!</Text>
        <Text style={styles.greetingText}>Let's clean our environment</Text>
      </View>

      {/* Current Balance Card */}
      <BalanceCard />

      {/* Slider Container */}
      <CircleSlider />

      {/* News Feed */}
      <NewsSlider />

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Recycle Now</Text>
        <Text style={styles.descriptionText}>
          We will help you find the nearest recycle truck to collect your waste
          in your area
        </Text>
      </View>

      {/* Primary Button */}
      <PrimaryButton
        title="Schedule Pickup"
        onPress={() => navigation.navigate("Schedule")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  greetingContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  greetingUserText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "60%",
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: "center",
  },
});

export default CustomerDashboardScreen;
