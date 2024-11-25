import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (loading) return; // Защита от повторного запроса
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/?page=${page}`);
            setProducts((prev) => [...prev, ...response.data.results]);
            setHasNext(response.data.next !== null);
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (hasNext) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Товары</h1>
            <div
                id="product-container"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {loading && (
                <div
                    id="loading-message"
                    style={{ textAlign: 'center', marginTop: '20px' }}
                >
                    Загрузка товаров...
                </div>
            )}
            {hasNext && !loading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className="btn btn-primary"
                        onClick={loadMore}
                    >
                        Загрузить больше
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
