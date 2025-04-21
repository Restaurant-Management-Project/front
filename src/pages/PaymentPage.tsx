import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import ConfirmationDialog from "./ConfirmationDialogProps";
import CardIcon from "../assets/card.png";
import CashIcon from "../assets/cash.png";
import { LanguageContext } from "../App";

type Translation = {
  pageTitle: string;
  confirmationTitle: string;
  card: string;
  cash: string;
};

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptionWord, setSelectedOptionWord] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  const { orderId } = useParams<{ orderId: string }>();

  const translations: { [key: string]: Translation } = {
    RO: {
      pageTitle: "Plată",
      confirmationTitle: "Confirmați",
      card: "CARD BANCAR",
      cash: "NUMERAR",
    },
    RU: {
      pageTitle: "Оплата",
      confirmationTitle: "Подтвердите",
      card: "КАРТОЙ",
      cash: "НАЛИЧНЫМИ",
    },
    EN: {
      pageTitle: "Payment",
      confirmationTitle: "Confirm",
      card: "CARD",
      cash: "CASH"
    },
  };

  const handlePaymentOptionClick = (option: string) => {
    const translationKeyMap: Record<string, number> = {
      card: 7,
      cash: 6,
    };

    const paymentNumber = translationKeyMap[option];
    setSelectedOption(paymentNumber);
    setSelectedOptionWord(
      translations[selectedLanguage][option as keyof Translation]
    );
    console.log(selectedOption, selectedOptionWord);

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (selectedOption !== null) {
      try {
        const response = await axios.post('/requests/', {
              order_id: orderId,
              request_type: selectedOption
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
            message={selectedOptionWord.toLocaleLowerCase()}
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
              <span>{translations[selectedLanguage].card}</span>
            </li>
            <li
              className="linkStyle"
              onClick={() => handlePaymentOptionClick("cash")}
            >
              <img src={CashIcon} alt="" />
              <span>{translations[selectedLanguage].cash}</span>
            </li>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
