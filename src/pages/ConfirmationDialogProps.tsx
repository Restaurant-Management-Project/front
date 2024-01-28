import React from 'react';
import CheckmarkIcon from '../assets/checkmark.svg';
import CancelIcon from '../assets/cancel.svg';
import '../styles/ConfirmationDialogProps.css'

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='container'>
      <div className='confirmation-dialog'>
        <p>{message}</p>
        <button className='confirmButton' onClick={onConfirm}>
          <img src={CheckmarkIcon} alt="Confirm" />
        </button>
        <button className='cancelButton' onClick={onCancel}>
          <img src={CancelIcon} alt="Cancel" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
