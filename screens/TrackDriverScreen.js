import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

export default function TrackDriverScreen() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  useEffect(() => {
    // This effect will open the bottom sheet when the component mounts
    setIsBottomSheetOpen(true);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Dummy data for driver details
  const driver = {
    name: "John Doe",
    vehicle: "Truck",
    plateNumber: "ABC123",
    eta: "10 minutes",
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isOpen={isBottomSheetOpen}>
        {(onScrollEndDrag) => (
          <ScrollView onScrollEndDrag={onScrollEndDrag}>
            <View style={styles.content}>
              <Text style={styles.heading}>Your Driver is on the way!</Text>
              <Text style={styles.text}>Driver Name: {driver.name}</Text>
              <Text style={styles.text}>Vehicle: {driver.vehicle}</Text>
              <Text style={styles.text}>
                Plate Number: {driver.plateNumber}
              </Text>
              <Text style={styles.text}>ETA: {driver.eta}</Text>
            </View>
          </ScrollView>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
