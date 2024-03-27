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
  handleLoginPress = () => {
    navigation.navigate("Dashboard");
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

        <TextInput style={styles.input} placeholder="Email" />

        <TextInput style={styles.input} placeholder="Password" />

        <TouchableOpacity>
          <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
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
