import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";

// Get screen width
const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    itemName: "Plastic",
    pricePerKg: 2.5,
    image: require("../assets/RecycleItems/plastic.png"),
  },
  {
    id: 2,
    itemName: "Paper",
    pricePerKg: 1.8,
    image: require("../assets/RecycleItems/paper.png"),
  },
  {
    id: 3,
    itemName: "Glass ",
    pricePerKg: 3.0,
    image: require("../assets/RecycleItems/glass.png"),
  },
  {
    id: 4,
    itemName: "Can ",
    pricePerKg: 3.0,
    image: require("../assets/RecycleItems/can.png"),
  },
];

// SearchBar component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="  🔍 Search..."
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
    />
  );
};

const RecycleItemCard = ({ item }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.price}>
        Price per kg: ${item.pricePerKg.toFixed(2)}
      </Text>
    </TouchableOpacity>
  </View>
);

export default function RecycleItemPriceScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <RecycleItemCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchBar: {
    height: 40,
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: width / 2 - 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
    borderRadius: 8,
  },
  itemName: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    textAlign: "center",
    fontSize: 12,
  },
});
