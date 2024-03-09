import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";

interface SessionInitializerProps {
  children: (tableId: string | null) => React.ReactNode;
}

function SessionInitializer({ children }: SessionInitializerProps) {
  const [tableId, setTableId] = useState<string | null>(
    localStorage.getItem("tableId")
  );

  useEffect(() => {
    async function initializeSession() {
      const hashValue = window.location.hash.substring(1); // Extract value after #
      const id = parseInt(hashValue, 10); // Parse the value as an integer
      const tableId = !isNaN(id) ? id : null; // Check if it's a valid number
      if (!tableId) {
        const storedTableId = localStorage.getItem("tableId");
        if (storedTableId) {
          setTableId(storedTableId);
          return;
        }
      } else {
        setTableId(String(tableId)); // Convert back to string before setting state
        localStorage.setItem("tableId", String(tableId));
      }
      console.log("tableId:", tableId);
      if (tableId) {
        const response = await axios.get(`/init-session/${String(tableId)}`);
        console.log("response.data:", response.data);
        window.location.href = `/home/${response.data}`;
      }
    }
    initializeSession();
  }, []);

  return children(tableId);
}

export default SessionInitializer;
