import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CallWaiterPage from './pages/CallWaiterPage';
import ViewOrderPage from './pages/ViewOrderPage';
import PaymentPage from './pages/PaymentPage';
import Header from './pages/Header';

export const LanguageContext = React.createContext<{
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}>({
  selectedLanguage: 'RO',
  onLanguageChange: () => {},
});

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('RO');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <Router>
      <LanguageContext.Provider value={{ selectedLanguage, onLanguageChange: handleLanguageChange }}>
      <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/call-waiter" element={<CallWaiterPage />} />
          <Route path="/view-order" element={<ViewOrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </LanguageContext.Provider>
    </Router>
  );
}

export default App;
