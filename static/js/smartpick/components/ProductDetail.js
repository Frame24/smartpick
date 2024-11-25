import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams(); // Получаем ID продукта из URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`/api/products/${id}/`);
            setProduct(response.data);
        } catch (error) {
            console.error('Ошибка загрузки данных продукта:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Описание</h2>
                <p>{product.description}</p>
                <p>
                    <strong>Категория:</strong> {product.category}
                </p>
                <p>
                    <strong>Средний рейтинг:</strong> {product.avg_rating.toFixed(1)}
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-semibold">Отзывы</h2>
                <ul>
                    {product.reviews.map((review) => (
                        <li key={review.id} className="mb-4 border-b pb-4">
                            <p>{review.review_full_text}</p>
                            <p>
                                <strong>Рейтинг:</strong> {review.review_rating}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetail;
