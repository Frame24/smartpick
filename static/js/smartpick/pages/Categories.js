import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItem from '../components/CategoryItem';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories/');
            setCategories(response.data.results); // Предполагаем, что API возвращает список категорий
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка категорий...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Категории</h1>
            <ul className="list-disc ml-6">
                {categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </ul>
        </div>
    );
};

export default Categories;
