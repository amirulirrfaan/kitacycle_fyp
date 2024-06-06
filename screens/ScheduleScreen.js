import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DatePicker from "../components/Schedule/DatePicker";
import TimePicker from "../components/Schedule/TimeInput";
import axios from "axios";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_API_KEY from "../google_api_key";

const ScheduleScreen = ({ onValidate, onSchedule }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleGetCurrentLocation = async (value) => {
    setUseCurrentLocation(value);
    if (value) {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          setUseCurrentLocation(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setCoordinates({ type: "Point", coordinates: [longitude, latitude] });

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        );

        const formattedAddress = response.data.results[0].formatted_address;
        setAddress(formattedAddress);
        Alert.alert("Location obtained", `Address: ${formattedAddress}`);
      } catch (error) {
        Alert.alert("Error", "Failed to get current location");
        setUseCurrentLocation(false);
      }
    } else {
      setCoordinates(null);
      setAddress("");
    }
  };

  useEffect(() => {
    const isValid = !!coordinates && !!address && !!date && !!time;
    onValidate(isValid);
    onSchedule(date, time, coordinates, address);
  }, [coordinates, address, date, time, onValidate, onSchedule]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Pickup Address</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Use Current Location</Text>
          <Switch
            value={useCurrentLocation}
            onValueChange={handleGetCurrentLocation}
          />
        </View>
        {!useCurrentLocation && (
          <GooglePlacesAutocomplete
            placeholder="Search for an address"
            fetchDetails={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              setAddress(details.formatted_address);
              const location = details.geometry.location;
              setCoordinates({
                type: "Point",
                coordinates: [location.lng, location.lat],
              });
              Alert.alert(
                "Address Selected",
                `Lat: ${location.lat}, Lon: ${location.lng}`
              );
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            styles={{
              textInput: styles.input,
              container: { flex: 0 },
              listView: { backgroundColor: "#fff" },
            }}
          />
        )}

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
              label="Select Date"
              value={date}
              onDateChange={(selectedDate) => setDate(selectedDate)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time</Text>
            <TimePicker
              label="Select Time"
              value={time}
              onTimeChange={(selectedTime) => setTime(selectedTime)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default ScheduleScreen;
