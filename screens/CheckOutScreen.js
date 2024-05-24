import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const CheckOutScreen = ({
  items,
  date,
  time,
  coordinates,
  address,
  totalPickupWeight,
}) => {
  // Filter out items with weight > 0
  const nonZeroWeightItems = items.filter((item) => item.weight > 0);

  // Format date and time
  const formatDate = (date) => {
    if (!date) return "No date selected";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    if (!time) return "No time selected";
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(time).toLocaleTimeString(undefined, options);
  };

  const formatCoordinates = (coordinates) => {
    if (!coordinates) return "No coordinates";
    return `Lat: ${coordinates.coordinates[1]}, Lon: ${coordinates.coordinates[0]}`;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Selected Items</Text>

      <View style={styles.itemsContainer}>
        {nonZeroWeightItems.map((item) => (
          <View style={styles.itemRow} key={item._id}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemWeight}>{item.weight} kg</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalWeight}>{totalPickupWeight} kg</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text style={styles.summaryText}>Date: {formatDate(date)}</Text>
        <Text style={styles.summaryText}>Time: {formatTime(time)}</Text>
        <Text style={styles.summaryText}>Address: {address}</Text>
        <Text style={styles.summaryText}>
          Coordinates: {formatCoordinates(coordinates)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemWeight: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalWeight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CheckOutScreen;
