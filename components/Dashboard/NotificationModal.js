import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Colors from "../../constants/Colors";

const NotificationModal = ({ notification, closeModal }) => {
  return (
    <Modal visible={!!notification} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <LottieView
          source={require("../../assets/animations/confetti.json")}
          autoPlay
          loop={false}
          style={styles.confetti}
        />
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="check-circle"
              size={60}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.modalTitle}>Yay!</Text>
          <Text style={styles.modalText}>{notification}</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  confetti: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2000, // Ensure it is above the confetti
  },
  iconContainer: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationModal;
