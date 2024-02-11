import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CallWaiterPage from "./pages/CallWaiterPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import PaymentPage from "./pages/PaymentPage";
import Header from "./pages/Header";
import Tables from "./pages/Tables";
import { TableIdProvider } from "./pages/TableIdContext";

export const LanguageContext = React.createContext<{
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}>({
  selectedLanguage: "RO",
  onLanguageChange: () => {},
});

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("RO");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <Router>
      <TableIdProvider>
        <LanguageContext.Provider
          value={{ selectedLanguage, onLanguageChange: handleLanguageChange }}
        >
          <Header
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <Routes>
            <Route path="/" element={<Tables />} />
            <Route path="/home/:orderId" element={<MainPage />} />
            <Route path="/call-waiter/:orderId" element={<CallWaiterPage />} />
            <Route path="/view-order/:orderId" element={<ViewOrderPage />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
          </Routes>
        </LanguageContext.Provider>
      </TableIdProvider>
    </Router>
  );
}

export default App;
