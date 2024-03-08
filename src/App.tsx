import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CallWaiterPage from "./pages/CallWaiterPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import PaymentPage from "./pages/PaymentPage";
import Header from "./pages/Header";
import Tables from "./pages/Tables";
import SessionInitializer from "./SessionInitializer";

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
    <SessionInitializer>
      {(tableId) => (
        <Router>
          <LanguageContext.Provider
            value={{ selectedLanguage, onLanguageChange: handleLanguageChange }}
          >
            <Header
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <Routes>
              <Route path="/" element={<Tables />} />
              <Route
                path="/loading/4"
                element={
                  <div>
                    Loading...
                    <SessionInitializer>
                      {(tableId) => (
                        <div>
                          {tableId ? (
                            <div>Table ID: {tableId}</div>
                          ) : (
                            <div>No table ID available</div>
                          )}
                        </div>
                      )}
                    </SessionInitializer>{" "}
                  </div>
                }
              />
              <Route path="/loading/5" element={
                  <div>
                    Loading...
                    <SessionInitializer>
                      {(tableId) => (
                        <div>
                          {tableId ? (
                            <div>Table ID: {tableId}</div>
                          ) : (
                            <div>No table ID available</div>
                          )}
                        </div>
                      )}
                    </SessionInitializer>{" "}
                  </div>
                } />
              <Route path="/loading/6" element={
                  <div>
                    Loading...
                    <SessionInitializer>
                      {(tableId) => (
                        <div>
                          {tableId ? (
                            <div>Table ID: {tableId}</div>
                          ) : (
                            <div>No table ID available</div>
                          )}
                        </div>
                      )}
                    </SessionInitializer>{" "}
                  </div>
                } />
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
                element={<ViewOrderPage tableId={tableId} />}
              />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
            </Routes>
          </LanguageContext.Provider>
        </Router>
      )}
    </SessionInitializer>
  );
}

export default App;
