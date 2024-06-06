import React, { useState, useEffect } from "react";
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
  const [totalWeight, setTotalWeight] = useState(0);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const navigation = useNavigation();
  const { user } = useLogin();

  useEffect(() => {
    const calculateTotalWeight = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.weight, 0);
      setTotalWeight(total);
    };
    calculateTotalWeight();
  }, [selectedItems]);

  const handleStepChange = (stepNumber) => {
    setStep(stepNumber);
  };

  const isDateTimeValid = (date, time) => {
    if (!date || !time) {
      return false;
    }

    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    selectedDateTime.setHours(hours, minutes);

    const currentDateTime = new Date();
    return selectedDateTime > currentDateTime;
  };

  const nextStep = async () => {
    if (step < 3) {
      if (step === 1) {
        const hasValidItem = selectedItems.some((item) => item.weight > 0);
        if (!hasValidItem) {
          Alert.alert(
            "Validation Error",
            "Please select at least one item with a weight greater than 0."
          );
          return;
        }
      } else if (step === 2) {
        if (!isValid) {
          Alert.alert(
            "Validation Error",
            "Please provide a valid address or use your current location."
          );
          return;
        }

        if (!isDateTimeValid(selectedDate, selectedTime)) {
          Alert.alert(
            "Validation Error",
            "The pickup date and time cannot be in the past."
          );
          return;
        }
      }
      setStep(step + 1);
    } else {
      if (!isPaymentSuccessful) {
        Alert.alert("Payment Required", "Please complete the payment first.");
        return;
      }
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
        itemId: item._id,
        itemWeight: item.weight,
      })),
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      coordinates: selectedCoordinates,
      address: selectedAddress,
      totalWeight: totalWeight,
    };

    const response = await axios.post(
      "https://kitacycle-backend.onrender.com/createPickup",
      pickupData
    );
    return response.data;
  };

  const handleValidation = (valid) => {
    setIsValid(valid);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
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

  const labels = ["Select Item", "Schedule Date", "Pickup Summary"];

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={step - 1}
        labels={labels}
        stepCount={3}
        onPress={handleStepChange}
      />

      {step === 1 && (
        <>
          <SelectItemScreen setSelectedItems={setSelectedItems} />
        </>
      )}

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
          items={selectedItems}
          date={selectedDate}
          time={selectedTime}
          address={selectedAddress}
          coordinates={selectedCoordinates}
          totalPickupWeight={totalWeight}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <TouchableOpacity
        style={[
          styles.buttonContainer,
          !isPaymentSuccessful &&
            step === 3 && { backgroundColor: Colors.grey },
        ]}
        onPress={nextStep}
        disabled={step === 3 && !isPaymentSuccessful}
      >
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
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default PickupRequestScreen;
