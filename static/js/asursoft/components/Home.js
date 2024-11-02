import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const bgImageUrl = window.__INITIAL_DATA__.bgImageUrl;
    const fasieImageUrl = window.__INITIAL_DATA__.fasieImageUrl;

    return (
        <div className="home-container">
            {/* Header / Navigation Menu */}
            <header className='fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50'>
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
                        className={`${isMenuOpen ? 'block' : 'hidden'} sm:block absolute shadow-none top-full left-0 w-full sm:relative sm:w-auto sm:flex sm:items-center sm:space-x-4 p-0 sm:p-0 sm:shadow-none sm:border-0`}
                    >
                        <ul className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-transparent'>
                            <li>
                                <a
                                    href='#about'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 rounded-lg transition duration-300 bg-transparent'

                                >
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#services'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 rounded-lg transition duration-300 bg-transparent'

                                >
                                    Услуги
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#contacts'
                                    className='text-lg sm:text-base text-white hover:text-gray-400 rounded-lg transition duration-300 bg-transparent'

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
                className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImageUrl})`,
                }}
            >
                <div className="relative z-10 text-center px-2 sm:px-4">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                        Разработка IT-решений с использованием Искусственного интеллекта
                    </h1>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="about-section py-20 bg-gray-100 flex items-center min-h-[70vh]"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">О компании</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        ООО "АСУРСОФТ" основана в 2023 году и является стартапом. Основной упор деятельности компании — разработка приложений в области искусственного интеллекта.
                    </p>
                    <p className="text-lg text-gray-700">
                        Текущим проектом является разработка приложения для продвижения товаров на основе отзывов покупателей маркетплейсов с применением ИИ. Данный проект получил грант при поддержке Фонда содействия инновациям по программе «Студенческий стартап».
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section
                id='services' className="services-section py-20 bg-white flex items-center min-h-[70vh]"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Услуги</h2>
                    <div className="text-left">
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900">Разработка модуля ИИ</h3>
                            <p className="text-lg text-gray-700">
                                Разработаем модуль искусственного интеллекта для вашей задачи с использованием нейронных сетей и алгоритмов машинного обучения на языке Python.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900">Разработка оконных приложений</h3>
                            <p className="text-lg text-gray-700">
                                Разработаем оконное приложение для операционной системы Windows на языке C# с использованием фреймворка .net и WPF.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900">Создание веб-сайтов и лендингов</h3>
                            <p className="text-lg text-gray-700">
                                Разработаем полноценное веб-приложение на Django или динамичный лендинг на JavaScript+React+Node.js.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">Цена - по запросу заказчика.</h3>
                        </div>
                    </div>
                </div>
            </section>


            {/* Technologies Section */}
            <section className="technologies-section py-20 bg-gray-100 min-h-[70vh] flex items-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Используемые технологии ООО "АСУРСОФТ"</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-10">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Языки программирования:</h3>
                            <p className="text-lg text-gray-700 space-y-2">
                                Python 3.8, 3.9, 3.10<br />C#<br />JavaScript
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Фреймворки:</h3>
                            <p className="text-lg text-gray-700 space-y-2">
                                .NET Framework 6.0<br />WPF .NET<br />Django 4
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Базы данных:</h3>
                            <p className="text-lg text-gray-700 space-y-2">
                                SQLite<br />PostgreSQL<br />MySQL
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 text-left">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Библиотеки Python для машинного обучения:</h3>
                            <p className="text-lg text-gray-700 space-y-2">
                                NumPy<br />Pandas<br />Matplotlib<br />Scikit-learn<br />TensorFlow<br />PyTorch
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Другие технологии:</h3>
                            <p className="text-lg text-gray-700 space-y-2">
                                Git - система управления версиями<br />Docker - средство контейнеризации
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Development Section */}
            <section className="development-section py-20 bg-white min-h-[70vh] flex items-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши разработки</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        На данный момент компания разрабатывает приложение для продвижения товаров на основе отзывов покупателей маркетплейсов с применением искусственного интеллекта при поддержке фонда содействия инновациям.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Основной идеей приложения является формирование списка достоинств и недостатков товаров на основе мнения потребителей. С помощью аналитики отзывов продавец сможет определить перспективы товара и принять решение о его закупке и выводе на рынок.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">Приложение будет выполнять следующие задачи:</p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li>Формирование списка ключевых характеристик товара с оценкой их значимости.</li>
                        <li>Генерация текста для заполнения раздела "описание товара" в карточке товара на сайте маркетплейса.</li>
                        <li>Расчет коэффициента для коррекции цены на основе мнения потребителей и качества товара.</li>
                    </ul>
                </div>
            </section>

            {/* Support Section */}
            <section className="support-section py-24 bg-gray-100 min-h-[70vh] flex items-center">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Нас поддерживают</h2>
                    <h3 className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                        Проект <span className="font-semibold text-black">Smart-pick</span> по аналитике отзывов выполнен при поддержке
                        <br />
                        «Фонда содействия инновациям» в рамках федерального проекта
                        <br />
                        «Платформа университетского технологического предпринимательства»
                    </h3>
                    <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                        Этот проект направлен на создание инструментов для анализа и обработки отзывов,
                        что способствует улучшению продуктов и услуг с применением современных технологий.
                    </p>
                    <a href="https://fasie.ru/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={fasieImageUrl}
                            alt="Фонд содействия инновациям"
                            className="mx-auto mt-10"
                        />
                    </a>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacts" className="contact-section py-20 bg-white min-h-[70vh] flex items-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xl font-semibold text-gray-900 mb-4">
                        По всем вопросам свяжитесь с нами любым удобным способом:
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        E-mail: <a href="mailto:hks9@yandex.ru" className="font-semibold">hks9@yandex.ru</a>
                    </p>
                    <p className="text-lg text-gray-700">
                        Телефон: <a href="tel:+79097419498" className="font-semibold">+7 909 741 9498</a>
                    </p>
                </div>
            </section>


            {/* Footer */}
            <footer className="footer bg-black py-4 text-center">
                <p className="text-sm text-gray-400">
                    2024 © ООО «АСУРСОФТ» ИНН: 7203563795 ОГРН: 1237200017559. Все права защищены.
                </p>
            </footer>
        </div>
    );
};

export default Home;
