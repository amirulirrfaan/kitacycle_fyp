import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, ActivityIndicator } from "react-native";

// Import screens and navigation components
import Tabs from "./tabs";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import SuccessScheduleScreen from "../screens/SuccessScheduleScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import RecycleCenterLocatorScreen from "../screens/RecycleCenterLocatorScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import DriverMapScreen from "../screens/DriverMapScreen";
import FindingDriverScreen from "../screens/FindingDriverScreen";
import PickupFlowScreen from "../screens/PickupFlowScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CollectorTrackingScreen from "../screens/CollectorTrackingScreen";

import { useLogin } from "../context/LoginProvider";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />

    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Schedule Pickup" component={PickupFlowScreen} />
    <Stack.Screen name="Success" component={SuccessScheduleScreen} />
    <Stack.Screen
      name="RecycleCenterLocator"
      component={RecycleCenterLocatorScreen}
    />
    <Stack.Screen name="FindingDriver" component={FindingDriverScreen} />
    <Stack.Screen name="DriverMap" component={DriverMapScreen} />
    <Stack.Screen name="PickupFlow" component={PickupFlowScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen
      name="CollectorTracking"
      component={CollectorTrackingScreen}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { isLoggedIn, loading } = useLogin();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
