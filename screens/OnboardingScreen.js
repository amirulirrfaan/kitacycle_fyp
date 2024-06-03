// OnboardingScreen.js
import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import Colors from "../constants/Colors";

const OnboardingScreen = ({ navigation }) => {
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={require("../assets/images/topShape.png")}
        style={styles.shape}
      />

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <LottieView
            source={require("../assets/animations/doorstepPickup.json")}
            autoPlay
            loop={true}
            style={styles.animation}
          />
          <Text style={styles.title}>Doorstep Waste Pickup</Text>
          <Text style={styles.text}>
            Sell your scrap and waste material. Get the best rate and doorstep
            waste pickup at your convenience time.
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <LottieView
            source={require("../assets/animations/rewards.json")}
            autoPlay
            loop={true}
            style={styles.animation}
          />
          <Text style={styles.title}>Earn Rewards</Text>
          <Text style={styles.text}>
            Earn rewards after every pickup. Use your rewards for discounts and
            offers.
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <LottieView
            source={require("../assets/animations/earth.json")}
            autoPlay
            loop={true}
            style={styles.animation}
          />
          <Text style={styles.title}>Save the Earth</Text>
          <Text style={styles.text}>
            Join us in our mission to make the world a better place by recycling
            and managing waste responsibly.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    width: "80%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  skipButton: {
    position: "absolute",
    top: 100,
    right: 20,
    zIndex: 1000,
    padding: 10,
  },
  skipButtonText: {
    color: "#888",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    width: "80%",
  },
  nextButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  dot: {
    backgroundColor: "#c4c4c4",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  animation: {
    width: "100%",
    height: 200,
  },
  shape: {
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
    zIndex: 1,
    resizeMode: "cover",
  },
});

export default OnboardingScreen;
