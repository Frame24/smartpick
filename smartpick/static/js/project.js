import '../sass/project.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js/auto';

/* Project specific Javascript goes here. */

// SearchBar Component in React
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
    }

    handleSearchInput(e) {
        const query = e.target.value.toLowerCase();
        const { categories, products } = this.props;

        if (query.length === 0) {
            this.setState({ 
                suggestions: [],
                showSuggestions: false,
            });
            return;
        }

        const filteredCategories = categories.filter(category =>
            category.toLowerCase().includes(query)
        ).slice(0, 4);

        const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(query)
        ).slice(0, 4);

        const suggestions = [...filteredCategories, ...filteredProducts];

        this.setState({
            query,
            suggestions,
            showSuggestions: suggestions.length > 0,
        });
    }

    handleSearchSubmit() {
        if (this.state.query.trim()) {
            window.location.href = `/search/?q=${this.state.query}`;
        }
    }

    render() {
        return (
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Поиск категорий и товаров..." 
                    className="w-full p-2 pr-10 border rounded-lg"
                    onChange={this.handleSearchInput}
                    onKeyPress={(e) => { if (e.key === 'Enter') this.handleSearchSubmit(); }}
                />
                <button onClick={this.handleSearchSubmit} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.55-5.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                    </svg>
                </button>
                {this.state.showSuggestions && (
                    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg">
                        {this.state.suggestions.length > 0 ? (
                            this.state.suggestions.map((suggestion, index) => (
                                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                                    {suggestion}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">Ничего не найдено</div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}



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
        <SearchBar 
            categories={['Электроника', 'Мода', 'Товары для дома', 'Книги', 'Спорт']} 
            products={['Телевизор', 'Рубашка', 'Кресло', 'Рюкзак', 'Ноутбук']} 
        />, 
        document.getElementById('search-bar-container')
    );

    // Rendering Dashboard
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