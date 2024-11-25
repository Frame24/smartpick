import React from 'react';

const Searchbar = () => {
    return (
        <div className="relative w-80">
            <input
                type="text"
                placeholder="Поиск категорий и товаров..."
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 4a6 6 0 100 12 6 6 0 000-12zM21 21l-5.75-5.75"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Searchbar;
