import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import GOOGLE_API_KEY from "../google_api_key";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const RecycleCenterLocatorScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [recycleCenters, setRecycleCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Set initialRegion based on user's location
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    const fetchRecycleCenters = async () => {
      try {
        const response = await axios.get(
          "https://kitacycle-backend.onrender.com/recycleCenter/all"
        );
        setRecycleCenters(response.data.recycleCenters);
      } catch (error) {
        console.error("Error fetching recycle centers: ", error);
      }
    };

    fetchRecycleCenters();
  }, []);

  const handleNavigation = (latitude, longitude) => {
    const url = `http://maps.google.com/maps?daddr=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
    fitToCoordinates(center);
  };

  const fitToCoordinates = (center) => {
    if (location && mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: center.coordinate.latitude,
            longitude: center.coordinate.longitude,
          },
        ],
        {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        }
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleCenterSelect(item)}
    >
      <View style={styles.itemInfo}>
        <View style={styles.itemText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text style={styles.distance}>{item.distance} km</Text>
      </View>
      <TouchableOpacity
        style={styles.navigateLinkContainer}
        onPress={() =>
          handleNavigation(item.coordinate.latitude, item.coordinate.longitude)
        }
      >
        <FontAwesome name="location-arrow" size={24} color={Colors.primary} />
        <Text style={styles.navigateLink}>Go to Location</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {selectedCenter && (
          <MapViewDirections
            origin={initialRegion}
            destination={selectedCenter.coordinate}
            strokeWidth={3}
            apikey={GOOGLE_API_KEY}
          />
        )}
        {recycleCenters.map((center) => (
          <Marker
            key={center._id}
            coordinate={center.coordinate}
            title={center.title}
            description={center.description}
          >
            <Image
              source={require("../assets/images/recyclingCenter.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={({ style }) => (
          <View style={[style, styles.bottomSheetBackground]} />
        )}
      >
        <BottomSheetFlatList
          data={recycleCenters}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default RecycleCenterLocatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: Colors.grey,
  },
  distance: {
    fontSize: 14,
    fontWeight: "bold",
  },
  navigateLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    width: 150,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
  navigateLink: {
    color: Colors.primary,
    marginLeft: 10,
  },
});
