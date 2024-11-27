import React, { useState, useEffect } from "react";
import { toggleFavoriteCategory, isFavorite } from "../utils/apiUtils.js";

const CategoryCard = ({ category }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);

    // Проверяем, добавлена ли категория в избранное
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const status = await isFavorite(null, category.id); // null для продукта
            if (status !== null) {
                setIsFavorited(status);
            }
            setLoading(false);
        };
        fetchFavoriteStatus();
    }, [category.id]);

    const handleFavoriteClick = async () => {
        setLoading(true);
        const newStatus = await toggleFavoriteCategory(category.id);
        if (newStatus !== null) {
            setIsFavorited(newStatus);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow relative">
            <button
                className={`absolute top-2 right-2 text-xl p-2 rounded focus:outline-none ${
                    isFavorited ? "text-yellow-500" : "text-gray-400"
                } ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-yellow-600"}`}
                onClick={handleFavoriteClick}
                disabled={loading}
            >
                <i
                    className={`fa-star ${isFavorited ? "fa-solid" : "fa-regular"}`}
                    style={{ color: "#FFD43B" }}
                ></i>
            </button>

            <h2 className="text-lg font-semibold mb-2">
                <a href={category.url} className="text-blue-500 hover:underline">
                    {category.name}
                </a>
            </h2>
            <p className="text-gray-600">Подкатегории: {category.subcategories_count || 0}</p>
            <p className="text-gray-600">Товары: {category.products_count || 0}</p>
        </div>
    );
};

export default CategoryCard;
