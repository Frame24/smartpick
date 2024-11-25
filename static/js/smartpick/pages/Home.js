import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [statistics, setStatistics] = useState({});
    const [recentReviews, setRecentReviews] = useState([]);

    useEffect(() => {
        // Загружаем статистику
        axios.get('/api/statistics/')
            .then(response => setStatistics(response.data))
            .catch(error => console.error('Ошибка при загрузке статистики:', error));

        // Загружаем последние отзывы
        axios.get('/api/recent-reviews/')
            .then(response => setRecentReviews(response.data))
            .catch(error => console.error('Ошибка при загрузке отзывов:', error));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Добро пожаловать на главную страницу аналитики отзывов</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg shadow transform transition-transform hover:scale-105 duration-300">
                    <h2 className="text-md font-semibold mb-1">Категории</h2>
                    <p className="text-gray-600 text-xl font-bold">{statistics.categories_count || '...'}</p>
                    <p className="text-gray-500 text-sm">Всего категорий</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow transform transition-transform hover:scale-105 duration-300">
                    <h2 className="text-md font-semibold mb-1">Товары</h2>
                    <p className="text-gray-600 text-xl font-bold">{statistics.products_count || '...'}</p>
                    <p className="text-gray-500 text-sm">Всего товаров</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-md font-semibold mb-4">Последние товары</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentReviews.map((review, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg transform transition-transform hover:scale-105 duration-300">
                            <h3 className="text-sm font-semibold">{review.product.name}</h3>
                            <p className="text-gray-600 text-sm">{review.key_thought}</p>
                            <p className="text-gray-500 text-xs">Рейтинг: {review.avg_rating} / 5</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
