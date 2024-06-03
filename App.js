import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginProvider, { useLogin } from "./context/LoginProvider";
import MainNavigator from "./navigation/mainNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <StripeProvider publishableKey="pk_test_51PJfG705yUtdB5DnlLVAk3FiHnr049jde10ZPpHedZkW0HSwTA4uqAIzD5mjwzHmw9ZuBEePTKUDOgOCJsUuwlfO00vU3ZpyKN">
      <LoginProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeArea}>
            <GestureHandlerRootView>
              <NavigationContainer>
                <InitializeLoginStatus />
                <MainNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaView>
        </SafeAreaProvider>
      </LoginProvider>
    </StripeProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
