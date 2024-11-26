import React from 'react';
import { createRoot } from 'react-dom/client';

export function loadMoreItems({
    url,
    containerId,
    renderItem,
    currentPage,
    setCurrentPage,
    hasNextPage,
    setHasNextPage,
    dataKey, // Ключ массива данных
}) {
    if (window.loading || !hasNextPage) return;

    window.loading = true;

    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) loadingMessage.style.display = 'block'; // Показать индикатор загрузки

    fetch(`${url}?page=${currentPage}`, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest', // Указываем, что это AJAX-запрос
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const container = document.getElementById(containerId);
            if (container && data[dataKey] && Array.isArray(data[dataKey])) {
                data[dataKey].forEach((item) => {
                    const div = document.createElement('div');
                    const root = createRoot(div);
                    root.render(renderItem(item));
                    container.appendChild(div);
                });
            } else {
                console.warn(`Ключ '${dataKey}' отсутствует или содержит некорректные данные.`);
            }

            setCurrentPage(currentPage + 1); // Увеличиваем текущую страницу
            setHasNextPage(data.has_next); // Обновляем статус наличия следующей страницы
            window.loading = false;
            if (loadingMessage) loadingMessage.style.display = 'none'; // Скрыть индикатор загрузки
        })
        .catch((error) => {
            console.error('Ошибка загрузки элементов:', error);
            window.loading = false;
            if (loadingMessage) loadingMessage.style.display = 'none'; // Скрыть индикатор загрузки даже при ошибке
        });
}
