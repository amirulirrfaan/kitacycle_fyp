import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { setIsLoggedIn, user } = useLogin();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Clear authentication and user state
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setIsLoggedIn(false);
      navigation.replace("Login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <LinearGradient
          colors={[Colors.gradientOne, Colors.gradientTwo]}
          style={styles.overlay}
        >
          <View style={styles.profileContent}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OptionItem
          onPress={handleEditProfile}
          icon="user"
          text="Edit Profile"
        />
        <OptionItem
          onPress={handleChangePassword}
          icon="lock"
          text="Change Password"
        />
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: "white",
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
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
