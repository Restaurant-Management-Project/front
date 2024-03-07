import React, { useState, useEffect } from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CallWaiterPage from "./pages/CallWaiterPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import PaymentPage from "./pages/PaymentPage";
import Header from "./pages/Header";
import axios from "./axiosConfig";
import { BrowserRouter } from "react-router-dom";

export const LanguageContext = React.createContext<{
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}>({
  selectedLanguage: "RO",
  onLanguageChange: () => {},
});

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("RO");
  const [tableId, setTableId] = useState<string | null>(
    localStorage.getItem("tableId")
  );

  useEffect(() => {
    async function initializeSession() {
      console.log("Pathname:", window.location.pathname);
      const tableIdMatch = window.location.pathname.match(/\/home\/(\d+)\/?$/);
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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    
    <BrowserRouter>
  
        <LanguageContext.Provider
          value={{ selectedLanguage, onLanguageChange: handleLanguageChange }}
        >
          <Header
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <Routes>
            <Route
              path="/home/:orderId"
              element={<MainPage tableId={tableId} />}
            />
            <Route path="/call-waiter/:orderId" element={<CallWaiterPage />} />
            <Route
              path="/view-order/:orderId"
              element={<ViewOrderPage tableId={tableId} />}
            />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
          </Routes>
        </LanguageContext.Provider>
      
    </BrowserRouter>
  );
}

export default App;
