import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from "../App";
import OrderIcon from "../assets/order.png";
import WaiterIcon from "../assets/waiter.png";
import PayIcon from "../assets/pay.png";
import MenuIcon from "../assets/menu.png";

interface Props {
  tableId: string | null; 
}

const MainPage: React.FC<Props> = ({ tableId }) => {
  const { orderId } = useParams<{ orderId: string }>();
  const { selectedLanguage } = useContext(LanguageContext);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      welcomeMessage: "Добро пожаловать!",
      viewMenu: "ПОСМОТРЕТЬ МЕНЮ",
      callWaiter: "ПОЗВАТЬ ОФИЦИАНТА",
      viewOrder: "ПОСМОТРЕТЬ ЗАКАЗ",
      pay: "ХОЧУ ОПЛАТИТЬ",
    },
    RO: {
      welcomeMessage: "Bine ați venit!",
      viewMenu: "VEZI MENU",
      callWaiter: "CHEAMĂ CHELNERUL",
      viewOrder: "VEZI COMANDĂ",
      pay: "VREAU SĂ ACHIT",
    },
    EN: {
      welcomeMessage: "Welcome!",
      viewMenu: "VIEW MENU",
      callWaiter: "CALL WAITER",
      viewOrder: "VIEW ORDER",
      pay: "I WANT TO PAY"
    },
  };

  return (
    <div>
      <div className="wrapper">
        <h2>{translations[selectedLanguage].welcomeMessage} #{tableId}</h2>
        <Link to={`/view-menu/${orderId}`} className="linkStyle">
          <img src={MenuIcon} alt="" />
          {translations[selectedLanguage].viewMenu}
        </Link>
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
