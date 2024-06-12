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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import WaveAnimation from "../components/WaveAnimation";
import Colors from "../constants/Colors";
import axios from "axios"; // Ensure axios is installed

const articles = [
  {
    id: "1",
    title: "The Importance of Recycling",
    image: "https://storage.googleapis.com/kitacycle/important.png",
    content: `
      Recycling is crucial for the environment and helps conserve resources, reduce landfill waste, and lower greenhouse gas emissions. Here are some reasons why recycling is important:

      1. Conservation of Natural Resources:** Recycling reduces the need to extract, refine, and process raw materials, which helps conserve natural resources like timber, water, and minerals.
      2. Reduction of Pollution:** Recycling reduces the pollution caused by waste, as manufacturing products from recycled materials generally creates less pollution than making them from new raw materials.
      3. Energy Savings:** Recycling often requires less energy than producing new products from raw materials. For example, recycling aluminum saves up to 95% of the energy needed to produce new aluminum from bauxite ore.
      4. Economic Benefits:** Recycling can create jobs and stimulate economic growth. The recycling industry provides employment opportunities and contributes to the economy.
      5. Landfill Space:** Recycling helps reduce the amount of waste sent to landfills, thereby conserving space and reducing the environmental impact of landfills.

      By recycling, we can all contribute to a healthier and more sustainable planet.
    `,
  },
  {
    id: "2",
    title: "How Recycling Helps the Environment",
    image: "https://storage.googleapis.com/kitacycle/environment.png",
    content: `
      Recycling has a significant positive impact on the environment. Here's how:

      1.  Reduction of Greenhouse Gas Emissions: Recycling helps reduce the amount of waste sent to landfills and incinerators, which in turn reduces the greenhouse gases emitted from these sites.
      2.  Conservation of Resources: Recycling conserves natural resources such as water, minerals, and timber by reusing materials instead of extracting new raw materials.
      3.  Energy Conservation: Manufacturing products from recycled materials often requires less energy compared to using raw materials. For example, recycling paper saves about 65% of the energy needed to produce new paper.
      4.  Reduction in Pollution: Recycling reduces pollution by minimizing the need for extracting and processing raw materials, which can result in air and water pollution.
      5.  Wildlife Protection: Recycling helps preserve ecosystems and wildlife habitats by reducing the need for mining, logging, and other activities that disrupt natural environments.

      Overall, recycling is a simple yet effective way to protect the environment and promote sustainability.
    `,
  },
  {
    id: "3",
    title: "Recycling Tips for Beginners",
    image: "https://storage.googleapis.com/kitacycle/tips.png",
    content: `
      If you're new to recycling, here are some tips to help you get started:

      1. Understand What Can Be Recycled: Familiarize yourself with the materials that can be recycled in your area. Common recyclable items include paper, cardboard, glass, plastic bottles, and aluminum cans.
      2. Separate Your Waste: Set up separate bins for recyclable and non-recyclable waste. This will make it easier to sort your waste and ensure that recyclables are properly processed.
      3. Clean Your Recyclables: Rinse out any food or liquid containers before recycling them. Contaminated recyclables can spoil the entire batch and make it unusable.
      4. Check Local Guidelines: Recycling programs can vary by location, so check your local recycling guidelines to ensure you're following the correct procedures.
      5. Reduce and Reuse: In addition to recycling, try to reduce your waste by using reusable items like cloth bags, water bottles, and coffee cups.
      6. Stay Informed: Stay updated on recycling practices and guidelines in your area. Join local recycling programs or follow environmental organizations to learn more about sustainable living.

      By following these tips, you can make a positive impact on the environment and contribute to a more sustainable future.
    `,
  },
];

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

  useEffect(() => {
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

    fetchCollectionItems();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              keyExtractor={(item) => item.id}
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
