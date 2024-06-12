import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import WaveAnimation from "../components/WaveAnimation";

const ProfileScreen = () => {
  const { setIsLoggedIn, user } = useLogin();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
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
      <View style={styles.header}>
        <View style={styles.waveHeader}></View>
        <WaveAnimation style={styles.wave} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileId}>ID: {user._id}</Text>
          <Text style={styles.profilePoints}>Points: {user.points}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
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

          <OptionItem onPress={handleLogout} icon="sign-out" text="Sign Out" />
        </View>
      </ScrollView>
    </View>
  );
};

const OptionItem = ({ icon, text, onPress, badge, value }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
      <Icon name={icon} size={20} style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
      {badge && <Text style={styles.badge}>{badge}</Text>}
      {value && <Text style={styles.value}>{value}</Text>}
      <Icon name="chevron-right" size={20} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: 100,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
  waveHeader: {
    height: "30%",
    backgroundColor: Colors.primary,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    transform: [{ translateY: -30 }],
    borderWidth: 2,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileId: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  profilePoints: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  quickAccessContainer: {
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 15,
    width: " 80%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  quickAccessButton: {
    alignItems: "center",
  },
  quickAccessText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
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
  badge: {
    backgroundColor: Colors.primary,
    color: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 10,
  },
});

export default ProfileScreen;
