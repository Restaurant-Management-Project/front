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
      console.log("Pathname:", window.location.pathname);
      const tableIdMatch = window.location.pathname.match(/\/loading\/(\d+)\/?$/);
      const tableId = tableIdMatch ? tableIdMatch[1] : null;
      if (!tableId) {
        const storedTableId = localStorage.getItem("tableId");
        if (storedTableId) {
          setTableId(storedTableId);
          return;
        }
      } else {
        setTableId(tableId);
        localStorage.setItem("tableId", tableId);
      }
      console.log("tableId:", tableId);
      if (tableId) {
        const response = await axios.get(`/init-session/${tableId}`);
        console.log("response.data:", response.data);
        window.location.href = `/home/${response.data}`;
      }
    }
    initializeSession();
  }, []);

  return children(tableId);
}

export default SessionInitializer;
