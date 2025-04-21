import React from "react";
import CheckmarkIcon from "../assets/yes.png";
import CancelIcon from "../assets/no.png";
import "../styles/ConfirmationDialogProps.css";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="container">
      <div className="confirmation-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="cancelButton" onClick={onCancel}>
          <img src={CancelIcon} alt="Cancel" />
        </button>
        <button className="confirmButton" onClick={onConfirm}>
          <img src={CheckmarkIcon} alt="Confirm" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
