import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Colors from "../constants/Colors";
import ScheduleScreen from "./ScheduleScreen";
import SelectItemScreen from "./SelectItemScreen";
import CheckOutScreen from "./CheckOutScreen";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import axios from "axios";

const PickupRequestScreen = () => {
  const [step, setStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigation = useNavigation();
  const { user } = useLogin();

  // Function to handle step change
  const handleStepChange = (stepNumber) => {
    setStep(stepNumber);
  };

  // Function to handle going to the next step
  const nextStep = async () => {
    if (step < 3) {
      if (step === 1) {
        if (selectedItems.length === 0) {
          Alert.alert("Validation Error", "Please select at least one item.");
          return;
        }
      } else if (step === 2 && !isValid) {
        Alert.alert(
          "Validation Error",
          "Please provide a valid address or use your current location."
        );
        return;
      }
      setStep(step + 1);
    } else {
      try {
        await createPickupRequest();
        navigation.navigate("Success");
      } catch (error) {
        Alert.alert("Error", "Failed to create pickup request.");
        console.error(error);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const createPickupRequest = async () => {
    const pickupData = {
      userId: user._id,
      items: selectedItems.map((item) => ({
        itemId: item.id,
        itemWeight: item.weight,
      })),
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      coordinates: selectedCoordinates,
      address: selectedAddress,
    };

    const response = await axios.post(
      "http://172.20.10.14:8000/createPickup",
      pickupData
    );
    return response.data;
  };

  const handleValidation = (valid) => {
    setIsValid(valid);
  };

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.primary,
    stepStrokeUnFinishedColor: Colors.grey,
    separatorFinishedColor: Colors.primary,
    separatorUnFinishedColor: Colors.grey,
    stepIndicatorFinishedColor: Colors.primary,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.primary,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: Colors.grey,
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: Colors.primary,
  };

  const labels = ["Select Item", "Schedule Date", "Check Out"];

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={step - 1}
        labels={labels}
        stepCount={3}
        onPress={handleStepChange}
      />

      {step === 1 && <SelectItemScreen setSelectedItems={setSelectedItems} />}

      {step === 2 && (
        <ScheduleScreen
          onValidate={handleValidation}
          onSchedule={(date, time, coordinates, address) => {
            setSelectedDate(date);
            setSelectedTime(time);
            setSelectedCoordinates(coordinates);
            setSelectedAddress(address);
          }}
        />
      )}

      {step === 3 && (
        <CheckOutScreen
          onValidate={handleValidation}
          items={selectedItems}
          date={selectedDate}
          time={selectedTime}
          address={selectedAddress}
          coordinates={selectedCoordinates}
        />
      )}

      {/* Next/Confirm Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={nextStep}>
        <View>
          <Text style={styles.buttonText}>
            {step === 3 ? "Confirm" : "Next"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 20,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PickupRequestScreen;
