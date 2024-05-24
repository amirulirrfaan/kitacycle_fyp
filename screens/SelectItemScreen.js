import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";

const SelectItemScreen = ({ setSelectedItems }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Paper",
      price: 0.5,
      weight: 0,
      image: require("../assets/images/RecycleItems/paper.png"),
    },
    {
      id: 2,
      name: "Plastic",
      price: 0.3,
      weight: 0,
      image: require("../assets/images/RecycleItems/plastic.png"),
    },
    {
      id: 3,
      name: "Glass",
      price: 0.8,
      weight: 0,
      image: require("../assets/images/RecycleItems/glass.png"),
    },
    {
      id: 4,
      name: "Metal",
      price: 1.2,
      weight: 0,
      //   image: require("../assets/metal.jpg"),
    },
    {
      id: 5,
      name: "Cardboard",
      price: 0.4,
      weight: 0,
      //   image: require("../assets/cardboard.jpg"),
    },
    {
      id: 6,
      name: "Aluminum Cans",
      price: 1.5,
      weight: 0,
      image: require("../assets/images/RecycleItems/can.png"),
    },
    {
      id: 7,
      name: "Electronics",
      price: 2.0,
      weight: 0,
      //   image: require("../assets/electronics.jpg"),
    },
    {
      id: 8,
      name: "Batteries",
      price: 3.0,
      weight: 0,
      //   image: require("../assets/batteries.jpg"),
    },
    {
      id: 9,
      name: "Tires",
      price: 2.5,
      weight: 0,
      //   image: require("../assets/tires.jpg"),
    },
    {
      id: 10,
      name: "Clothing",
      price: 1.0,
      weight: 0,
      //   image: require("../assets/clothing.jpg"),
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>RM{item.price.toFixed(2)}/kg</Text>
        </View>
      </View>
      <View style={styles.weightContainer}>
        {/* Minus Button */}
        <TouchableOpacity
          onPress={() => handleWeightChange(item.id, item.weight - 1)}
          style={[styles.weightButton, { backgroundColor: Colors.grey }]}
        >
          <Text style={[styles.weightButtonText, { color: "white" }]}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.weightInput}
          keyboardType="numeric"
          value={item.weight.toString()}
          onChangeText={(text) =>
            handleWeightChange(item.id, text, item.weight)
          }
        />

        {/* Plus Button */}
        <TouchableOpacity
          onPress={() => handleWeightChange(item.id, item.weight + 1)}
          style={styles.weightButton}
        >
          <Text style={styles.weightButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleWeightChange = (itemId, newWeight) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, weight: newWeight < 0 ? 0 : newWeight }
        : item
    );
    setItems(updatedItems);
    setSelectedItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    // borderRadius: 25,
  },
  itemText: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: "#999",
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weightButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "blue",
    backgroundColor: Colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  weightButtonText: {
    color: Colors.primary,
  },
  weightInput: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default SelectItemScreen;
