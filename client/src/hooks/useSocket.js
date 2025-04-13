// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import socket from "../services/socket.js";

const useSocket = () => {
  const [notification, setNotification] = useState(null);
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    // Handlers
    const handleLowStock = (data) => {
      console.log("Received low-stock event:", data);
      setNotification(data);
    };
    const handleProductUpdate = (data) => {
      console.log("Received product-update event:", data);
      setLiveData(data);
    };

    // Register listeners
    socket.on("low-stock", handleLowStock);
    socket.on("product-update", handleProductUpdate);

    // Cleanup on unmount
    return () => {
      socket.off("low-stock", handleLowStock);
      socket.off("product-update", handleProductUpdate);
    };
  }, []);

  return { notification, liveData };
};

export default useSocket;
