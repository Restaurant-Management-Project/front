import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../assets/back.png";
import TableBell  from "../assets/TableBell.png";
import "../styles/Header.css";

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const location = useLocation();

  const isMainPage = (location.pathname.startsWith("/home/") && location.pathname.length > 6) || location.pathname === "/";

  return (
    <div>
      <header className="header">
        {isMainPage ? (
          <div className="backButton"></div>
        ) : (
          <img
            className="backButton"
            src={BackButton}
            alt="BackButton"
            onClick={() => window.history.back()}
          />
        )}
        <img className="logo" src={TableBell} alt={TableBell}/>
        <div className="language-dropdown">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="RO">RO</option>
            <option value="RU">RU</option>
            <option value="EN">EN</option>
          </select>
        </div>
      </header>
    </div>
  );
};

export default Header;
