import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useLogin } from "../context/LoginProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { setIsLoggedIn, user } = useLogin();

  const handleLogout = async () => {
    try {
      // Clear authentication and user state
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // Optionally, clear other relevant state
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <LinearGradient
          colors={[Colors.gradientOne, Colors.gradientTwo]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.profileContent}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../assets/images/uncleRoger.png")}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.phoneNumber}>123-456-7890</Text>
          </View>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OptionItem onPress={"te"} icon="clock-o" text="Pickup History" />
        <OptionItem onPress={"te"} icon="bell" text="Notifications" />
        <OptionItem onPress={"te"} icon="user" text="My Profile" />
        <OptionItem onPress={"te"} icon="lock" text="Change Password" />
        <OptionItem onPress={handleLogout} icon="sign-out" text="Logout" />
      </ScrollView>
    </View>
  );
};

const OptionItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
      <Icon name={icon} size={20} style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
      <Icon name="chevron-right" size={20} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  header: {
    flex: 1,
  },
  profileContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  phoneNumber: {
    marginTop: 5,
    fontSize: 16,
    color: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  icon: {
    marginRight: 15,
    color: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    color: "rgba(0,0,0,0.3)",
  },
});

export default ProfileScreen;
