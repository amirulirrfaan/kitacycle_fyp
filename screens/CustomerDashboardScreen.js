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
  Dimensions,
  FlatList,
} from "react-native";
import BalanceCard from "../components/Dashboard/BalanceCard";
import NotificationModal from "../components/Dashboard/NotificationModal";
import Colors from "../constants/Colors";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import useSocket from "../hooks/useSocket";
import { fetchUserData, fetchLeaderboardData } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WaveAnimation from "../components/WaveAnimation";

const { width: screenWidth } = Dimensions.get("window");

function CustomerDashboardScreen() {
  const navigation = useNavigation();
  const { user, setUser, logout } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const socket = useSocket();

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchUserData();
        await fetchLeaderboard();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        await logout();
      }
    };
    initialize();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const leaderboardData = await fetchLeaderboardData();
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

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
        setUser(userData);
      } else {
        console.error("No token found");
      }
      await fetchLeaderboard();
    } catch (error) {
      console.error("Error refreshing data:", error);
      Alert.alert("Error", "Failed to refresh data");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.waveHeader}></View>
        <WaveAnimation style={styles.wave} />
      </View>

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

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          {leaderboard.map((entry) => (
            <View key={entry._id} style={styles.leaderboardCard}>
              <Text style={styles.leaderboardName}>{entry.name}</Text>
              <Text style={styles.leaderboardPoints}>
                {entry.points} points
              </Text>
            </View>
          ))}
        </View>
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
  leaderboardSection: {
    marginTop: 20,
    width: "100%",
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  leaderboardCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  leaderboardPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default CustomerDashboardScreen;
