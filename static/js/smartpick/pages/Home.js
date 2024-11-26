import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Statistics from '../components/Statistics';
import RecentAggregatedReviews from '../components/RecentAggregatedReviews';

const Home = () => {
    const [statistics, setStatistics] = useState({
        total_products: 0,
        avg_rating: 0,
    });
    const [recentReviews, setRecentReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("Загрузка данных начата...");

            // Получение статистики
            const statsResponse = await axios.get('/api/products/statistics/');
            console.log("Статистика:", statsResponse.data);
            setStatistics(statsResponse.data);

            // Получение отзывов
            const reviewsResponse = await axios.get('/api/aggregated-reviews/?ordering=-created_at&limit=4');
            console.log("Отзывы (сырой ответ):", reviewsResponse.data.results);
            const reviews = reviewsResponse.data.results;

            // Дополнительные запросы для продуктов и ключевых мыслей
            const enrichedReviews = await Promise.all(
                reviews.map(async (review) => {
                    const productResponse = await axios.get(`/api/products/${review.product}/`);
                    const product = productResponse.data;

                    const keyThoughts = await Promise.all(
                        review.key_thoughts.map((id) =>
                            axios.get(`/api/key-thoughts/${id}/`).then((res) => res.data.thought_text)
                        )
                    );

                    return {
                        ...review,
                        productName: product.name,
                        keyThoughts,
                    };
                })
            );

            console.log("Отзывы (обогащенные данные):", enrichedReviews);
            setRecentReviews(enrichedReviews);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div className="text-center py-10">Загрузка...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Добро пожаловать на главную страницу аналитики отзывов</h1>
            <Statistics statistics={statistics} />
            <RecentAggregatedReviews reviews={recentReviews} />
        </div>
    );
};

export default Home;
