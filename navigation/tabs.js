import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import RewardsScreen from "../screens/RewardsScreen";
import RecycleItemPriceScreen from "../screens/RecycleItemPriceScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerDashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={RecycleItemPriceScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="bulb-outline"
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="staro"
              size={24}
              color={focused ? Colors.primary : Colors.grey} // Change icon color based on focus
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-circle-o"
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
