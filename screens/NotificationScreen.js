// NotificationsScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSocket from "../hooks/useSocket";
import { useLogin } from "../context/LoginProvider";

const NOTIFICATIONS_KEY = "notifications";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();
  const { user } = useLogin();

  // Load notifications from AsyncStorage when the screen is loaded
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem(
          NOTIFICATIONS_KEY
        );
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  // Save notifications to AsyncStorage whenever they are updated
  const saveNotifications = async (newNotifications) => {
    try {
      await AsyncStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(newNotifications)
      );
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      socket.on("pickupStatusChanged", (data) => {
        const newNotification = {
          id: Date.now().toString(),
          title: "Pickup Accepted",
          message: `Collector has accepted your pickup request for ID: ${data.pickupId}`,
        };

        const updatedNotifications = [newNotification, ...notifications];
        setNotifications(updatedNotifications);
        saveNotifications(updatedNotifications); // Save to AsyncStorage
      });

      return () => {
        socket.off("pickupStatusChanged");
      };
    }
  }, [user, socket, notifications]);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationItem}>
            <MaterialIcons name="mail" size={40} color="#3b82f6" />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
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
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notificationContent: {
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationMessage: {
    color: "#555",
  },
});

export default NotificationsScreen;
