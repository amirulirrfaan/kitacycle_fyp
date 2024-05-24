import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  CardField,
  useStripe,
  StripeProvider,
} from "@stripe/stripe-react-native";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

const PaymentScreen = ({ route }) => {
  const { clientSecret } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();

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
        navigation.navigate("Success");
      }
    } catch (error) {
      console.error("Payment error: ", error.message);
      Alert.alert("Payment Error", "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey="sk_test_51PJfG705yUtdB5Dne1QiLQC5PCyrmLkdODKRxRv5l3BxZJxGd50BI9fqia85IwDSmawznV6qmZ6QpolC6fZvXDzy00FDPEJGcG">
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>
        <CardField
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
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default PaymentScreen;
