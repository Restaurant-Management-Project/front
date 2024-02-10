import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../axiosConfig';
import ConfirmationDialog from "./ConfirmationDialogProps";
import { LanguageContext } from "../App";
import TablewareIcon from "../assets/tableware.png";
import GlassIcon from "../assets/glass.png";
import CupIcon from "../assets/cup.png";
import OtherIcon from "../assets/other.png";
import PlateIcon from "../assets/plate.png";

const CallWaiterPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  const { orderId } = useParams<{ orderId: string }>(); 
  const navigate = useNavigate();

  const translations: {
    [key: string]: {
      pageTitle: string;
      confitationTitle: string;
      cup: string;
      glass: string;
      plate: string;
      tableware: string;
      otherItem: string;
    };
  } = {
    RO: {
      pageTitle: "Chelner",
      confitationTitle: "Confirmați",
      cup: "CANĂ",
      glass: "PAHAR",
      plate: "FARFURIE",
      tableware: "TACÂM",
      otherItem: "ALTCEVA",
    },
    RU: {
      pageTitle: "Вызов официанта",
      confitationTitle: "Подтвердите",
      cup: "КРУЖКА",
      glass: "СТАКАН",
      plate: "ТАРЕЛКА",
      tableware: "ПРИБОРЫ",
      otherItem: "ДРУГОЕ",
    },
  };

  const handleActionClick = (action: string) => {
    const reverseActionMapping: Record<string, number> = {
      glass: 1,
      cup: 2,
      plate: 3,
      tableware: 4,
      otherItem: 5,
    };
  
    const actionNumber = reverseActionMapping[action];
    setSelectedAction(actionNumber.toString());
    setShowConfirmation(true);
  };
  

  const handleConfirm = () => {
    axios
      .post(`/create-request/${orderId}/${selectedAction}`)
      .then((response) => {
        console.log("Post request successful:", response.data);
        setShowConfirmation(false);
        navigate(`/home/${orderId}`);
      })
      .catch((error) => {
        console.error("Error performing post request:", error);
        setShowConfirmation(false);
      });
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
            title={translations[selectedLanguage].confitationTitle}
            message={selectedAction}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            <li
              className="linkStyle"
              onClick={() => handleActionClick("glass")}
            >
              <img src={GlassIcon} alt="" />
              <span>{translations[selectedLanguage].glass}</span>
            </li>
            <li className="linkStyle" onClick={() => handleActionClick("cup")}>
              <img src={CupIcon} alt="" />
              <span>{translations[selectedLanguage].cup}</span>
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
              onClick={() => handleActionClick("otherItem")}
            >
              <img src={OtherIcon} alt="" />
              <span>{translations[selectedLanguage].otherItem}</span>
            </li>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallWaiterPage;
