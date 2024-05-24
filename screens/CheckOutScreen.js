import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";

const CheckOutScreen = ({
  items,
  date,
  time,
  coordinates,
  address,
  clientSecret,
  onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [showCardField, setShowCardField] = useState(false);
  const { confirmPayment } = useStripe();

  // Filter out items with weight > 0
  const nonZeroWeightItems = items.filter((item) => item.weight > 0);

  // Calculate total weight
  const totalWeight = nonZeroWeightItems.reduce((total, item) => {
    return total + item.weight;
  }, 0);

  // Format date and time
  const formatDate = (date) => {
    if (!date) return "No date selected";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    if (!time) return "No time selected";
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(time).toLocaleTimeString(undefined, options);
  };

  const formatCoordinates = (coordinates) => {
    if (!coordinates) return "No coordinates";
    return `Lat: ${coordinates.coordinates[1]}, Lon: ${coordinates.coordinates[0]}`;
  };

  const handlePayPress = async () => {
    setLoading(true);
    try {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: {
          /* Add any required billing details */
        },
      });

      if (error) {
        Alert.alert("Payment Failed", error.message);
      } else if (paymentIntent) {
        Alert.alert("Payment Successful", "Your payment was successful.");
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Payment error: ", error.message);
      Alert.alert("Payment Error", "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Selected Items</Text>

      <View style={styles.itemsContainer}>
        {nonZeroWeightItems.map((item) => (
          <View style={styles.itemRow} key={item.id}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemWeight}>{item.weight} kg</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalWeight}>{totalWeight} kg</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text style={styles.summaryText}>Date: {formatDate(date)}</Text>
        <Text style={styles.summaryText}>Time: {formatTime(time)}</Text>
        <Text style={styles.summaryText}>Address: {address}</Text>
        <Text style={styles.summaryText}>
          Coordinates: {formatCoordinates(coordinates)}
        </Text>
      </View>

      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.paymentMethodContainer}
          onPress={() => setShowCardField(true)}
        >
          <View style={styles.paymentMethodTextContainer}>
            <Text style={styles.paymentMethodTitle}>Payment Method</Text>
            <Text style={styles.paymentMethodSubtitle}>
              Via Credit/Debit Card
            </Text>
          </View>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
        {showCardField && (
          <View style={styles.cardFieldContainer}>
            <CardForm
              postalCodeEnabled={true}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={styles.card}
              style={styles.cardContainer}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <PrimaryButton title="Pay" onPress={handlePayPress} />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemWeight: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalWeight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  paymentContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  paymentMethodTextContainer: {
    flexDirection: "column",
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  editIcon: {
    fontSize: 18,
    color: "#666",
  },
  cardFieldContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  },
  cardContainer: {
    height: 200, // Increased height for vertical layout
    marginVertical: 10,
  },
});

export default CheckOutScreen;
