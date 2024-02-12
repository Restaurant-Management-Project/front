import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useTableId } from "./TableIdContext";
import Number1 from "../assets/number1.png";
import Number2 from "../assets/number2.png";
import Number3 from "../assets/number3.png";

const Tables: React.FC = () => {
  const { setTableId } = useTableId();
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
      setTableId(tableId);
      const response = await axios.get(`/init-session/${tableId}`);
      console.log("Response:", response.data);
      const orderId = response.data;
      navigate(`/home/${orderId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <li className="linkStyle" key="1" onClick={() => handleClick("1")}>
          <img src={Number1} alt="" />
          {translations[selectedLanguage].table} 1
        </li>
        <li className="linkStyle" key="2" onClick={() => handleClick("2")}>
          <img src={Number2} alt="" />
          {translations[selectedLanguage].table} 2
        </li>
        <li className="linkStyle" key="3" onClick={() => handleClick("3")}>
          <img src={Number3} alt="" />
          {translations[selectedLanguage].table} 3
        </li>
      </div>
    </div>
  );
};

export default Tables;
