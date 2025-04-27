import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../App";
import DishRow from "./DishRow";
import axios from "../axiosConfig";
// import PlusSign from "../assets/plus.png";
// import MinusSign from "../assets/minus.png";
// import ClickIcon from "../assets/click.png";
// import PaymentIcon from "../assets/payment.png";
import "../styles/ViewOrderPage.css";
import {useParams} from "react-router-dom";

interface Dish {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const ViewOrderPage: React.FC = () =>  {
  const { selectedLanguage } = useContext(LanguageContext);

  const { orderId } = useParams<{ orderId: string }>();

  const initialExpandedRows: Record<string, boolean> = {};
  const [expandedRows, setExpandedRows] = useState(initialExpandedRows);

  const initialQuantities: Record<string, number> = {};
  const [dishQuantities, setDishQuantities] = useState(initialQuantities);

  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);

  const totalAmount = dishes
    .reduce((total, dish) => total + dish.quantity * dish.price, 0)
    .toFixed(2);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`/order-items-by-order/1`);
        const data = response.data;
        console.log(data);
        const transformedDishes: Dish[] = data.map((dish: any) => {
          return {
            id:  dish.id,
            name: dish.name,
            quantity: dish.quantity,
            price: dish.price,
          };
        });

        setDishes(transformedDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [orderId]);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};

    dishes.forEach((dish) => {
      initialQuantities[dish.id] = 0;
    });

    setDishQuantities(initialQuantities);
  }, [dishes]);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      yourOrder: "Заказ:",
      totalAmount: "ВСЕГО:",
      payment: "ПЛАЧУ Я",
      message1: "Выбери свои блюда <кликни на товар>",
      message2: "Выбери количество"
    },
    RO: {
      yourOrder: "Comanda:",
      totalAmount: "TOTAL:",
      payment: "PLĂTESC EU",
      message1: "Alege produsele tale <click pe produs>",
      message2: "Alege cantitatea"
    },
    EN: {
      yourOrder: "Order:",
      totalAmount: "TOTAL:",
      payment: "I’M PAYING",
      message1: "Choose your dishes <click on the item>",
      message2: "Select quantity"
    },
  };

  const handleRowClick = (rowKey: string) => {
    const newExpandedRows = Object.fromEntries(
      Object.keys(expandedRows).map((key) => [key, false])
    );

    setExpandedRows((prevExpandedRows) => ({
      ...newExpandedRows,
      [rowKey]: !prevExpandedRows[rowKey],
    }));
  };

  const handleIncrement = (
    rowKey: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    setDishQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[rowKey] || 0;
      const newQuantity = Math.min(
        dishes.find((dish) => dish.id === rowKey)?.quantity || 0,
        currentQuantity + 1
      );

      const newQuantities = {
        ...prevQuantities,
        [rowKey]: newQuantity,
      };

      if (
        newQuantity > 0 &&
        !selectedDishes.some((dish) => dish.id === rowKey)
      ) {
        setSelectedDishes([
          ...selectedDishes,
          dishes.find((dish) => dish.id === rowKey)!,
        ]);
      }

      return newQuantities;
    });
  };

  const handleDecrement = (
    rowKey: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    setDishQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [rowKey]: Math.max(0, prevQuantities[rowKey] - 1),
      };

      if (newQuantities[rowKey] === 0) {
        setSelectedDishes(selectedDishes.filter((dish) => dish.id !== rowKey));
      }

      return newQuantities;
    });
  };

  return (
    <div className="wrapper">
      <h2 className="order-header">
        {translations[selectedLanguage].yourOrder} {totalAmount}{" "}
        <span> (MDL)</span>{" "}
      </h2>
      {/*{selectedDishes.length == 0 && (*/}
      {/*    <div className="selected-dishes">*/}
      {/*      <h3>*/}
      {/*          {translations[selectedLanguage].message1}{<img className="click" src={ClickIcon} alt="+" />}*/}
      {/*      </h3>*/}
      {/*      <h3>*/}
      {/*          {translations[selectedLanguage].message2}{<img className="sign" src={MinusSign} alt="+" />}/<img className="sign" src={PlusSign} alt="+"/>*/}
      {/*      </h3>*/}
      {/*  </div>*/}
      {/*)}*/}
      {selectedDishes.length > 0 && (
        <div className="selected-dishes">
          <h2>
                {translations[selectedLanguage].payment}{":  "}
                {selectedDishes
                  .reduce(
                    (total, dish) =>
                      total + dishQuantities[dish.id] * dish.price,
                    0
                  )
                  .toFixed(2)}{" "}
                MDL
              </h2>
          <div className="selected-dishes-text">
            {selectedDishes.map((dish) => (
              <div className="dish-price" key={dish.id}>
                <p className="dish-name">
                  {dish.name.toUpperCase()}
                </p>
                <p className="dish-quantity">{`[${
                  dishQuantities[dish.id]
                }] = ${(dishQuantities[dish.id] * dish.price)}`}</p>
              </div>
            ))}
          </div>
          {/* <button onClick={handlePayClick}>
            <img src={PaymentIcon} alt="" />
            <span>{translations[selectedLanguage].payment}</span>
          </button> */}
        </div>
      )}
      <div className="order-container">
        {dishes.map((dish) => (
          <DishRow
            key={dish.id}
            dish={dish}
            expanded={expandedRows[dish.id]}
            onRowClick={() => handleRowClick(dish.id)}
            onIncrement={(e) => handleIncrement(dish.id, e)}
            onDecrement={(e) => handleDecrement(dish.id, e)}
            dishQuantities={dishQuantities}
          />
        ))}
      </div>
      
    </div>
  );
};

export default ViewOrderPage;
