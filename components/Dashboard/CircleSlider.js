import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

function CircleSlider() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ScrollView
      style={styles.sliderContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Recycle Center Locator */}
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <FontAwesome name="map-marker" size={24} color="white" />
        </View>
        <Text style={styles.circleText}>Recycle Center Locator</Text>
      </View>

      {/* Rewards */}
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <FontAwesome name="trophy" size={24} color="white" />
        </View>
        <Text style={styles.circleText}>Rewards</Text>
      </View>

      {/* Recycle Item */}
      <TouchableOpacity
        onPress={() => navigateToScreen("Recycle Item Price")}
        style={styles.circleContainer}
      >
        <View style={styles.circle}>
          <FontAwesome name="dollar" size={24} color="white" />
        </View>
        <Text style={styles.circleText}>Recycle Item Price</Text>
      </TouchableOpacity>

      {/* Sorting Guidelines */}
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <FontAwesome name="recycle" size={24} color="white" />
        </View>
        <Text style={styles.circleText}>Waste Sorting Guidelines</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    flexGrow: 0,
    flexShrink: 0,
  },
  circleContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  circleText: {
    fontSize: 12,
    color: "#818181",
    textAlign: "center",
    maxWidth: 70,
  },
});

export default CircleSlider;
