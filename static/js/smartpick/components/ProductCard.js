import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">
                <a href={`/product/${product.id}/`} className="text-blue-500 hover:underline">
                    {product.name}
                </a>
            </h2>
            <p className="text-gray-600">Категория: {product.category?.name || 'Без категории'}</p>
            {product.url && (
                <p>
                    <a href={product.url} className="text-blue-500 hover:underline">
                        Ссылка на продукт
                    </a>
                </p>
            )}
            <p>
                Средний рейтинг: {product.avg_rating?.toFixed(1) || 'Нет данных'} ({product.reviews_count || 0} отзывов)
            </p>
        </div>
    );
};

export default ProductCard;
