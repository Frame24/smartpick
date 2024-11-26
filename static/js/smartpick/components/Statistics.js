import React from 'react';

const Statistics = ({ statistics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-3 rounded-lg shadow transform transition-transform hover:scale-105 duration-300">
                <h2 className="text-md font-semibold mb-1">Продукты</h2>
                <p className="text-gray-600 text-xl font-bold">{statistics.total_products}</p>
                <p className="text-gray-500 text-sm">Всего продуктов</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow transform transition-transform hover:scale-105 duration-300">
                <h2 className="text-md font-semibold mb-1">Средний рейтинг</h2>
                <p className="text-gray-600 text-xl font-bold">{statistics.avg_rating.toFixed(2)}</p>
                <p className="text-gray-500 text-sm">Средний рейтинг всех продуктов</p>
            </div>
        </div>
    );
};

export default Statistics;
