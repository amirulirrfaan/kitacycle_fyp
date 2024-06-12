import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import WaveAnimation from "../components/WaveAnimation";
import Colors from "../constants/Colors";
import axios from "axios";

const statistics = [
  {
    id: "1",
    fact: "Recycling one ton of paper saves 17 trees.",
  },
  {
    id: "2",
    fact: "Recycling plastic saves twice as much energy as burning it in an incinerator.",
  },
  {
    id: "3",
    fact: "Recycling one aluminum can saves enough energy to run a TV for three hours.",
  },
  {
    id: "4",
    fact: "Glass can be recycled indefinitely without losing quality.",
  },
  {
    id: "5",
    fact: "Aluminum cans can be recycled and back on the shelf in just 60 days.",
  },
  {
    id: "6",
    fact: "Every ton of recycled steel saves 2,500 pounds of iron ore.",
  },
  {
    id: "7",
    fact: "Recycling a single plastic bottle can conserve enough energy to light a 60-watt bulb for up to 6 hours.",
  },
  {
    id: "8",
    fact: "Up to 80% of a vehicle can be recycled.",
  },
  {
    id: "9",
    fact: "Recycling paper produces 73% less air pollution than producing new paper from raw materials.",
  },
  {
    id: "10",
    fact: "Over 60% of the trash that ends up in the dustbin could be recycled.",
  },
];

const LearnScreen = () => {
  const navigation = useNavigation();
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [collectionItems, setCollectionItems] = useState([]);
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change the statistic
        setCurrentStatIndex((prevIndex) => (prevIndex + 1) % statistics.length);
        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fadeAnim]);

  const fetchCollectionItems = async () => {
    try {
      const response = await axios.get(
        "https://kitacycle-backend.onrender.com/getItem"
      );
      setCollectionItems(response.data);
    } catch (error) {
      console.error("Error fetching collection items:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://kitacycle-backend.onrender.com/articles"
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchCollectionItems();
    fetchArticles();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCollectionItems();
    await fetchArticles();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.waveContainer}>
          <WaveAnimation style={styles.wave} />
        </View>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Do you know?</Text>
            <Animated.View style={{ ...styles.statCard, opacity: fadeAnim }}>
              <Text style={styles.statText}>
                {statistics[currentStatIndex].fact}
              </Text>
              <FontAwesome
                name="info-circle"
                size={50}
                color={Colors.primary}
                style={styles.infoIcon}
              />
            </Animated.View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.squareButton}
                onPress={() => navigation.navigate("RecyclingGuide")}
              >
                <FontAwesome name="book" size={40} color={Colors.primary} />
                <Text style={styles.squareButtonText}>Guide</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.squareButton}
                onPress={() => navigation.navigate("Quiz")}
              >
                <FontAwesome
                  name="question-circle"
                  size={40}
                  color={Colors.primary}
                />
                <Text style={styles.squareButtonText}>Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Recycling Articles</Text>
            <FlatList
              data={articles}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.articleCard}
                  onPress={() => {
                    navigation.navigate("Article", item);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.articleImage}
                  />
                  <Text style={styles.articleTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.articleList}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>What We Collect</Text>
            <View style={styles.collectionContainer}>
              {collectionItems.map((item) => (
                <View key={item._id} style={styles.collectionItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.collectionImage}
                  />
                  <Text style={styles.collectionText}>{item.name}</Text>
                  <Text style={styles.collectionText}>RM{item.price}/kg</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waveContainer: {
    position: "absolute",
    top: -60,
    width: "100%",
    zIndex: -1,
  },
  wave: {
    width: "100%",
    height: 200,
  },
  scrollContainer: {
    paddingTop: 180,
  },
  content: {
    paddingHorizontal: 20,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  squareButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  squareButtonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
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
  statCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 15,
    height: 100,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  infoIcon: {
    marginLeft: 10,
  },
  collectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  collectionItem: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  collectionImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  collectionText: {
    marginTop: 5,
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },
  leaderboardCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  leaderboardPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default LearnScreen;
