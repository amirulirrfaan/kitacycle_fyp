import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const CheckOutScreen = ({
  items = [],
  date,
  time,
  address,
  totalPickupWeight,
  onPaymentSuccess,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const stripe = useStripe();

  const nonZeroWeightItems = items.filter((item) => item.weight > 0);

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

  const handlePaymentMethodSelect = async (method) => {
    setSelectedPaymentMethod(method);
    if (method === "credit_card") {
      try {
        // Fetch the payment intent client secret from your backend
        const response = await fetch(
          "http://172.20.10.14:8000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: totalPickupWeight * 50 }), // Example amount in cents
          }
        );

        const { clientSecret } = await response.json();

        // Initialize the payment sheet
        const { error } = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: "KitaCycle",
        });

        if (!error) {
          // Open the payment sheet
          const { error: paymentError } = await stripe.presentPaymentSheet();

          if (paymentError) {
            Alert.alert("Payment failed", paymentError.message);
          } else {
            setIsPaymentSuccessful(true);
            Alert.alert("Payment successful", "Your payment was successful!");
            onPaymentSuccess();
          }
        } else {
          Alert.alert("Error", error.message);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to initialize payment sheet");
      }
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
          <View style={styles.itemRow} key={item._id}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemWeight}>{item.weight} kg</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalWeight}>{totalPickupWeight} kg</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text style={styles.summaryText}>Date: {formatDate(date)}</Text>
        <Text style={styles.summaryText}>Time: {formatTime(time)}</Text>
        <Text style={styles.summaryText}>Address: {address}</Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[
            styles.cardOption,
            selectedPaymentMethod === "credit_card" && styles.selectedCard,
          ]}
          onPress={() => handlePaymentMethodSelect("credit_card")}
          disabled={isPaymentSuccessful}
        >
          <View style={styles.paymentOptionContainer}>
            <AntDesign
              name="creditcard"
              size={24}
              color="black"
              style={styles.cardIcon}
            />
            <Text style={styles.paymentText}>Credit / Debit Card</Text>
            {isPaymentSuccessful && (
              <AntDesign
                name="checkcircle"
                size={24}
                color={Colors.primary}
                style={{ marginLeft: 10 }}
              />
            )}
          </View>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentText: {
    fontSize: 16,
  },
  cardOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedCard: {
    borderColor: Colors.primary,
  },
  paymentOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    marginRight: 10,
  },
});

export default CheckOutScreen;
