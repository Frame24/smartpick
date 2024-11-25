import React from 'react';
import SearchBar from './SearchBar';

const Header = () => {
    const currentPath = window.location.pathname;

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

                {/* Поисковая строка */}
                <SearchBar />

                {/* Навигация */}
                <nav className="ml-6">
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="/"
                                className={`nav-link ${currentPath === '/'
                                        ? 'active'
                                        : ''
                                    }`}
                            >
                                Главная
                            </a>
                        </li>
                        <li>
                            <a
                                href="/products"
                                className={`nav-link ${currentPath === '/products'
                                        ? 'active'
                                        : ''
                                    }`}
                            >
                                Товары
                            </a>
                        </li>
                        <li>
                            <a
                                href="/categories"
                                className={`nav-link ${currentPath === '/categories'
                                        ? 'active'
                                        : ''
                                    }`}
                            >
                                Категории
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className={`nav-link ${currentPath === '/profile'
                                        ? 'active'
                                        : ''
                                    }`}
                            >
                                Личный Кабинет
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Секция "Фонд-М" */}
            <a
                href="https://fasie.ru/"
                className="absolute top-0 right-0 p-2 bg-gray-200 shadow-lg rounded-md flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300 no-underline"
            >
                <img
                    src="/static/images/fasie.png"
                    alt="Фонд содействия инновациям"
                    className="h-8 w-auto"
                />
                <div className="flex flex-col items-start">
                    <span className="font-bold">При поддержке</span>
                    <span className="text-blue-600 font-bold">Фонд-М</span>
                </div>
            </a>
        </header>
    );
};

export default Header;
