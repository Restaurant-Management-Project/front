import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialogProps";
import CardIcon from "../assets/card.png";
import CashIcon from "../assets/cash.png";
import { LanguageContext } from "../App";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { selectedLanguage, onLanguageChange } = useContext(LanguageContext);

  const translations: {
    [key: string]: {
      pageTitle: string;
      confitationTitle: string;
      cardPayment: string;
      cashPayment: string;
    };
  } = {
    RO: {
      pageTitle: "Plată",
      confitationTitle: "Confirmați",
      cardPayment: "CARD BANCAR",
      cashPayment: "NUMERAR",
    },
    RU: {
      pageTitle: "Оплата",
      confitationTitle: "Подтвердите",
      cardPayment: "КАРТОЙ",
      cashPayment: "НАЛИЧНЫМИ",
    },
  };

  const handlePaymentOptionClick = (option: string) => {
    const translationKeyMap: Record<string, "cardPayment" | "cashPayment"> = {
      card: "cardPayment",
      cash: "cashPayment",
    };

    const paymentOptionKey = translationKeyMap[option.toLowerCase()];

    const paymentOptionTranslation =
      translations[selectedLanguage][paymentOptionKey].toLowerCase();
    setSelectedOption(`${paymentOptionTranslation}`);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    axios
      .post("your_backend_payment_endpoint", { option: selectedOption })
      .then((response) => {
        console.log("Post request successful:", response.data);
        setShowConfirmation(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error performing post request:", error);
        setShowConfirmation(false);
        navigate("/");
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
            message={selectedOption}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            <li
              className="linkStyle"
              onClick={() => handlePaymentOptionClick("card")}
            >
              <img src={CardIcon} alt="" />
              <span>{translations[selectedLanguage].cardPayment}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handlePaymentOptionClick("cash")}
            >
              <img src={CashIcon} alt="" />
              <span>{translations[selectedLanguage].cashPayment}</span>
            </li>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
