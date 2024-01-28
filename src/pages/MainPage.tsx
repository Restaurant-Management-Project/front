import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';

const MainPage: React.FC = () => {
  const { selectedLanguage, onLanguageChange } = useContext(LanguageContext);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      welcomeMessage: 'Добро пожаловать в Salat!',
      callWaiter: 'Вызов официанта',
      viewOrder: 'Посмотреть заказ',
      pay: 'Оплатить',
    },
    RO: {
      welcomeMessage: 'Bine ați venit la Salat!',
      callWaiter: 'Chemare chelner',
      viewOrder: 'Vizualizare comandă',
      pay: 'Plătiți',
    },
  };

  return (
    <div>
      <div className="wrapper">
        <h2>{translations[selectedLanguage].welcomeMessage}</h2>
        <Link to="/call-waiter" className="linkStyle">
          {translations[selectedLanguage].callWaiter}
        </Link>
        <Link to="/view-order" className="linkStyle">
          {translations[selectedLanguage].viewOrder}
        </Link>
        <Link to="/payment" className="linkStyle">
          {translations[selectedLanguage].pay}
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
