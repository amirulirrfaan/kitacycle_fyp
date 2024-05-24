import React from "react";
import LottieView from "lottie-react-native";

const ConfettiAnimation = ({ visible }) => {
  if (!visible) return null;

  return (
    <LottieView
      source={require("../../assets/animations/confetti.json")} // Ensure you have the confetti.json file in your assets
      autoPlay
      loop={false}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    />
  );
};

export default ConfettiAnimation;
