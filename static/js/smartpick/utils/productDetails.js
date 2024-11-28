// productDetails.js

export function toggleDescription() {
    const description = document.getElementById('product-description');
    const button = document.querySelector('.btn-toggle-description');

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        button.textContent = 'Развернуть полностью';
    } else {
        description.classList.add('expanded');
        button.textContent = 'Свернуть';
    }
}

export function extractNmIdFromUrl(url) {
    const regex = /catalog\/(\d+)\//; // Регулярное выражение для поиска цифр после "catalog/"
    const match = url.match(regex);
    return match ? match[1] : null; // Возвращает ID, если найден, иначе null
}

export async function fetchProductData(nm_id, initialBaskets, maxRetries = 10) {
    let baskets = [...new Set(initialBaskets)]; // Убираем дубли
    const triedUrls = new Set(); // Храним уже проверенные URL

    for (let retry = 0; retry <= maxRetries; retry++) {
        // Формируем список URL для текущей попытки, исключая уже проверенные
        const urls = baskets.map(basket => ({
            basket,
            url: `https://basket-${basket}.wb.ru/vol${Math.floor(nm_id / 1e5)}/part${Math.floor(nm_id / 1e3)}/${nm_id}/info/ru/card.json`,
        })).filter(({ url }) => !triedUrls.has(url));

        // Добавляем новые URL в список проверенных
        urls.forEach(({ url }) => triedUrls.add(url));

        // Создаем массив промисов
        const promises = urls.map(async ({ basket, url }) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return { data: await response.json(), basket };
                }
                console.warn(`Data not found in basket ${basket}: ${url}`);
                throw new Error(`Data not found in basket ${basket}`);
            } catch (error) {
                console.error(`Error fetching from basket ${basket}:`, error.message);
                throw error;
            }
        });

        try {
            // Ждем первого успешного промиса
            return await Promise.any(promises);
        } catch (error) {
            console.warn(`Attempt ${retry + 1} failed. Retrying...`);

            // Если максимальное число попыток достигнуто, выбрасываем ошибку
            if (retry === maxRetries) {
                throw new Error('Data not found in any basket after maximum retries');
            }

            // Добавляем новые "басткеты" для следующей попытки
            const maxBasket = Math.max(...baskets);
            baskets = [...baskets, maxBasket + 1];
        }
    }
}





export function displayProductData(data) {
    document.getElementById('product-category').innerText = `${data.subj_root_name} / ${data.subj_name}`;
    document.getElementById('product-brand').innerText = data.selling.brand_name;
    document.getElementById('product-vendor-code').innerText = data.vendor_code;
    document.getElementById('product-description').innerText = data.description;

    const optionsList = document.getElementById('product-options');
    optionsList.innerHTML = ''; // Очищаем текущие опции
    data.options.forEach((option) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${option.name}:</strong> ${option.value}`;
        optionsList.appendChild(li);
    });

    // Скрыть лоадер и показать контент
    document.getElementById('specs-loader').classList.add('hidden');
    optionsList.classList.remove('hidden');
}

export function displayFirstImage(nm_id, basket) {
    const img = document.createElement('img');
    img.src = `https://basket-${basket}.wb.ru/vol${Math.floor(nm_id / 1e5)}/part${Math.floor(nm_id / 1e3)}/${nm_id}/images/big/1.webp`;
    img.alt = 'Product Image';
    img.className = 'rounded shadow';

    img.onload = function () {
        document.getElementById('image-loader').classList.add('hidden'); // Скрываем лоадер
        document.getElementById('product-image-container').appendChild(img);
    };
}

export function showMore(button) {
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
