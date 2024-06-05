import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors"; // Assuming you have a Colors file for your color constants
import { useLogin } from "../context/LoginProvider";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const RewardsTab = () => {
  const { user, setUser } = useLogin();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const bottomSheetRef = useRef(null);
  const confettiAnimation = useRef(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://kitacycle-backend.onrender.com/rewards/all"
      );
      console.log("Fetched rewards data:", response.data);
      setRewards(response.data.rewards);
    } catch (error) {
      console.error("Error fetching rewards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRewards();
    setRefreshing(false);
  };

  const handleRedeemReward = async () => {
    if (user.points < selectedReward.cost) {
      Alert.alert(
        "Insufficient Balance",
        "You do not have enough points to redeem this reward."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://kitacycle-backend.onrender.com/redeemReward",
        {
          userId: user._id,
          rewardId: selectedReward._id,
        }
      );

      if (response.data.message === "Reward redeemed successfully.") {
        console.log(
          `Redeemed reward with ID: ${selectedReward._id} for ${selectedReward.cost} points`
        );
        // Update UI or state to reflect the new points and redeemed reward
        setUser({ ...user, points: response.data.points });
        bottomSheetRef.current?.close();
        setShowConfetti(true);
        confettiAnimation.current.play();
        setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
        await fetchRewards(); // Refresh rewards list if necessary
      } else {
        console.error("Failed to redeem reward:", response.data.message);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  const renderRewardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rewardContainer}
      onPress={() => {
        setSelectedReward(item);
        bottomSheetRef.current?.expand();
      }}
    >
      <Image source={{ uri: item.image }} style={styles.rewardImage} />
      <View style={styles.rewardDetails}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
        <View style={styles.rewardFooter}>
          <Text style={styles.rewardCost}>{item.cost} pts</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const smallHeaderTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  const headerTitleTransform = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.FlatList
        data={rewards}
        keyExtractor={(item) => item._id}
        renderItem={renderRewardItem}
        contentContainerStyle={styles.listContentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={[Colors.gradientOne, Colors.gradientTwo]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Animated.View
            style={{
              opacity: headerTitleOpacity,
              transform: [{ translateY: headerTitleTransform }],
              alignItems: "center",
            }}
          >
            <Text style={styles.headerText}>KitaPoints</Text>
            <Text style={styles.pointsText}>Current Points</Text>
            <Text style={styles.pointsValue}>{user.points}</Text>
          </Animated.View>
          <Animated.View
            style={{
              opacity: smallHeaderTitleOpacity,
              position: "absolute",
              bottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.smallPointsValue}>{user.points} KP</Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <BottomSheet ref={bottomSheetRef} snapPoints={["50%", "70%"]} index={-1}>
        {selectedReward && (
          <View style={styles.bottomSheetContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => bottomSheetRef.current?.close()}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedReward.image }}
              style={styles.rewardImageLarge}
            />
            <Text style={styles.rewardTitle}>{selectedReward.title}</Text>
            <Text style={styles.rewardDescription}>
              {selectedReward.description}
            </Text>
            <Text style={styles.rewardCost}>{selectedReward.cost} pts</Text>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={handleRedeemReward}
            >
              <Text style={styles.buttonText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>

      {showConfetti && (
        <LottieView
          ref={confettiAnimation}
          source={require("../assets/animations/confetti.json")}
          autoPlay={true}
          loop={false}
          style={styles.confetti}
        />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pointsText: {
    color: "#fff",
    fontSize: 16,
  },
  pointsValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  smallPointsValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContentContainer: {
    paddingTop: HEADER_MAX_HEIGHT + 20,
    paddingHorizontal: 20,
  },
  rewardContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  rewardImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  rewardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardCost: {
    fontSize: 16,
    fontWeight: "bold",
  },
  redeemButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  confetti: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default RewardsTab;
