import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Colors from "../constants/Colors";

const RecyclingGuideScreen = () => {
  const guideSteps = [
    {
      title: "Step 1: Collection",
      description:
        "Collect recyclable materials from your home, office, or community.",
      image: "https://storage.googleapis.com/kitacycle/collection.png",
    },
    {
      title: "Step 2: Separation",
      description:
        "Separate materials into categories: paper, plastic, metal, and glass.",
      image: "https://storage.googleapis.com/kitacycle/seperate.png",
    },
    {
      title: "Step 3: Cleaning",
      description:
        "Clean the recyclable materials to remove any food or other contaminants.",
      image: "https://storage.googleapis.com/kitacycle/cleaning.png",
    },
    {
      title: "Step 4: Processing",
      description:
        "Process the materials by compacting them into bales or shredding them for easier handling.",
      image: "https://storage.googleapis.com/kitacycle/process.png",
    },
    {
      title: "Step 5: Transporting",
      description:
        "Transport the cleaned and processed materials to recycling facilities.",
      image: "https://storage.googleapis.com/kitacycle/transport.png",
    },
    {
      title: "Step 6: Manufacturing",
      description: "Recycled materials are used to manufacture new products.",
      image: "https://storage.googleapis.com/kitacycle/manufacture.png",
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {guideSteps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Image source={{ uri: step.image }} style={styles.stepImage} />
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  stepContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stepImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default RecyclingGuideScreen;
