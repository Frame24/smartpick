import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import ProductDetail from './components/ProductDetail';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <div id="app" className="min-h-screen flex flex-col">
                <Header />
                <main className="container mx-auto px-4 py-6 flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        {/* Добавьте другие маршруты по необходимости */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
