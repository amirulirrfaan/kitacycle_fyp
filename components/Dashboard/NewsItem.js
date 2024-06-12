import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const NewsItem = ({ image, title, date, description }) => {
  return (
    <View style={styles.newsItem}>
      <Image source={image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsDescription}>{description}</Text>
        <Text style={styles.newsDate}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newsItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    width: 170,
    marginHorizontal: 10,
  },
  newsImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  newsContent: {
    padding: 10,
  },
  newsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 12,
    color: "#666",
    // marginBottom: 5,
  },
  newsDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default NewsItem;
