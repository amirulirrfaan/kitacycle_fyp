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
    image: "link_to_image",
  },
  {
    id: "2",
    title: "How Recycling Helps the Environment",
    image: "link_to_image",
  },
  {
    id: "3",
    title: "Recycling Tips for Beginners",
    image: "link_to_image",
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
          <Image source={{ uri: "link_to_image" }} style={styles.cardImage} />
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
          <Image source={{ uri: "link_to_image" }} style={styles.cardImage} />
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
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  articleList: {
    paddingHorizontal: 10,
  },
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LearnScreen;
