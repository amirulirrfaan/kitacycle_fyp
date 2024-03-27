import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <LinearGradient
          colors={[Colors.gradientOne, Colors.gradientTwo]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        ></LinearGradient>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../assets/images/uncleRoger.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phoneNumber}>123-456-7890</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OptionItem icon="star" text="Points and Rewards" />
        <OptionItem icon="bell" text="Notifications" />
        <OptionItem icon="user" text="My Profile" />
        <OptionItem icon="lock" text="Change Password" />
        <OptionItem icon="sign-out" text="Logout" />
      </ScrollView>
    </View>
  );
};

const OptionItem = ({ icon, text }) => {
  return (
    <View style={styles.optionContainer}>
      <Icon name={icon} size={20} style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
      <Icon name="chevron-right" size={20} style={styles.arrowIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  header: {
    height: "50%",
    position: "absolute",
    width: "100%",
    backgroundColor: Colors.primary,
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
  },
  phoneNumber: {
    marginTop: 5,
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
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
