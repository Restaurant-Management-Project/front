import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../App";
import DishRow from "./DishRow";
import axios from "../axiosConfig";
import PaymentIcon from "../assets/payment.png";
import { useTableId } from "./TableIdContext";
import "../styles/ViewOrderPage.css";

interface Dish {
  key: string;
  name: { [key: string]: string };
  quantity: number;
  price: number;
}

const ViewOrderPage: React.FC = () => {
  const { selectedLanguage } = useContext(LanguageContext);

  const initialExpandedRows: Record<string, boolean> = {};
  const [expandedRows, setExpandedRows] = useState(initialExpandedRows);

  const initialQuantities: Record<string, number> = {};
  const [dishQuantities, setDishQuantities] = useState(initialQuantities);

  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const { tableId } = useTableId();

  const totalAmount = dishes
    .reduce((total, dish) => total + dish.quantity * dish.price, 0)
    .toFixed(2);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`/get-by-table/${tableId}`);
        const data = response.data;

        const transformedDishes: Dish[] = data.map((dish: any) => {
          let parsedName = {};
          if (dish.productName) {
            try {
              parsedName = JSON.parse(dish.productName);
            } catch (error) {
              console.error("Error parsing dish name:", error);
            }
          }

          return {
            key: dish.key,
            name: parsedName,
            quantity: dish.quantity,
            price: dish.productPrice,
          };
        });

        setDishes(transformedDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};

    dishes.forEach((dish) => {
      initialQuantities[dish.key] = 0;
    });

    setDishQuantities(initialQuantities);
  }, [dishes]);

  const translations: Record<string, Record<string, string>> = {
    RU: {
      yourOrder: "Заказ:",
      totalAmount: "ВСЕГО:",
      payment: "ПЛАЧУ Я",
    },
    RO: {
      yourOrder: "Comanda:",
      totalAmount: "TOTAL:",
      payment: "PLĂTESC EU",
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
        dishes.find((dish) => dish.key === rowKey)?.quantity || 0,
        currentQuantity + 1
      );

      const newQuantities = {
        ...prevQuantities,
        [rowKey]: newQuantity,
      };

      if (
        newQuantity > 0 &&
        !selectedDishes.some((dish) => dish.key === rowKey)
      ) {
        setSelectedDishes([
          ...selectedDishes,
          dishes.find((dish) => dish.key === rowKey)!,
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
        setSelectedDishes(selectedDishes.filter((dish) => dish.key !== rowKey));
      }

      return newQuantities;
    });
  };

  const handlePayClick = () => {
    console.log("Payment process initiated");
    console.log("Selected Dishes:", selectedDishes);
  };

  return (
    <div className="wrapper">
      <h2 className="order-header">
        {translations[selectedLanguage].yourOrder} {totalAmount}{" "}
        <span> (MDL)</span>{" "}
      </h2>
      <div className="order-container">
        {dishes.map((dish) => (
          <DishRow
            key={dish.key}
            dish={dish}
            expanded={expandedRows[dish.key]}
            onRowClick={() => handleRowClick(dish.key)}
            onIncrement={(e) => handleIncrement(dish.key, e)}
            onDecrement={(e) => handleDecrement(dish.key, e)}
            dishQuantities={dishQuantities}
          />
        ))}
      </div>
      {selectedDishes.length > 0 && (
        <div className="selected-dishes">
          <div className="selected-dishes-text">
            {selectedDishes.map((dish) => (
              <div className="dish-price" key={dish.key}>
                <p className="dish-name">
                  {dish.name[selectedLanguage].toUpperCase()}
                </p>
                <p className="dish-quantity">{`[${
                  dishQuantities[dish.key]
                }] = ${(dishQuantities[dish.key] * dish.price).toFixed(2)}`}</p>
              </div>
            ))}
            <div className="total-amount-container">
              <p>
                {translations[selectedLanguage].totalAmount}{" "}
                {selectedDishes
                  .reduce(
                    (total, dish) =>
                      total + dishQuantities[dish.key] * dish.price,
                    0
                  )
                  .toFixed(2)}{" "}
                MDL
              </p>
            </div>
          </div>
          <button onClick={handlePayClick}>
            <img src={PaymentIcon} alt="" />
            <span>{translations[selectedLanguage].payment}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewOrderPage;
