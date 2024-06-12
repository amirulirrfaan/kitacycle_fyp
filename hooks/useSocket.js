import { useEffect } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginProvider";

const socket = io("http://172.20.10.14:8000");

const useSocket = () => {
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      console.log("User detected, joining socket room:", user._id);
      socket.emit("join", { userId: user._id.toString() });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected, reason:", reason);
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.on("reconnect_attempt", () => {
        console.log("Reconnect attempt");
      });

      socket.on("reconnect_error", (error) => {
        console.error("Reconnect error:", error);
      });

      socket.on("reconnect_failed", () => {
        console.error("Reconnect failed");
      });

      socket.on("pickupAccepted", (data) => {
        console.log("Received pickupAccepted event:", data);
      });

      // Clean up the socket event listeners on unmount
      return () => {
        console.log("Cleaning up socket events for user:", user._id);
        socket.off("pickupAccepted");
        socket.disconnect();
      };
    } else {
      console.log("No user, skipping socket setup");
    }
  }, [user]);

  return socket;
};

export default useSocket;
