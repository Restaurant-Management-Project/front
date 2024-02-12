import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../assets/back.png";
import Logo from "../assets/logo.svg";
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

  const isMainPage = location.pathname === "/";

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
        <div className="language-dropdown">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="RO">RO</option>
            <option value="RU">RU</option>
          </select>
        </div>
      </header>
      <div className="logo-wrapper">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
