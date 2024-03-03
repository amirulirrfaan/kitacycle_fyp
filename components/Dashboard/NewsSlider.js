import { View, Text, StyleSheet, FlatList } from "react-native";

const NewsData = [
  {
    id: "1",
    title: "Recycling Launches in City",
    content: "Lorem ipsum dolor sit amet.",
  },
  {
    id: "2",
    title: "New Recycling Study",
    content: "Pellentesque habitant morbi tristique senectus.",
  },
  {
    id: "3",
    title: "Local Cleanup Event",
    content: "Fusce sed felis at nunc ullamcorper.",
  },
];

const NewsItem = ({ title, content }) => (
  <View style={styles.newsItem}>
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{title}</Text>
      <Text style={styles.newsContent}>{content}</Text>
    </View>
  </View>
);

function NewsSlider() {
  return (
    /* News Feed */
    <View style={styles.newsContainer}>
      <FlatList
        data={NewsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem title={item.title} content={item.content} />
        )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    height: 170,
    marginVertical: 20,
  },
  newsItem: {
    marginRight: 10,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 150,
    width: 180,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsContent: {
    fontSize: 14,
  },
});

export default NewsSlider;
