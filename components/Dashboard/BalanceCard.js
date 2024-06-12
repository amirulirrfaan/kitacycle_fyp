import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Colors from "../../constants/Colors";

function BalanceCard(props) {
  const { points } = props;
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>KitaPoints</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{points}</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../../assets/images/recycleBg.png")}
        resizeMode="contain"
        style={styles.imageBackground}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
  },
  textContainer: {
    zIndex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  pointsContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignSelf: "center",
  },
  pointsText: {
    fontSize: 16,
    padding: 5,
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageBackground: {
    position: "absolute",
    width: "90%",
    height: "100%",
    right: -80,
    bottom: -20,
  },
});

export default BalanceCard;
