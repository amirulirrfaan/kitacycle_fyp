import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const VerifyEmailScreen = ({ route }) => {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleVerifyPress = async () => {
    if (!verificationCode) {
      Alert.alert("Validation Error", "Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://172.20.10.14:8000/verifyEmail",
        {
          email,
          verificationCode,
        }
      );
      Alert.alert("Verification Successful", "Your account has been verified.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Verification error: ", error.message);
      Alert.alert(
        "Verification Failed",
        error.response?.data?.message ||
          "An error occurred during verification."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PrimaryButton title="Verify" onPress={handleVerifyPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default VerifyEmailScreen;
