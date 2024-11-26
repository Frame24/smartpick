import React from 'react';

const RecentAggregatedReviews = ({ reviews }) => {
    console.log("Полученные отзывы для отображения:", reviews);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-md font-semibold mb-4">Последние отзывы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-4 bg-gray-50 rounded-lg transform transition-transform hover:scale-105 duration-300"
                        >
                            <h3 className="text-sm font-semibold">{review.productName || 'Без названия'}</h3>
                            <p className="text-gray-600 text-sm">
                                {review.keyThoughts.join('; ') || 'Описание отсутствует'}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Рейтинг: {review.avg_rating || 'N/A'} / 5
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Отсутствуют данные для отображения отзывов.</p>
                )}
            </div>
        </div>
    );
};

export default RecentAggregatedReviews;
