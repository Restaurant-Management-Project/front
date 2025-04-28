import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import ConfirmationDialog from "./ConfirmationDialogProps";
import { LanguageContext } from "../App";
import TablewareIcon from "../assets/tableware.png";
import GlassIcon from "../assets/glass.png";
import CupIcon from "../assets/cup.png";
import OtherIcon from "../assets/other.png";
import PlateIcon from "../assets/plate.png";
import MenuIcon from "../assets/menu.png";

type Translation = {
  pageTitle: string;
  confirmationTitle: string;
  menu: string;
  mug: string;
  glass: string;
  plate: string;
  tableware: string;
  other: string;
};

const CallWaiterPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedActionWord, setSelectedActionWord] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const translations: { [key: string]: Translation } = {
    RO: {
      pageTitle: "Chelner",
      confirmationTitle: "Confirmați",
      menu: "MENIU",
      mug: "CANĂ",
      glass: "PAHAR",
      plate: "FARFURIE",
      tableware: "TACÂM",
      other: "ALTCEVA",
    },
    RU: {
      pageTitle: "Вызов официанта",
      confirmationTitle: "Подтвердите",
      menu: "МЕНЮ",
      mug: "КРУЖКА",
      glass: "СТАКАН",
      plate: "ТАРЕЛКА",
      tableware: "ПРИБОРЫ",
      other: "ДРУГОЕ",
    },
    EN: {
      pageTitle: "Call Waiter",
      confirmationTitle: "Confirm",
      menu: "MENU",
      mug: "MUG",
      glass: "GLASS",
      plate: "PLATE",
      tableware: "TABLEWARE",
      other: "OTHER"
    }
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setSelectedActionWord(translations[selectedLanguage][action as keyof Translation]);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (selectedAction !== null) {
      try {
        const response = await axios.post('/requests/', {
              order_id: orderId,
              request_type: selectedAction
            }
        )
        console.log("Post request successful:", response.data);
        setShowConfirmation(false);
        navigate(`/home/${orderId}`);
      } catch (error) {
        console.error("Error performing post request:", error);
        setShowConfirmation(false);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="wrapper">
        <h2>{translations[selectedLanguage].pageTitle}</h2>
        {showConfirmation ? (
          <ConfirmationDialog
            title={translations[selectedLanguage].confirmationTitle}
            message={selectedActionWord.toLocaleLowerCase()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("menu")}
            >
              <img src={MenuIcon} alt="" />
              <span>{translations[selectedLanguage].menu}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("glass")}
            >
              <img src={GlassIcon} alt="" />
              <span>{translations[selectedLanguage].glass}</span>
            </li>
            <li className="linkStyle" onClick={() => handleActionClick("mug")}>
              <img src={CupIcon} alt="" />
              <span>{translations[selectedLanguage].mug}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("plate")}
            >
              <img src={PlateIcon} alt="" />
              <span>{translations[selectedLanguage].plate}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("tableware")}
            >
              <img src={TablewareIcon} alt="" />
              <span>{translations[selectedLanguage].tableware}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("other")}
            >
              <img src={OtherIcon} alt="" />
              <span>{translations[selectedLanguage].other}</span>
            </li>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallWaiterPage;
