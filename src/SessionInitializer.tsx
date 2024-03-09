import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

interface SessionInitializerProps {
  children: (tableId: string | null) => React.ReactNode;
}

function SessionInitializer({ children }: SessionInitializerProps) {
  const navigate = useNavigate(); 
  const [tableId, setTableId] = useState<string | null>(
    localStorage.getItem("tableId")
  );

  useEffect(() => {
    async function initializeSession() {
      const hashValue = window.location.hash.substring(1); 
      const id = parseInt(hashValue, 10); 
      const tableId = !isNaN(id) ? id : null; 
      if (!tableId) {
        const storedTableId = localStorage.getItem("tableId");
        if (storedTableId) {
          setTableId(storedTableId);
          return;
        }
      } else {
        setTableId(String(tableId)); 
        localStorage.setItem("tableId", String(tableId));
      }
      console.log("tableId:", tableId);
      if (tableId) {
        const response = await axios.get(`/init-session/${String(tableId)}`);
        console.log("response.data:", response.data);
        const orderId = response.data; 
        if (orderId) {
          navigate(`/home/${orderId}`);
        }
      }
    }
    initializeSession();
  }, [navigate]); 

  return children(tableId);
}

export default SessionInitializer;
