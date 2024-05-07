import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

// Import screens and navigation components
import Tabs from "./tabs";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import SuccessScheduleScreen from "../screens/SuccessScheduleScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import RecycleCenterLocatorScreen from "../screens/RecycleCenterLocatorScreen";
import LoginScreen from "../screens/LoginScreen";

import { useLogin } from "../context/LoginProvider";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import DriverMapScreen from "../screens/DriverMapScreen";
import FindingDriverScreen from "../screens/FindingDriverScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={Tabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Pickup" component={ScheduleScreen} />
      <Stack.Screen name="Success" component={SuccessScheduleScreen} />
      <Stack.Screen
        name="Nearest Center"
        component={RecycleCenterLocatorScreen}
      />
      <Stack.Screen name="FindingDriver" component={FindingDriverScreen} />

      <Stack.Screen name="DriverMap" component={DriverMapScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
