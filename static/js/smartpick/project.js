import '../../sass/smartpick/project.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js/auto';
import axios from 'axios'; // Используем axios для выполнения запросов

let currentPage = 2; // Начинаем со второй страницы, т.к. первая загружена
let hasNextPage = false;
let loading = false;

// Функция для подгрузки дополнительных товаров
function loadMoreProducts() {
  if (loading || !hasNextPage) return;

  loading = true;
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) loadingMessage.style.display = 'block'; // Показать индикатор загрузки

  fetch(`/products/?page=${currentPage}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest', // AJAX-запрос
    },
  })
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('product-container');
      if (container) {
        data.products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow');
          productElement.innerHTML = `
            <h2 class="text-lg font-semibold mb-2">
              <a href="/product/${product.id}/" class="text-blue-500 hover:underline">${product.name}</a>
            </h2>
            <p class="text-gray-600">Категория: ${product.category}</p>
            ${product.url ? `<p><a href="${product.url}" class="text-blue-500 hover:underline">Ссылка на продукт</a></p>` : ''}
            <p>Средний рейтинг: ${product.avg_rating.toFixed(1)} (${product.reviews_count} отзывов)</p>
          `;
          container.appendChild(productElement);
        });
      }

      currentPage++; // Увеличиваем номер страницы
      hasNextPage = data.has_next; // Обновляем флаг, есть ли еще страницы
      loading = false;
      if (loadingMessage) loadingMessage.style.display = 'none'; // Прячем индикатор загрузки
    })
    .catch(error => {
      console.error('Ошибка загрузки товаров:', error);
      loading = false;
    });
}

// Обработчик прокрутки страницы для подгрузки товаров
document.addEventListener('DOMContentLoaded', () => {
  const paginationInfo = document.getElementById('pagination-info');
  hasNextPage = paginationInfo && paginationInfo.dataset.hasNext === 'true';

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
      loadMoreProducts();
    }
  });

  // Рендеринг компонента SearchBar после загрузки DOM
  ReactDOM.render(<SearchBar />, document.getElementById('search-bar-container'));
});

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
    this.debouncedFetchSuggestions = this.debounce(this.fetchSuggestions, 300); // Дебаунс запросов
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  async fetchSuggestions(query) {
    if (query.length > 1) {
      try {
        const response = await axios.get(`/search-autocomplete/?q=${query}`);
        this.setState({
          suggestions: response.data,
          showSuggestions: response.data.length > 0,
        });
      } catch (error) {
        console.error('Ошибка при загрузке предложений:', error);
      }
    } else {
      this.setState({ suggestions: [], showSuggestions: false });
    }
  }

  handleSearchInput(e) {
    const query = e.target.value;
    this.setState({ query });
    this.debouncedFetchSuggestions(query);
  }

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
            autoComplete="off"
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
