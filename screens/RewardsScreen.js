import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors"; // Assuming you have a Colors file for your color constants
import { useLogin } from "../context/LoginProvider";
import axios from "axios";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const RewardsTab = () => {
  const { user, setUser } = useLogin();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get("http://172.20.10.14:8000/getRewards");
        setRewards(response.data);
      } catch (error) {
        console.error("Error fetching rewards data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const handleRedeemReward = async (rewardId, cost) => {
    try {
      const response = await axios.post(
        "http://172.20.10.14:8000/redeemReward",
        {
          userId: user._id,
          rewardId,
        }
      );

      if (response.data.message === "Reward redeemed successfully.") {
        console.log(`Redeemed reward with ID: ${rewardId} for ${cost} points`);
        // Update UI or state to reflect the new points and redeemed reward
        setUser({ ...user, points: response.data.points });
      } else {
        console.error("Failed to redeem reward:", response.data.message);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image source={{ uri: item.image }} style={styles.rewardImage} />
      <View style={styles.rewardDetails}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
        <View style={styles.rewardFooter}>
          <Text style={styles.rewardCost}>{item.cost} pts</Text>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => handleRedeemReward(item._id, item.cost)}
          >
            <Text style={styles.buttonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    <View style={styles.container}>
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
    </View>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
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
});

export default RewardsTab;
