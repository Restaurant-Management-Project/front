import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import '../styles/ViewOrderPage.css'; 

const ViewOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedLanguage, onLanguageChange } = useContext(LanguageContext);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      yourOrder: 'Ваш заказ:',
      tableName: 'Название',
      quantity: 'Количество',
      price: 'Цена',
      total: 'Всего',
      totalAmount: 'Всего:',
    },
    RO: {
      yourOrder: 'Comanda DVS.:',
      tableName: 'Nume produs',
      quantity: 'Cantitate',
      price: 'Preț',
      total: 'Total',
      totalAmount: 'Total:',
    },
  };

  return (
    <div>
      <div className="wrapper">
        <h2 className="order-header">{translations[selectedLanguage].yourOrder}</h2>
        <div className="order-table">
          <table>
            {/* Add your table header (thead) and body (tbody) here */}
            <thead>
              <tr>
                <th>{translations[selectedLanguage].tableName}</th>
                <th>{translations[selectedLanguage].quantity}</th>
                <th>{translations[selectedLanguage].price}</th>
                <th>{translations[selectedLanguage].total}</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your table rows here */}
              <tr>
                <td>Суп</td>
                <td>2</td>
                <td>MDL 60.00</td>
                <td>MDL 120.00</td>
              </tr>
              <tr>
                <td>Салат</td>
                <td>1</td>
                <td>MDL 150.00</td>
                <td>MDL 150.00</td>
              </tr>
            </tbody>
            <tfoot>
              {/* Add your total row here */}
              <tr>
                <td colSpan={3}>{translations[selectedLanguage].totalAmount}</td>
                <td>MDL 270.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderPage;
