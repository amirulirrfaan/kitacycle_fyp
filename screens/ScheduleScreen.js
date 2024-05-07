import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import DatePicker from "../components/Schedule/DatePicker";
import TimePicker from "../components/Schedule/TimeInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_API_KEY from "../google_api_key";

const ScheduleScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post("http://localhost:8000/getUserData", {
      token,
    });
    setName(response.data.data.name);
  }

  // Validation function
  const validateInputs = () => {
    if (!location.trim()) {
      setError("Please enter pickup address.");
      return false;
    }
    if (!date) {
      setError("Please select a date.");
      return false;
    }
    if (!time) {
      setError("Please select a time.");
      return false;
    }
    if (!weight.trim()) {
      setError("Please enter approximate waste weight.");
      return false;
    }
    if (isNaN(weight) || parseFloat(weight) <= 0) {
      setError("Please enter a valid weight (greater than 0).");
      return false;
    }
    setError("");
    return true;
  };

  const handleSchedule = async () => {
    if (validateInputs()) {
      try {
        // const response = await axios.post(
        //   "http://localhost:8000/createPickup",
        //   {
        //     name,
        //     location,
        //     date,
        //     time,
        //     weight,
        //   }
        // );
        // console.log(response.data);
        navigation.navigate("Success");
      } catch (error) {
        console.error("Error scheduling pickup:", error);
      }
    }
  };

  // Function to perform geocoding
  const geocodeLocation = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        console.log(lat);
        console.log(lng);
      } else {
        setError("Could not find coordinates for the selected address.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      setError("Error geocoding address. Please try again.");
    }
  };
  const handlePlaceSelect = (data, details = null) => {
    setLocation(data.description);
    geocodeLocation(data.description);
  };

  return (
    <View style={styles.container}>
      {/* Pickup Address Input */}
      <Text style={styles.label}>Pickup Address</Text>

      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelect}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        styles={{
          container: {
            flex: 0,
          },
          listView: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
          },
          poweredContainer: {
            display: "none",
          },
        }}
      />

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

      {/* Display validation error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Schedule Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Confirm Schedule" onPress={handleSchedule} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
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
