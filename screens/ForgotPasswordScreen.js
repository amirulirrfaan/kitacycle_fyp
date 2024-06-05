import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import Colors from "../constants/Colors";

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPasswordPress = async () => {
    if (!email) {
      Alert.alert("Input Required", "Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://kitacycle-backend.onrender.com/user/forgotPassword",
        { email }
      );
      Alert.alert("Success", "Password reset email sent.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <PrimaryButton
          title="Send Reset Email"
          onPress={handleForgotPasswordPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default ForgotPasswordScreen;
