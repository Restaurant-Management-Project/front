import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from "../App";
import OrderIcon from "../assets/order.png";
import WaiterIcon from "../assets/waiter.png";
import PayIcon from "../assets/pay.png";

const MainPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { selectedLanguage } = useContext(LanguageContext);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      welcomeMessage: "Добро пожаловать!",
      callWaiter: "ПОЗВАТЬ ОФИЦИАНТА",
      viewOrder: "ПОСМОТРЕТЬ ЗАКАЗ",
      pay: "ХОЧУ ОПЛАТИТЬ",
    },
    RO: {
      welcomeMessage: "Bine ați venit!",
      callWaiter: "CHEAMĂ CHELNERU",
      viewOrder: "VEZI COMANDĂ",
      pay: "VREAU SĂ ACHIT",
    },
  };

  return (
    <div>
      <div className="wrapper">
        <h2>{translations[selectedLanguage].welcomeMessage}</h2>
        <Link to={`/call-waiter/${orderId}`} className="linkStyle">
          <img src={WaiterIcon} alt="" />
          {translations[selectedLanguage].callWaiter}
        </Link>
        <Link to={`/view-order/${orderId}`} className="linkStyle">
          <img src={OrderIcon} alt="" />
          {translations[selectedLanguage].viewOrder}
        </Link>
        <Link to={`/payment/${orderId}`} className="linkStyle">
          <img src={PayIcon} alt="" />
          {translations[selectedLanguage].pay}
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
