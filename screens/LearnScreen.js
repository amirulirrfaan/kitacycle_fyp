import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const articles = [
  {
    id: "1",
    title: "The Importance of Recycling",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    title: "How Recycling Helps the Environment",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    title: "Recycling Tips for Beginners",
    image: "https://via.placeholder.com/100",
  },
  // Add more articles as needed
];

const LearnScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learn About Recycling</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recycling Tips and Guides</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("HowToRecycle")}
        >
          <Text style={styles.cardTitle}>How to Recycle Properly</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        {/* Add more tips and guides */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Interactive Content</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Text style={styles.cardTitle}>Take a Recycling Quiz</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        {/* Add more interactive content */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recycling Articles</Text>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.articleCard}
              onPress={() => {
                // Handle article press
              }}
            >
              <Image source={{ uri: item.image }} style={styles.articleImage} />
              <Text style={styles.articleTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.articleList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#444",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  articleList: {
    paddingVertical: 10,
  },
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 180,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  articleImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444",
  },
});

export default LearnScreen;
