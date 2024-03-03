import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function LoginScreen({ navigation }) {
  const handleLoginPress = () => {
    console.log("Login button pressed");
  };

  const handleForgotPasswordPress = () => {
    console.log("Forgot password link pressed");
  };

  const handleCreateAccountPress = () => {
    console.log("Create new account link pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} placeholder="Email" />

        <TextInput style={styles.input} placeholder="Password" />

        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateAccountPress}>
          <Text style={styles.createAccountLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title="Login"
        onPress={() => navigation.navigate("Dashboard")}
      />
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
