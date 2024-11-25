import React from 'react';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Логотип */}
                <a href="/" className="text-xl font-bold flex flex-col items-start no-select logo-link">
                    <div className="logo-text text-4xl font-bold text-gray-900">
                        <span className="mr-1">Smart</span>
                        <span className="text-blue-600">Pick</span>
                    </div>
                    <div className="logo-subtext text-sm text-center mt-1">
                        <span className="text-blue-600 font-bold">&mdash;</span>
                        CHOOSE WISELY
                        <span className="text-blue-600 font-bold">&mdash;</span>
                    </div>
                </a>

                {/* Строка поиска */}
                <SearchBar />

                {/* Навигация */}
                <nav className="ml-6">
                    <ul className="flex space-x-4">
                        <li><a href="/" className="nav-link">Главная</a></li>
                        <li><a href="/products" className="nav-link">Товары</a></li>
                        <li><a href="/categories" className="nav-link">Категории</a></li>
                        <li><a href="/profile" className="nav-link">Личный Кабинет</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
