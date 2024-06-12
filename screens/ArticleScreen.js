import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Colors from "../constants/Colors";

const ArticleScreen = ({ route }) => {
  const { title, image, content } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    color: "#444",
  },
});

export default ArticleScreen;
