import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native"; // Import SafeAreaView
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboardScreen from "./screens/CustomerDashboardScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import RecycleItemPriceScreen from "./screens/RecycleItemPriceScreen";
import SuccessScheduleScreen from "./screens/SuccessScheduleScreen";
import TrackDriverScreen from "./screens/TrackDriverScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkUser() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    checkUser();
  }, []);

  const LoginNav = () => {
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardNav} />
      </Stack.Navigator>
    );
  };

  const DashboardNav = () => {
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={CustomerDashboardScreen} />
        <Stack.Screen name="Login" component={LoginNav} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen
          name="Recycle Item Price"
          component={RecycleItemPriceScreen}
        />
        <Stack.Screen name="Success" component={SuccessScheduleScreen} />
        <Stack.Screen name="Track Driver" component={TrackDriverScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.rootScreen}>
        <NavigationContainer>
          {isLoggedIn ? <DashboardNav /> : <LoginNav />}
          <StatusBar style="auto" />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
  },
});
