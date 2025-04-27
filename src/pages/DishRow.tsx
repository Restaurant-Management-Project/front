import React from "react";
// import { useContext } from "react";
// import { LanguageContext } from "../App";
// import PlusSign from "../assets/plus.png";
// import MinusSign from "../assets/minus.png";
import "../styles/ViewOrderPage.css";

interface Dish {
  id: string;
  name: string ;
  quantity: number;
  price: number;
}

interface DishRowProps {
  dish: Dish;
  expanded: boolean;
  onRowClick: () => void;
  onIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dishQuantities: Record<string, number>;
}

const DishRow: React.FC<DishRowProps> = ({
  dish,
  expanded,
  onRowClick,
  // onIncrement,
  // onDecrement,
  // dishQuantities,
}) => {
  // const { selectedLanguage } = useContext(LanguageContext);
  //
  // const translations: Record<string, Record<string, string>> = {
  //   RU: {
  //     payment: "ОПЛАЧУ Я",
  //   },
  //   RO: {
  //     payment: "PLĂTESC EU",
  //   },
  //   EN: {
  //     payment: "I’M PAYING",
  //   },
  // };

  return (
    <React.Fragment>
      {expanded ? (
        <div className="expanded-row" onClick={onRowClick}>
          <p className="expanded-name">
            {(dish.name)}
          </p>
          <p>{`${dish.quantity} x ${Number(dish.price)} = ${(
            dish.quantity * Number(dish.price)
          )} MDL`}</p>
          {/*<div className="buttons">*/}
          {/*  <span>{translations[selectedLanguage].payment}</span>*/}
          {/*  <button onClick={onDecrement}>*/}
          {/*    <img src={MinusSign} alt="-" />*/}
          {/*  </button>*/}
          {/*  <p className="number">{dishQuantities[dish.id]}</p>*/}
          {/*  <button onClick={onIncrement}>*/}
          {/*    <img src={PlusSign} alt="+" />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      ) : (
        <div className="order-row" onClick={onRowClick}>
          <p className="name">{dish.name.toUpperCase()}</p>
          <p className="quantity">[{dish.quantity}]</p>
          <p className="price">{(dish.quantity * Number(dish.price))}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default DishRow;
