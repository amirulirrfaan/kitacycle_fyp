import { StyleSheet, View, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tabs from "./navigation/tabs";
import CustomerDashboardScreen from "./screens/CustomerDashboardScreen";
import RecycleItemPriceScreen from "./screens/RecycleItemPriceScreen";
import SuccessScheduleScreen from "./screens/SuccessScheduleScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import Colors from "./constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={StackNavigator}
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
        component={ScheduleScreen}
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
        name="Rewards"
        component={CustomerDashboardScreen}
        options={{
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
}

// function StackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={CustomerDashboardScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Pickup" component={ScheduleScreen} />
//       <Stack.Screen name="Success" component={SuccessScheduleScreen} />
//     </Stack.Navigator>
//   );
// }

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={CustomerDashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Pickup" component={ScheduleScreen} />
          <Stack.Screen name="Success" component={SuccessScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
