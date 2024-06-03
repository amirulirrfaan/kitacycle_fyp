import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomerDashboardScreen from "../screens/CustomerDashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RewardsScreen from "../screens/RewardsScreen";
import RecycleItemPriceScreen from "../screens/RecycleItemPriceScreen";
import PickupHistory from "../screens/PickupHistory";
import Colors from "../constants/Colors";
import LearnScreen from "../screens/LearnScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
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
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="star-outline"
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
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
        name="Pickups"
        component={PickupHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="calendar"
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
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
