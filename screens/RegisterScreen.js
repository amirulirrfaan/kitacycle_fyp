import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [backendErrors, setBackendErrors] = useState({});

  const navigation = useNavigation();

  const validateInputs = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleRegisterPress = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setBackendErrors({});
    try {
      const response = await axios.post(
        "https://kitacycle-backend.onrender.com/register",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      console.log("Registration response:", response.data);
      navigation.navigate("VerifyEmail", { email });
    } catch (error) {
      console.error("Registration error: ", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {});
        setBackendErrors(errors);

        const errorMessages = Object.values(errors).join("\n");
        Alert.alert("Registration Failed", errorMessages);
      } else {
        Alert.alert(
          "Registration Failed",
          error.response?.data?.message ||
            "An error occurred during registration."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require("../assets/images/topShape.png")}
              style={styles.shape}
            />
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              {nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}

              {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title="Register"
                    onPress={handleRegisterPress}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shape: {
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 50,
    left: 30,
    alignSelf: "center",
    zIndex: 1000,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 150,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default RegisterScreen;
