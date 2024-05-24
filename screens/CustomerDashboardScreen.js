import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import BalanceCard from "../components/Dashboard/BalanceCard";
import NotificationModal from "../components/Dashboard/NotificationModal";
import Colors from "../constants/Colors";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import useSocket from "../hooks/useSocket";
import { fetchUserData } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomerDashboardScreen() {
  const navigation = useNavigation();
  const { user, setUser, logout } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const socket = useSocket();

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchUserData();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        await logout();
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("join", { userId: user._id });

      socket.on("pickupAccepted", (data) => {
        setNotification(data.message);
      });

      socket.on("pickupOnTheWay", (data) => {
        setNotification(data.message);
      });

      socket.on("pickupArrived", (data) => {
        setNotification(data.message);
      });

      socket.on("pickupCompleted", (data) => {
        setNotification(data.message);
      });

      return () => {
        socket.off("pickupAccepted");
        socket.off("pickupOnTheWay");
        socket.off("pickupArrived");
        socket.off("pickupCompleted");
      };
    }
  }, [user, socket]);

  const closeModal = () => {
    setNotification(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const userData = await fetchUserData(token);
        console.log("User data:", userData);
        setUser(userData);
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      Alert.alert("Error", "Failed to refresh user data");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (!user) {
    return null; // Optionally render a placeholder or nothing
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={[Colors.gradientOne, Colors.gradientTwo]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      />
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <MaterialIcons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.greetingUserText}>Hi {user?.name || ""}!</Text>
          <Text style={styles.greetingText}>Let's clean our environment</Text>
        </View>
        {user ? (
          <BalanceCard points={user.points} />
        ) : (
          <Text style={styles.errorText}>Failed to load user data</Text>
        )}
        <View style={styles.buttonContainer}>
          <DashboardButton
            icon={<FontAwesome5 name="recycle" size={24} color="white" />}
            text="Book a pickup"
            onPress={() => navigation.navigate("Schedule Pickup")}
          />
          <DashboardButton
            icon={<MaterialIcons name="place" size={24} color="white" />}
            text="Nearest Center"
            onPress={() => navigation.navigate("RecycleCenterLocator")}
          />
        </View>
        <Guide />
      </View>

      <NotificationModal notification={notification} closeModal={closeModal} />
    </ScrollView>
  );
}

const DashboardButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.buttonContent}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const Guide = () => (
  <View style={styles.guideContainer}>
    <Text style={styles.guideTitle}>How it Works</Text>
    <GuideStep
      image={require("../assets/images/calendar.png")}
      title="Make a schedule"
      details="Fill in your address and pickup time."
    />
    <Separator />
    <GuideStep
      image={require("../assets/images/truck.png")}
      title="We will collect it"
      details="The collector will collect it from your home."
    />
    <Separator />
    <GuideStep
      image={require("../assets/images/star.png")}
      title="You get KitaPoints!"
      details="Earn rewards for your contribution."
    />
  </View>
);

const GuideStep = ({ image, title, details }) => (
  <View style={styles.stepContainer}>
    <Image source={image} style={styles.stepImage} />
    <View style={styles.stepContent}>
      <Text style={styles.stepText}>{title}</Text>
      <Text style={styles.stepDetails}>{details}</Text>
    </View>
  </View>
);

const Separator = () => <View style={styles.separator} />;

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
    justifyContent: "flex-end",
    backgroundColor: Colors.primary,
  },
  notificationIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2000,
  },
  greetingContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
    position: "relative",
    width: "100%",
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
  errorText: {
    color: "red",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CustomerDashboardScreen;
