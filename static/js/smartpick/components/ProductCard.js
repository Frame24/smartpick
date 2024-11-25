import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">
                <a
                    href={`/products/${product.id}`}
                    className="text-blue-500 hover:underline"
                >
                    {product.name}
                </a>
            </h2>
            <p className="text-gray-600">Категория: {product.category.name}</p>
            {product.url && (
                <p>
                    <a
                        href={product.url}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ссылка на продукт
                    </a>
                </p>
            )}
            <p>
                Средний рейтинг: {product.avg_rating.toFixed(1)} (
                {product.reviews_count} отзывов)
            </p>
        </div>
    );
};

export default ProductCard;
