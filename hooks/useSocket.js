import { useEffect } from "react";
import io from "socket.io-client";
import { useLogin } from "../context/LoginProvider";

const socket = io("http://172.20.10.14:8000");

const useSocket = () => {
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      socket.emit("join", { userId: user._id });

      return () => {
        console.log("Cleaning up socket events");
        socket.off("pickupStatusChanged");
      };
    } else {
      console.log("No user, skipping socket setup");
    }
  }, [user]);

  return socket;
};

export default useSocket;
