import React from "react";

const LandingPage = () => {
  const fasieImageUrl = window.__INITIAL_DATA__.fasieImageUrl;
  return (
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="text-center flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white min-h-screen relative"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-extrabold mb-6">Smart Pick AI</h1>
          <p className="text-2xl mt-4 mb-6 max-w-2xl mx-auto leading-relaxed">
            Ваш помощник в выборе трендовых товаров на маркетплейсах.
            Повышайте продажи с помощью анализа отзывов и оптимизации карточек товаров.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 w-48 bg-white text-blue-500 rounded font-semibold shadow hover:bg-gray-100">
              Попробовать бесплатно
            </button>
            <button className="px-6 py-3 w-48 bg-blue-700 text-white rounded font-semibold shadow hover:bg-blue-800">
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-white text-gray-800 min-h-[66vh] flex flex-col justify-center items-center"
      >
        <div className="container mx-auto px-4 text-center">
          {/* Заголовок и описание */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">О проекте</h2>
            <p className="text-lg max-w-2xl mx-auto">
              <strong>Smart Pick AI</strong> — это инновационный инструмент, созданный для помощи
              продавцам на маркетплейсах. Мы начинаем свой путь, но уже готовы
              предложить аналитику отзывов, выявление трендов и полезные рекомендации.
            </p>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Наш продукт разработан, чтобы повысить эффективность работы продавцов и
              помочь им принимать более обоснованные решения. Smart Pick AI идеально
              подходит как для начинающих, так и для опытных продавцов.
            </p>
          </div>

          {/* Горизонтальная схема */}
          <div className="flex justify-center items-start gap-8 flex-wrap">
            {/* Шаг 1 */}
            <div className="flex flex-col items-center mt-6">
              <div className="bg-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold transition-transform duration-300 hover:scale-105">
                <i className="fas fa-comments"></i>
              </div>
              <p className="font-bold text-base mt-3 text-center">Отзывы пользователей</p>
            </div>

            {/* Стрелка */}
            <div className="h-4 w-4 bg-gradient-to-r from-blue-500 to-indigo-500 transform rotate-45 self-center"></div>

            {/* Шаг 2 */}
            <div className="flex flex-col items-center mt-6">
              <div className="bg-indigo-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold transition-transform duration-300 hover:scale-105">
                <i className="fas fa-cogs"></i>
              </div>
              <p className="font-bold text-base mt-3 text-center">Предобработка текста</p>
            </div>

            {/* Стрелка */}
            <div className="h-4 w-4 bg-gradient-to-r from-indigo-500 to-green-500 transform rotate-45 self-center"></div>

            {/* Шаг 3 */}
            <div className="flex flex-col items-center mt-6">
              <div className="bg-green-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold transition-transform duration-300 hover:scale-105">
                <i className="fas fa-project-diagram"></i>
              </div>
              <p className="font-bold text-base mt-3 text-center">Кластеризация</p>
              <p className="text-xs text-gray-600 text-center">(BERT, косинусное расстояние)</p>
            </div>

            {/* Стрелка */}
            <div className="h-4 w-4 bg-gradient-to-r from-green-500 to-yellow-500 transform rotate-45 self-center"></div>

            {/* Шаг 4 */}
            <div className="flex flex-col items-center mt-6">
              <div className="bg-yellow-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold transition-transform duration-300 hover:scale-105">
                <i className="fas fa-chart-bar"></i>
              </div>
              <p className="font-bold text-base mt-3 text-center">Анализ кластеров</p>
              <ul className="text-xs text-gray-600 text-center mt-1">
                <li>→ Позитивные аспекты</li>
                <li>→ Негативные аспекты</li>
                <li>→ Средний рейтинг</li>
              </ul>
            </div>

            {/* Стрелка */}
            <div className="h-4 w-4 bg-gradient-to-r from-yellow-500 to-purple-500 transform rotate-45 self-center"></div>

            {/* Шаг 5 */}
            <div className="flex flex-col items-center mt-6">
              <div className="bg-purple-500 text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold transition-transform duration-300 hover:scale-105">
                <i className="fas fa-check-circle"></i>
              </div>
              <p className="font-bold text-base mt-3 text-center">Вывод аналитики</p>
            </div>
          </div>
        </div>
      </section>


      <section
        id="features"
        className="bg-gray-100 text-gray-800 min-h-[66vh] flex items-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Основные возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                <i className="fas fa-comments text-blue-500 text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Анализ отзывов покупателей</h3>
              <p className="text-lg">
                Получайте детальную информацию о том, что ценят клиенты и какие аспекты товаров требуют улучшения.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                <i className="fas fa-search text-indigo-500 text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Выявление ключевых характеристик</h3>
              <p className="text-lg">
                Система автоматически определяет важные атрибуты товаров, которые наиболее влияют на выбор клиентов.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                <i className="fas fa-chart-line text-green-500 text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Рекомендации по трендовым продуктам</h3>
              <p className="text-lg">
                Получайте рекомендации по трендовым товарам, которые помогут увеличить ваши продажи и расширить ассортимент.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="bg-white text-gray-800 min-h-[66vh] flex items-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Скриншоты интерфейса</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Screenshot 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 h-64 w-full rounded-lg shadow-lg"></div>
              <p className="mt-4 text-lg text-center">Главная страница аналитики</p>
            </div>

            {/* Screenshot 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 h-64 w-full rounded-lg shadow-lg"></div>
              <p className="mt-4 text-lg text-center">Детальная информация по отзывам</p>
            </div>

            {/* Screenshot 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 h-64 w-full rounded-lg shadow-lg"></div>
              <p className="mt-4 text-lg text-center">Рекомендации по товарам</p>
            </div>
          </div>
        </div>
      </section>


      {/* Audience Section */}
      <section
        id="audience"
        className="bg-gray-100 text-gray-800 min-h-[66vh] flex items-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Для кого подходит продукт</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Блок для новичков */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
              <i className="fas fa-seedling text-green-500 text-5xl mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Новички</h3>
              <p className="text-lg">
                Помогаем сделать первый шаг на маркетплейсе, выбрать ассортимент и минимизировать риски.
              </p>
            </div>

            {/* Блок для опытных продавцов */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
              <i className="fas fa-chart-line text-blue-500 text-5xl mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2">Опытные продавцы</h3>
              <p className="text-lg">
                Улучшайте показатели и принимайте обоснованные решения с помощью аналитики и рекомендаций.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Facie section */}
      <section
        id="support"
        className="support-section py-24 bg-white min-h-[70vh] flex items-center"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Нас поддерживают</h2>
          <h3 className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
            Проект <span className="font-semibold text-black">Smart Pick AI</span> по аналитике отзывов выполнен при поддержке
            <br />
            «Фонда содействия инновациям» в рамках федерального проекта
            <br />
            «Платформа университетского технологического предпринимательства».
          </h3>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Этот проект направлен на создание инструментов для анализа и обработки отзывов, что способствует улучшению
            продуктов и услуг с применением современных технологий.
          </p>
          <a
            href="https://fasie.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src={fasieImageUrl}
              alt="Фонд содействия инновациям"
              className="mx-auto mt-10 max-h-28"
            />
          </a>
        </div>
      </section>



      {/* Call to Action Section */}
      <section
        id="cta"
        className="bg-blue-500 text-white min-h-[66vh] flex items-center justify-center"
      >
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Попробуйте Smart Pick AI</h2>
          <p className="text-lg mb-6">
            Присоединяйтесь к первым пользователям и помогите сделать продукт лучше.
            Получите доступ к инструменту для анализа отзывов и выбора трендовых товаров.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-500 rounded font-semibold shadow hover:bg-gray-100">
              Попробовать бесплатно
            </button>
            <button className="px-6 py-3 bg-blue-700 text-white rounded font-semibold shadow hover:bg-blue-800">
              Узнать больше
            </button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Smart Pick. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
