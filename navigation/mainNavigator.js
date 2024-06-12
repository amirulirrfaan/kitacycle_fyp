import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, ActivityIndicator } from "react-native";

// Import screens and navigation components
import Tabs from "./tabs";
import SuccessScheduleScreen from "../screens/SuccessScheduleScreen";
import RecycleCenterLocatorScreen from "../screens/RecycleCenterLocatorScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import DriverMapScreen from "../screens/DriverMapScreen";
import PickupFlowScreen from "../screens/PickupFlowScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CollectorTrackingScreen from "../screens/CollectorTrackingScreen";

import { useLogin } from "../context/LoginProvider";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import Colors from "../constants/Colors";
import HowToRecycleProperly from "../screens/HowToRecycleProperly";
import RecyclingQuiz from "../screens/RecyclingQuiz";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import RecyclingGuideScreen from "../screens/RecyclingGuideScreen";
import ArticleScreen from "../screens/ArticleScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontSize: 18,
      },
    }}
  >
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
    <Stack.Screen name="DriverMap" component={DriverMapScreen} />
    <Stack.Screen name="PickupFlow" component={PickupFlowScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen
      name="CollectorTracking"
      component={CollectorTrackingScreen}
    />
    <Stack.Screen name="RecyclingGuide" component={RecyclingGuideScreen} />
    <Stack.Screen name="Article" component={ArticleScreen} />

    <Stack.Screen name="Quiz" component={RecyclingQuiz} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { isLoggedIn, loading } = useLogin();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
