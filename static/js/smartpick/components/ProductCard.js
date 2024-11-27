// ProductCard.js

import React, { useState, useEffect } from "react";
import { toggleFavoriteProduct, isFavorite } from "../utils/apiUtils.js";

const ProductCard = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(true);

    // Проверяем, добавлен ли продукт в избранное
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const status = await isFavorite(product.id, null); // null для категории
            if (status !== null) {
                setIsFavorited(status);
            }
            setLoading(false);
        };
        fetchFavoriteStatus();
    }, [product.id]);

    const handleFavoriteClick = async () => {
        setLoading(true); // Отображаем состояние загрузки
        const newStatus = await toggleFavoriteProduct(product.id);
        if (newStatus !== null) {
            setIsFavorited(newStatus);
        }
        setLoading(false); // Убираем состояние загрузки
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow relative">
            <button
                className={`absolute top-2 right-2 text-xl p-2 rounded focus:outline-none ${
                    isFavorited ? "text-yellow-500" : "text-gray-400"
                } ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-yellow-600"}`}
                onClick={handleFavoriteClick}
                disabled={loading} // Блокируем кнопку во время загрузки
            >
                <i
                    className={`fa-star ${isFavorited ? "fa-solid" : "fa-regular"}`}
                    style={{ color: "#FFD43B" }}
                ></i>
            </button>

            <h2 className="text-lg font-semibold mb-2">
                <a href={`/product/${product.id}/`} className="text-blue-500 hover:underline">
                    {product.name}
                </a>
            </h2>
            <p className="text-gray-600">Категория: {product.category?.name || "Без категории"}</p>
            {product.url && (
                <p>
                    <a href={product.url} className="text-blue-500 hover:underline">
                        Ссылка на продукт
                    </a>
                </p>
            )}
            <p>
                Средний рейтинг: {product.avg_rating?.toFixed(1) || "Нет данных"} ({product.reviews_count || 0} отзывов)
            </p>
        </div>
    );
};

export default ProductCard;
