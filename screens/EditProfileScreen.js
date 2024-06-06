import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useLogin } from "../context/LoginProvider";
import Colors from "../constants/Colors";

const EditProfileScreen = () => {
  const { user, setUser } = useLogin();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://kitacycle-backend.onrender.com/user/${user._id}`,
        {
          name,
          email,
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <Button
        style={styles.saveButton}
        title="Save"
        onPress={handleSave}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  saveButton: {
    borderRadius: 20,
  },
});

export default EditProfileScreen;
