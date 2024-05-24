import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";

// Import icons for each item
import { MaterialIcons } from "@expo/vector-icons";

const SuccessScheduleScreen = ({ navigation }) => {
  const handleTrackRequest = () => {
    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      {/* Success Animation */}
      <LottieView
        source={require("../assets/animations/successAnimation.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />

      {/* Success Message */}
      <Text style={styles.successText}>Great!</Text>
      <Text style={styles.notifyText}>
        Your pickup is confirmed, thanks for contributing to clean environment.
        Kindly wait for the collector to accept your request.
      </Text>

      {/* Done Button */}
      <PrimaryButton title="Done" onPress={handleTrackRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 24,
    marginVertical: 20,
  },
  notifyText: {
    fontSize: 15,
    marginVertical: 30,
    marginHorizontal: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  cardTitle: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 3,
  },
  divider: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  cardLabel: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  cardValue: {
    marginLeft: 10,
  },
});

export default SuccessScheduleScreen;
