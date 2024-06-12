import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, fetchUserData } from "../api/api";
import { Alert } from "react-native";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          console.log("Token found in AsyncStorage:", token); // Debug log
          const userData = await fetchUserData(token);
          if (userData) {
            console.log("User data fetched:", userData); // Debug log
            setUser(userData);
            setIsLoggedIn(true);
          } else {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const login = async (email, password) => {
    try {
      // setLoading(true);
      const data = await loginUser(email, password);
      if (data?.token && data?.user) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        throw new Error("Invalid token or user datas");
      }
    } catch (error) {
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
      Alert.alert("Login Error", errorMessage);
    } finally {
      // setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Failed to clear user data:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        loading,
        setIsLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
export default LoginProvider;
