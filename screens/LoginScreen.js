import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useLogin } from "../context/LoginProvider";
import Colors from "../constants/Colors"; // Ensure you import Colors if you are using it

function LoginScreen({ navigation }) {
  const { login, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email && !password) {
      Alert.alert("Input Required", "Please enter your email and password.");
      return false;
    }
    if (!email) {
      Alert.alert("Input Required", "Please enter your email.");
      return false;
    }
    if (!password) {
      Alert.alert("Input Required", "Please enter your password.");
      return false;
    }
    return true;
  };

  const handleLoginPress = async () => {
    if (!validateInputs()) return;

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/KitaCycle.png")}
          style={styles.logo}
          resizeMode="fit"
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
        <ActivityIndicator size="large" color={Colors.primary} />
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
    width: "70%",
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
    marginBottom: 10,
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
