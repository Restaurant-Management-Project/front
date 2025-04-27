import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import "../styles/ViewMenuPage.css";
import { LanguageContext } from "../App";

type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: string;
    is_available: boolean;
    created_at: string;
};

const ViewMenuPage: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const { selectedLanguage } = useContext(LanguageContext);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("/menu-items/");
                setMenuItems(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const translations: Record<string, Record<string, string>> = {
        EN: {
            pageTitle: "Menu",
            available: "Available",
            notAvailable: "Not Available",
            price: "Price",
        },
        RO: {
            pageTitle: "Meniu",
            available: "Disponibil",
            notAvailable: "Indisponibil",
            price: "Preț",
        },
        RU: {
            pageTitle: "Меню",
            available: "Доступно",
            notAvailable: "Недоступно",
            price: "Цена",
        },
    };

    const t = translations[selectedLanguage];

    return (
        <div className="wrapper">
            <h2>{t.pageTitle}</h2>
            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div key={item.id} className={`menu-card ${item.is_available ? "" : "disabled"}`}>
                        <div className="menu-card-header">
                            <h3>{item.name}</h3>
                            <span className="price-tag">{item.price} MDL</span>
                        </div>
                        <p className="description">{item.description}</p>
                        <span className={`availability ${item.is_available ? "available" : "not-available"}`}>
              {item.is_available ? t.available : t.notAvailable}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewMenuPage;
