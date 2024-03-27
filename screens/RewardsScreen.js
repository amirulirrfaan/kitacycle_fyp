import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";

const RewardsScreen = () => {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Free Coffee",
      points: 50,
      image: require("../assets/images/star.png"),
    },
    {
      id: 2,
      name: "Discount Voucher",
      points: 100,
      image: require("../assets/images/star.png"),
    },
    {
      id: 3,
      name: "Movie Ticket",
      points: 150,
      image: require("../assets/images/star.png"),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const renderRewardItem = ({ item }) => (
    <TouchableOpacity style={styles.rewardItem}>
      <Image source={item.image} style={styles.rewardImage} />
      <View style={styles.rewardDetails}>
        <Text style={styles.rewardName}>{item.name}</Text>
        <Text style={styles.rewardPoints}>{item.points} KitaPoints</Text>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimButtonText}>Claim</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search Rewards"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredRewards}
        renderItem={renderRewardItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.rewardList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  rewardList: {
    flex: 1,
  },
  rewardItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rewardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rewardPoints: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  claimButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  claimButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RewardsScreen;
