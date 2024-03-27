import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";

const SuccessScheduleScreen = ({ navigation }) => {
  const handleTrackRequest = () => {
    navigation.navigate("Track Driver");
  };

  const handleDone = () => {
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
      <Text style={styles.successText}>Successfully Requested!</Text>

      {/* Track Request Button */}
      <PrimaryButton title="Track Request" onPress={handleTrackRequest} />

      {/* Done Button */}
      <TouchableOpacity
        style={[styles.doneButton, styles.button]}
        onPress={handleDone}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
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
  button: {
    width: "60%",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primary,
  },
  doneButton: {
    backgroundColor: "transparent", // Set background color to transparent
  },
});

export default SuccessScheduleScreen;
