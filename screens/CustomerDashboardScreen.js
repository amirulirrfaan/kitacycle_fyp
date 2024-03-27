import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BalanceCard from "../components/Dashboard/BalanceCard";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function CustomerDashboardScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={[Colors.gradientOne, Colors.gradientTwo]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      ></LinearGradient>

      <View style={styles.container}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingUserText}>Hi Irfan!</Text>
          <Text style={styles.greetingText}>Let's clean our environment</Text>
        </View>

        {/* Current Balance Card */}
        <BalanceCard />

        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Pickup")}
          >
            <View style={styles.buttonContent}>
              <FontAwesome5
                style={styles.icon}
                name="recycle"
                size={24}
                color="white"
              />
              <Text style={styles.text}>Book a pickup</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <MaterialIcons
                style={styles.icon}
                name="place"
                size={24}
                color="white"
              />
              <Text style={styles.text}>Nearest Center</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Guide */}
        <View style={styles.guideContainer}>
          <View>
            <Text style={styles.guideTitle}>How it Works</Text>
          </View>
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/images/calendar.png")}
              style={styles.stepImage}
            />
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>Make a schedule</Text>
              <Text style={styles.stepDetails}>
                Fill in your address and pickup time.
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/images/truck.png")}
              style={styles.stepImage}
            />
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>We will collect it</Text>
              <Text style={styles.stepDetails}>
                The collector will collect it from your home
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.stepContainer}>
            <Image
              source={require("../assets/images/star.png")}
              style={styles.stepImage}
            />
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>You get KitaPoints!</Text>
              <Text style={styles.stepDetails}>
                Earn rewards for your contribution.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    height: 200,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "stretch",
    justifyContent: "flex-end",
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 12,
  },
  greetingContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  greetingUserText: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  greetingText: {
    color: "white",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  buttonContent: {
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginBottom: 10,
  },
  guideContainer: {
    marginTop: 20,
    width: "100%",
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  stepText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepDetails: {
    color: Colors.grey,
  },
  stepContent: {
    marginLeft: 10,
  },
  separator: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default CustomerDashboardScreen;
