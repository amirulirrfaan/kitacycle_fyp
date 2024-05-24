import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import GOOGLE_API_KEY from "../google_api_key";

const GOOGLE_MAPS_APIKEY = GOOGLE_API_KEY;

const CollectorTrackingScreen = () => {
  const route = useRoute();
  const { order } = route.params;
  const [location, setLocation] = useState(null);
  const [collectorLocation, setCollectorLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    };
    getLocation();
  }, []);

  useEffect(() => {
    // Simulate real-time collector location updates
    const interval = setInterval(() => {
      if (location) {
        setCollectorLocation({
          latitude: location.latitude + Math.random() * 0.01,
          longitude: location.longitude + Math.random() * 0.01,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [location]);

  if (!location || !collectorLocation) {
    return <Text>Loading map...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.coordinates[1],
          longitude: order.coordinates[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: order.coordinates[1],
            longitude: order.coordinates[0],
          }}
          title="Pickup Location"
        />
        <Marker
          coordinate={collectorLocation}
          title="Collector Location"
          pinColor="green"
        />
        <MapViewDirections
          origin={collectorLocation}
          destination={{
            latitude: order.coordinates[1],
            longitude: order.coordinates[0],
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.statusText}>Driver is on the way</Text>
        <View style={styles.driverInfo}>
          <Image
            source={{
              uri: order.collectorImage || "https://via.placeholder.com/50",
            }}
            style={styles.driverImage}
          />
          <View>
            <Text style={styles.driverName}>{order.collectorName}</Text>
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.detailLabel}>Waste Type</Text>
        <Text style={styles.detailValue}>{order.wasteType}</Text>
        <Text style={styles.detailLabel}>Pickup location</Text>
        <Text style={styles.detailValue}>{order.pickupLocation}</Text>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentText}>Payment</Text>
          <Text style={styles.paymentText}>${order.paymentAmount}</Text>
        </View>
        <Text style={styles.cardText}>
          Card: •••• {order.cardLastFourDigits}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  driverActions: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
  },
  detailValue: {
    fontSize: 16,
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  paymentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
  },
});

export default CollectorTrackingScreen;
