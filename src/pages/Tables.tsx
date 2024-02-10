import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { Link } from "react-router-dom";
import axios from '../axiosConfig'

const MainPage: React.FC = () => {
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
      const response = await axios.get(`/init-session/${tableId}`);
      console.log("Response:", response.data);
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="wrapper">
        <Link to="/home" className="linkStyle" key="1" onClick={() => handleClick("1")}>
          {translations[selectedLanguage].table} 1
        </Link>
        <Link to="/home" className="linkStyle" key="2" onClick={() => handleClick("2")}>
          {translations[selectedLanguage].table} 2
        </Link>
        <Link to="/home" className="linkStyle" key="3" onClick={() => handleClick("3")}>
          {translations[selectedLanguage].table} 3
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
