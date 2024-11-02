import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    const bgImageUrl = window.__INITIAL_DATA__.bgImageUrl;
    
    return (
        <div className="home-container">
            {/* Header / Navigation Menu */}
            <header className='fixed top-0 left-0 w-full bg-black bg-opacity-70 shadow-md z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <a href='#' className='text-xl sm:text-2xl font-bold text-white'>
                        АСУРСОФТ
                    </a>
                    <button
                        className='sm:hidden text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md'
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
                        )}
                    </button>
                    <nav
                        className={`${isMenuOpen ? 'block' : 'hidden'} sm:block absolute top-full left-0 w-full bg-black bg-opacity-70 sm:relative sm:w-auto sm:flex sm:items-center sm:space-x-4 p-0 sm:p-0 sm:shadow-none border-t border-gray-700 sm:border-0`}
                    >
                        <ul className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6'>
                            <li>
                                <a
                                    href='#about'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#services'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Услуги
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#contacts'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 py-2 sm:py-0 px-4 sm:px-0 rounded-lg transition duration-300'
                                >
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImageUrl})`,
                }}
            >
                <div className='relative z-10 text-center px-2 sm:px-4'>
                    <h1 className='text-4xl sm:text-6xl font-bold mb-4'>
                        Разработка IT-решений с использованием Искусственного интеллекта
                    </h1>
                </div>
            </section>
        </div>
    );
};

export default Home;
