import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";

const SelectItemScreen = ({ setSelectedItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://172.20.10.14:8000/getItem");
      const fetchedItems = response.data.map((item) => ({
        ...item,
        weight: 0,
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>RM{item.price.toFixed(2)}/kg</Text>
        </View>
      </View>
      <View style={styles.weightContainer}>
        <TouchableOpacity
          onPress={() => handleWeightChange(item._id, item.weight - 1)}
          style={[styles.weightButton, { backgroundColor: Colors.grey }]}
        >
          <Text style={[styles.weightButtonText, { color: "white" }]}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.weightInput}
          keyboardType="numeric"
          value={item.weight.toString()}
          onChangeText={(text) =>
            handleWeightChange(item._id, parseFloat(text))
          }
        />
        <TouchableOpacity
          onPress={() => handleWeightChange(item._id, item.weight + 1)}
          style={styles.weightButton}
        >
          <Text style={styles.weightButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleWeightChange = (itemId, newWeight) => {
    const updatedItems = items.map((item) =>
      item._id === itemId
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
        keyExtractor={(item) => item._id.toString()}
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
    borderRadius: 25,
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
