import React, { useState, useEffect, useRef, useCallback } from "react";
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
  FlatList,
  Dimensions,
  Modal,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { useLogin } from "../context/LoginProvider";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const { width } = Dimensions.get("window");

const RewardsScreen = () => {
  const { user, setUser } = useLogin();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [rewards, setRewards] = useState([]);
  const [myRewards, setMyRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showClaimedModal, setShowClaimedModal] = useState(false);
  const bottomSheetRef = useRef(null);
  const confettiAnimation = useRef(null);

  useEffect(() => {
    fetchRewards();
    fetchMyRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://kitacycle-backend.onrender.com/rewards/all"
      );
      setRewards(response.data.rewards);
    } catch (error) {
      console.error("Error fetching rewards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://172.20.10.14:8000/${user._id}/getUserRewards`
      );
      setMyRewards(response.data.rewards);
    } catch (error) {
      console.error("Error fetching my rewards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRewards();
    await fetchMyRewards();
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
        "http://172.20.10.14:8000/rewards/redeemReward",
        {
          userId: user._id,
          rewardId: selectedReward._id,
        }
      );

      if (response.data.message === "Reward redeemed successfully.") {
        setUser((prevUser) => ({
          ...prevUser,
          points: response.data.points,
        }));
        setMyRewards((prevRewards) => [...prevRewards, selectedReward]);
        setShowClaimedModal(true);
        setTimeout(() => {
          bottomSheetRef.current?.close();
        }, 3000);
      } else {
        console.error("Failed to redeem reward:", response.data.message);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  const renderRewardItem = useCallback(
    ({ item }) => {
      const isClaimed = myRewards.some((reward) => reward._id === item._id);
      return (
        <TouchableOpacity
          style={[
            styles.rewardContainer,
            isClaimed && styles.claimedRewardContainer,
          ]}
          onPress={() => {
            if (!isClaimed) {
              setSelectedReward(item);
              bottomSheetRef.current?.expand();
            }
          }}
          disabled={isClaimed}
        >
          <Image source={{ uri: item.image }} style={styles.rewardImage} />
          <View style={styles.rewardDetails}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <View style={styles.rewardFooter}>
              <Text style={styles.rewardCost}>{item.cost} pts</Text>
              {isClaimed && <Text style={styles.claimedText}>Claimed</Text>}
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [myRewards]
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
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingTop: HEADER_MAX_HEIGHT + 20 },
        ]}
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
        <ImageBackground
          source={require("../assets/images/cardBg.jpg")}
          style={styles.imageBackground}
        >
          <View style={styles.gradient}>
            <Animated.View
              style={{
                opacity: headerTitleOpacity,
                transform: [{ translateY: headerTitleTransform }],
                alignItems: "center",
              }}
            >
              <Text style={styles.headerText}>🌟 KitaPoints</Text>
              <Text style={styles.pointsValue}>{user.points} PTS</Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: smallHeaderTitleOpacity,
                position: "absolute",
                alignItems: "center",
              }}
            >
              <Text style={styles.smallPointsValue}>{user.points} PTS</Text>
            </Animated.View>
          </View>
        </ImageBackground>
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
            <Text style={styles.rewardCost}>{selectedReward.cost} points</Text>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={handleRedeemReward}
            >
              <Text style={styles.buttonText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>

      <Modal
        transparent={true}
        visible={showClaimedModal}
        onRequestClose={() => setShowClaimedModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <LottieView
              ref={confettiAnimation}
              source={require("../assets/animations/successConfetti.json")}
              autoPlay={true}
              loop={false}
              style={styles.confetti}
            />
            <Text style={styles.modalTitle}>Reward Claimed!</Text>
            <Text style={styles.modalMessage}>
              You have successfully claimed the reward.
            </Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowClaimedModal(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const MyRewardsScreen = () => {
  const { user } = useLogin();
  const [myRewards, setMyRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMyRewards();
  }, []);

  const fetchMyRewards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://172.20.10.14:8000/${user._id}/getUserRewards`
      );
      setMyRewards(response.data.rewards);
    } catch (error) {
      console.error("Error fetching my rewards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMyRewards();
    setRefreshing(false);
  };

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image source={{ uri: item.image }} style={styles.rewardImage} />
      <View style={styles.rewardDetails}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <FlatList
      data={myRewards}
      keyExtractor={(item) => item._id}
      renderItem={renderRewardItem}
      contentContainerStyle={[styles.listContentContainer, { paddingTop: 20 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  rewards: RewardsScreen,
  myRewards: MyRewardsScreen,
});

const RewardsTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "rewards", title: "Rewards" },
    { key: "myRewards", title: "My Rewards" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={styles.container}
    />
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 20,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 10,
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
    alignItems: "center",
    justifyContent: "center",
  },
  rewardContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: width - 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  claimedRewardContainer: {
    backgroundColor: "#e0e0e0",
  },
  rewardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  claimedText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
  },
  redeemButton: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
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
    width: 150,
    height: 150,
  },
  tabbar: {
    backgroundColor: "white",
  },
  indicator: {
    backgroundColor: Colors.primary,
  },
  tabLabel: {
    fontSize: 16,
    color: "#888",
  },
  focusedTabLabel: {
    color: Colors.primary,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "#fff",
  },
});

export default RewardsTab;
