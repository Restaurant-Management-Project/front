import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { useNavigate } from "react-router-dom";
import Number4 from "../assets/number4.png";
import Number5 from "../assets/number5.png";
import Number6 from "../assets/number6.png";

const Tables: React.FC = () => {
  const navigate = useNavigate();
  const { selectedLanguage } = useContext(LanguageContext);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      table: "Стол",
    },
    RO: {
      table: "Masa",
    },
  };

  const handleClick = async (tableId: string) => {
    try {
      window.location.href = `/home/${tableId}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <li className="linkStyle" key="4" onClick={() => handleClick("4")}>
          <img src={Number4} alt="" />
          {translations[selectedLanguage].table} 4
        </li>
        <li className="linkStyle" key="5" onClick={() => handleClick("5")}>
          <img src={Number5} alt="" />
          {translations[selectedLanguage].table} 5
        </li>
        <li className="linkStyle" key="6" onClick={() => handleClick("6")}>
          <img src={Number6} alt="" />
          {translations[selectedLanguage].table} 6
        </li>
      </div>
    </div>
  );
};

export default Tables;
