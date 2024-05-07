import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginProvider, { useLogin } from "./context/LoginProvider";
import MainNavigator from "./navigation/mainNavigator";

const InitializeLoginStatus = () => {
  const { setIsLoggedIn } = useLogin();

  useEffect(() => {
    // Check if the user is logged in
    const checkLoggedIn = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  return null;
};

export default function App() {
  return (
    <LoginProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <InitializeLoginStatus />
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </LoginProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
