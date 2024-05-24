import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useLogin } from "../context/LoginProvider";

function LoginScreen({ navigation }) {
  const { login, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert(
        "Validation Error",
        "Please fill in both email and password."
      );
      return false;
    }
    return true;
  };

  const handleLoginPress = async () => {
    if (!validateInputs()) return;

    try {
      await login(email, password);
    } catch (error) {
      console.log("Login error: ", error.message);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.createAccountLink}
            onPress={() => navigation.navigate("Register")}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PrimaryButton title="Login" onPress={handleLoginPress} />
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
  content: {
    width: "60%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 150,
    marginBottom: 5,
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
  },
  forgotPasswordLink: {
    color: "black",
    marginBottom: 10,
  },
  createAccountLink: {
    color: "black",
    marginBottom: 10,
  },
});

export default LoginScreen;
