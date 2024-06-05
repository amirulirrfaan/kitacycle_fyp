import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import axios from "axios";
import { useLogin } from "../context/LoginProvider";

const screenWidth = Dimensions.get("window").width;

const OrderItem = ({ order }) => {
  const navigation = useNavigation();

  const handleTrackCollector = () => {
    navigation.navigate("Track", { order });
  };

  return (
    <View style={styles.orderContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.collectionId}>Collection ID {order._id}</Text>
        <View
          style={[
            styles.statusIndicator,
            order.pickupStatus === "pending" && styles.pendingStatus,
            order.pickupStatus === "accepted" && styles.acceptedStatus,
            order.pickupStatus === "onTheWay" && styles.onTheWayStatus,
            order.pickupStatus === "completed" && styles.completedStatus,
            order.pickupStatus === "cancelled" && styles.cancelledStatus,
          ]}
        >
          <Text style={styles.statusText}>
            {order.pickupStatus === "pending"
              ? "Pending"
              : order.pickupStatus === "accepted"
              ? "Accepted"
              : order.pickupStatus === "onTheWay"
              ? "On The Way"
              : order.pickupStatus === "completed"
              ? "Completed"
              : "Cancelled"}
          </Text>
        </View>
      </View>
      <View style={styles.orderDetail}>
        <Text style={styles.detailLabel}>Total weight</Text>
        <Text style={styles.detailValue}>
          {order.items.reduce((acc, item) => acc + item.itemWeight, 0)} kg
        </Text>
      </View>

      <Text style={styles.date}>
        Date: {new Date(order.pickupDate).toLocaleDateString()} Time:{" "}
        {order.pickupTime}
      </Text>
    </View>
  );
};

const OrderList = ({ status }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useLogin();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://kitacycle-backend.onrender.com/getUserPickups?user=${user._id}`
      );
      let filteredOrders = response.data;
      if (status === "scheduled") {
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.pickupStatus === "pending" ||
            order.pickupStatus === "accepted" ||
            order.pickupStatus === "onTheWay"
        );
      } else {
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.pickupStatus === "completed" ||
            order.pickupStatus === "cancelled"
        );
      }
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [status, user._id])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyTitle}>No History yet</Text>
        <Text style={styles.emptySubtitle}>
          You don’t have any active pickups history yet.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const ScheduledOrders = () => <OrderList status="scheduled" />;
const PastOrders = () => <OrderList status="past" />;

const renderScene = SceneMap({
  scheduled: ScheduledOrders,
  past: PastOrders,
});

const PickupHistory = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "scheduled", title: "Scheduled Pickups" },
    { key: "past", title: "Past Pickups" },
  ]);

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  indicator: {
    backgroundColor: "#4CAF50",
  },
  tabLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  listContentContainer: {
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  collectionId: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  statusIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 10,
  },
  pendingStatus: {
    backgroundColor: "#FFB300",
  },
  acceptedStatus: {
    backgroundColor: "#4CAF50",
  },
  onTheWayStatus: {
    backgroundColor: "#2196F3",
  },
  completedStatus: {
    backgroundColor: "#4CAF50",
  },
  cancelledStatus: {
    backgroundColor: "#f44336",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  orderDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  trackButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default PickupHistory;
