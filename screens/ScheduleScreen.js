import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";
import DatePicker from "../components/Schedule/DatePicker";
import TimePicker from "../components/Schedule/TimeInput";

const ScheduleScreen = ({ navigation }) => {
  // State for input fields
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [weight, setWeight] = useState("");

  // Handler for scheduling pickup
  const handleSchedule = () => {
    // Log scheduled pickup details
    console.log("Location:", location);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Weight:", weight);

    // Navigate to success screen
    navigation.navigate("Success");
  };

  return (
    <View style={styles.container}>
      {/* Pickup Address Input */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Pickup Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup Address"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>

      {/* Date and Time Inputs */}
      <View style={styles.row}>
        {/* Date Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <DatePicker
            label="Select Date"
            value={date}
            onDateChange={(selectedDate) => setDate(selectedDate)}
          />
        </View>

        {/* Time Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <TimePicker
            label="Select Time"
            value={time}
            onTimeChange={(selectedTime) => setTime(selectedTime)}
          />
        </View>
      </View>

      {/* Approximate Waste Weight Input */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Approximate Waste Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Approximate Waste Weight (kg)"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
      </View>

      {/* Schedule Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Confirm Schedule" onPress={handleSchedule} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  labelContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#818181",
    color: "#818181",
    borderRadius: 8,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  inputContainer: {
    width: "48%",
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});

export default ScheduleScreen;
