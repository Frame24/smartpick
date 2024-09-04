import '../sass/project.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js/auto';

/* Project specific Javascript goes here. */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';  // Используем axios для выполнения запросов

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            suggestions: [],
            showSuggestions: false,
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.debouncedFetchSuggestions = this.debounce(this.fetchSuggestions, 300);  // Дебаунс запросов
    }

    // Дебаунс для ограничения частоты запросов
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Асинхронная функция для получения предложений с сервера
    async fetchSuggestions(query) {
        if (query.length > 1) {
            try {
                const response = await axios.get(`/search-autocomplete/?q=${query}`);
                this.setState({
                    suggestions: response.data,  // Ожидаем массив данных от API
                    showSuggestions: response.data.length > 0,
                });
            } catch (error) {
                console.error('Ошибка при загрузке предложений:', error);
            }
        } else {
            this.setState({ suggestions: [], showSuggestions: false });
        }
    }

    // Обработка ввода текста в поле поиска
    handleSearchInput(e) {
        const query = e.target.value;
        this.setState({ query });
        this.debouncedFetchSuggestions(query);  // Вызываем функцию поиска с дебаунсом
    }

    // Обработка отправки формы (если необходимо)
    handleSearchSubmit(e) {
        e.preventDefault();
        console.log('Поиск отправлен с запросом:', this.state.query);
    }

    render() {
        return (
            <div className="search-bar relative w-80">
                <form onSubmit={this.handleSearchSubmit}>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.handleSearchInput}
                        placeholder="Поиск категорий и товаров..."
                        className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autocomplete="off"
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17l-5-5m0 0l-5-5m5 5h12" />
                        </svg>
                    </button>
                </form>

                {this.state.showSuggestions && (
                    <div id="search-results" className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full">
                        {this.state.suggestions.map((item, index) => (
                            <div key={index} className="p-2 border-b hover:bg-gray-100">
                                <a href={item.url}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBar;




// Dashboard Component in React
// class Dashboard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             category: 'all',
//             reviewsData: {
//                 labels: ['5 звезд', '4 звезды', '3 звезды', '2 звезды', '1 звезда'],
//                 datasets: [{
//                     label: 'Отзывы',
//                     data: [65, 59, 80, 81, 56],
//                     backgroundColor: [
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(153, 102, 255, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgba(75, 192, 192, 1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(255, 99, 132, 1)',
//                         'rgba(153, 102, 255, 1)'
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             categoryData: {
//                 labels: ['Электроника', 'Мода', 'Товары для дома', 'Книги', 'Спорт'],
//                 datasets: [{
//                     label: 'Популярность категорий',
//                     data: [55, 49, 70, 71, 46],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(153, 102, 255, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgba(255, 99, 132, 1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(75, 192, 192, 1)',
//                         'rgba(153, 102, 255, 1)'
//                     ],
//                     borderWidth: 1
//                 }]
//             }
//         };
//     }

//     render() {
//         return (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h2 className="text-lg font-semibold mb-2">Анализ отзывов</h2>
//                     <p className="text-gray-600">Основные метрики по отзывам.</p>
//                     <ReviewsChart data={this.state.reviewsData} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <h2 className="text-lg font-semibold mb-2">Категории товаров</h2>
//                     <p className="text-gray-600">Популярные категории на платформе.</p>
//                     <CategoryChart data={this.state.categoryData} />
//                 </div>
//             </div>
//         );
//     }
// }

// class ReviewsChart extends React.Component {
//     componentDidMount() {
//         this.renderChart();
//     }

//     componentDidUpdate() {
//         this.renderChart();
//     }

//     renderChart() {
//         const ctx = document.getElementById('reviewsChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'bar',
//             data: this.props.data,
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     }

//     render() {
//         return <canvas id="reviewsChart"></canvas>;
//     }
// }

// class CategoryChart extends React.Component {
//     componentDidMount() {
//         this.renderChart();
//     }

//     componentDidUpdate() {
//         this.renderChart();
//     }

//     renderChart() {
//         const ctx = document.getElementById('categoryChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'pie',
//             data: this.props.data,
//             options: {
//                 responsive: true
//             }
//         });
//     }

//     render() {
//         return <canvas id="categoryChart"></canvas>;
//     }
// }

// Rendering SearchBar
document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
      <SearchBar />,
      document.getElementById('search-bar-container')
    );
  
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
  });
  

// Элементы страницы
function showMore(button) {
    const moreContent = button.previousElementSibling;
    const hiddenParagraphs = moreContent.querySelectorAll('p.hidden');
  
    if (hiddenParagraphs.length > 0) {
        hiddenParagraphs[0].classList.remove('hidden');
    }
  
    // Если больше нет скрытых параграфов, скрываем кнопку
    if (moreContent.querySelectorAll('p.hidden').length === 0) {
        button.classList.add('hidden');
    }
  }