import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as Location from "expo-location";
import { markers } from "../assets/markers";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const FindingDriverScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const bottomSheetRef = useRef(null);

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <View style={styles.itemText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text style={styles.distance}>{item.distance} km</Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      ></MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundComponent={({ style }) => (
          <View style={[style, styles.bottomSheetBackground]} />
        )}
      >
        <View style={styles.bottomSheetContent}>
          {/* Driver Info*/}
          <View style={styles.driverInfoContainer}>
            <Text style={styles.driverInfoTitle}>Driver Information</Text>

            <View style={styles.driverDetails}>
              <View style={styles.driverTextContainer}>
                <Text style={styles.driverName}>Test</Text>
              </View>
            </View>
          </View>

          {/* ETA (Estimated Time of Arrival) */}
          <View style={styles.etaContainer}>
            <Text style={styles.etaTitle}>ETA</Text>
            <Text style={styles.etaTime}>2</Text>
          </View>

          {/* Status */}
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>Status</Text>
            <Text style={styles.additionalInfoText}>On the way</Text>
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default FindingDriverScreen;

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
  },
  distance: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
    padding: 20,
  },
  driverInfoContainer: {
    marginBottom: 20,
  },
  driverInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  driverDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverTextContainer: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
  },
  etaContainer: {
    marginBottom: 20,
  },
  etaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  etaTime: {
    fontSize: 16,
  },
  additionalInfoContainer: {},
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 16,
  },
});
