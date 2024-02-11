import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useTableId } from "./TableIdContext";

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
          {translations[selectedLanguage].table} 1
        </li>
        <li className="linkStyle" key="2" onClick={() => handleClick("2")}>
          {translations[selectedLanguage].table} 2
        </li>
        <li className="linkStyle" key="3" onClick={() => handleClick("3")}>
          {translations[selectedLanguage].table} 3
        </li>
      </div>
    </div>
  );
};

export default Tables;
