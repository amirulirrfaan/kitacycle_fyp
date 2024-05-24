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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import GOOGLE_API_KEY from "../google_api_key";
import Colors from "../constants/Colors";

const RecycleCenterLocatorScreen = () => {
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
      >
        <MapViewDirections
          origin={initialRegion}
          destination={markers[0].coordinate}
          strokeWidth={3}
          apikey={GOOGLE_API_KEY}
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            distance={marker.distance + "km"}
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
        <FlatList
          data={markers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
});
