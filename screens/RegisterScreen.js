import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { useLogin } from "../context/LoginProvider";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setIsLoggedIn } = useLogin();

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Password validation - at least 6 characters
    return password.length >= 6;
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Basic phone number validation - optional, adjust as per your requirements
    return phoneNumber.length >= 10;
  };

  const handleRegisterPress = async () => {
    // Perform frontend validation
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(" Error", "Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(" Error", "Passwords do not match.");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        " Error",
        "Please enter a valid phone number (at least 10 digits)."
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      if (res.data.success) {
        Alert.alert("Registration Successful");
        navigation.navigate("Login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Registration Failed",
        "An error occurred during registration."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Your logo */}
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoCapitalize="none"
        />
      </View>
      <PrimaryButton title="Register" onPress={handleRegisterPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "60%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    textAlign: "auto",
  },
});

export default RegisterScreen;
