import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboardScreen from "./screens/CustomerDashboardScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import RecycleItemPriceScreen from "./screens/RecycleItemPriceScreen";
import SuccessScheduleScreen from "./screens/SuccessScheduleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.rootScreen}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={CustomerDashboardScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen
            name="Recycle Item Price"
            component={RecycleItemPriceScreen}
          />
          <Stack.Screen name="Success" component={SuccessScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
