import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CallWaiterPage from "./pages/CallWaiterPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import ViewMenuPage from "./pages/ViewMenuPage";
import PaymentPage from "./pages/PaymentPage";
import Header from "./pages/Header";
import SessionInitializer from "./SessionInitializer";

export const LanguageContext = React.createContext<{
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}>({
  selectedLanguage: "EN",
  onLanguageChange: () => {},
});

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <Router>
      <LanguageContext.Provider
        value={{ selectedLanguage, onLanguageChange: handleLanguageChange }}
      >
        <Header
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <SessionInitializer>
          {(tableId) => (
            <Routes>
              <Route path="/" element={<div>Loading..</div>} />
              <Route
                path="/home/:orderId"
                element={<MainPage tableId={tableId} />}
              />
              <Route
                path="/call-waiter/:orderId"
                element={<CallWaiterPage />}
              />
              <Route
                path="/view-order/:orderId"
                element={<ViewOrderPage/>}
              />
              <Route
                  path="/view-menu/:orderId"
                  element={<ViewMenuPage/>}
              />
              <Route
                  path="/payment/:orderId"
                  element={<PaymentPage />}
              />
            </Routes>
          )}
        </SessionInitializer>
      </LanguageContext.Provider>
    </Router>
  );
}

export default App;
