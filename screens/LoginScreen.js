import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useLogin } from "../context/LoginProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  handleLoginPress = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (res.data.success) {
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        setIsLoggedIn(true);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Failed", "An error occurred during login.");
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
      <PrimaryButton title="Login" onPress={() => handleLoginPress()} />
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
    textAlign: "auto",
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
