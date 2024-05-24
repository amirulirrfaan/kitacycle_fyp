import axios from "axios";

const API_URL = "http://172.20.10.14:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.log("API login error: ", error.response?.data);
    throw new Error(
      error.response?.data?.message || "An error occurred during login."
    );
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/getUserData`, { token });
    return response.data.data;
  } catch (error) {
    console.log("API fetch user data error: ", error.response?.data);
    throw new Error("Failed to fetch user data.");
  }
};
