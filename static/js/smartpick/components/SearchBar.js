import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const response = await fetch(`/search/?q=${value}`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка сети или сервера');
                }

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Ошибка при поиске:', error);
            }
        } else {
            setResults([]);
        }
    };



    return (
        <div className="relative w-80">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Поиск категорий и товаров..."
                className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <a href={`/search/?q=${query}`} className="cursor-pointer">
                    <svg
                        className="h-5 w-5 text-gray-500 hover:text-gray-700"
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
                </a>

            </div>
            {results.length > 0 && (
                <div className="absolute z-50 w-full bg-white shadow-lg mt-2 max-h-60 overflow-y-auto">
                    {results.map((item) => (
                        <a
                            key={item.id}
                            href={item.url || '#'}
                            className="block p-2 border-b hover:bg-gray-100"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            )}

        </div>
    );
};

export default SearchBar;
