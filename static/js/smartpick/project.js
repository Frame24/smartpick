import '../../sass/smartpick/project.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js/auto';
import axios from 'axios'; // Используем axios для выполнения запросов
import SearchBar from './components/SearchBar';

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
