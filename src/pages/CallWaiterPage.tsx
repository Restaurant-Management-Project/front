import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationDialog from './ConfirmationDialogProps';
import { LanguageContext } from '../App';

interface AdditionalItem {
  action: string;
}

const CallWaiterPage: React.FC = () => {
  const [additionalItems, setAdditionalItems] = useState<AdditionalItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const { selectedLanguage, onLanguageChange } = useContext(LanguageContext);


  const hardcodedItems: AdditionalItem[] = [
    { action: 'Принести стакан' },
    { action: 'Принести ложку' },
    { action: 'Другое' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    axios.get<AdditionalItem[]>('your_backend_api_endpoint')
      .then(response => {
        setAdditionalItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching additional items:', error);
      });
  }, []);

  const translations: {
    [key: string]: {
      pageTitle: string;
      confirmationMessage: (action: string) => string;
      glass: string;
      spoon: string;
      otherItem: string;
    };
  } = {
    RO: {
      pageTitle: 'Chelner',
      confirmationMessage: (action: string) => `Ați solicitat: ${action}. Doriți să continuați?`,
      glass: 'Aduceți un pahar',
      spoon: 'Aduceți o lingură',
      otherItem: 'Altceva',
    },
    RU: {
      pageTitle: 'Вызов официанта',
      confirmationMessage: (action: string) => `Вы позвали официанта, выбрав: ${action}. Хотите продолжить?`,
      glass: 'Принести стакан',
      spoon: 'Принести ложку',
      otherItem: 'Другое',
    },
  };

  const handleActionClick = (action: string) => {
    if (action === 'Принести стакан') setSelectedAction(`'${translations[selectedLanguage].glass.toLowerCase()}'`); 
    else if (action === 'Принести ложку') setSelectedAction(`'${translations[selectedLanguage].spoon.toLowerCase()}'`); 
    else if (action === 'Другое') setSelectedAction(`'${translations[selectedLanguage].otherItem.toLowerCase()}'`); 
    else setSelectedAction(`'${action.toLowerCase()}'`)
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    axios.post('your_backend_post_endpoint', { action: selectedAction })
      .then(response => {
        console.log('Post request successful:', response.data);
        setShowConfirmation(false);
        navigate('/');
      })
      .catch(error => {
        console.error('Error performing post request:', error);
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
            message={translations[selectedLanguage].confirmationMessage(selectedAction)}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            {hardcodedItems.map((item, index) => (
              <li
                className="linkStyle"
                key={index}
                onClick={() => handleActionClick(item.action)}
              >
                {item.action === 'Принести стакан' ? translations[selectedLanguage].glass :
                  item.action === 'Принести ложку' ? translations[selectedLanguage].spoon :
                  item.action === 'Другое' ? translations[selectedLanguage].otherItem :
                  item.action}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallWaiterPage;
