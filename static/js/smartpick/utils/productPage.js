import { toggleDescription, extractNmIdFromUrl, fetchProductData, displayProductData, displayFirstImage } from './productDetails.js';
import { toggleFavoriteProduct, isFavorite } from "../utils/apiUtils.js";

document.addEventListener('DOMContentLoaded', async () => {
    const productUrl = window.PRODUCT_URL; // Передаётся через Django-шаблон
    const nm_id = extractNmIdFromUrl(productUrl);
    const baskets = Array.from({ length: 10 }, (_, i) => String(i + 1).padStart(2, '0')); // 20 возможных баскетов

    if (nm_id) {
        fetchProductData(nm_id, baskets)
            .then((result) => {
                displayProductData(result.data);
                displayFirstImage(nm_id, result.basket);
            })
            .catch((error) => console.error('Error fetching product data:', error));
    } else {
        console.error('Product ID not found in the URL');
    }

    const toggleButton = document.querySelector('.btn-toggle-description');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDescription);
    }

    // Работа с кнопкой избранного
    const addToFavoritesButton = document.getElementById("add-to-favorites-button");
    const favoriteIcon = document.getElementById("favorite-icon");

    if (addToFavoritesButton) {
        const productId = addToFavoritesButton.dataset.productId;

        // Проверяем, является ли продукт избранным
        const isFavorited = await isFavorite(productId, null); // null для категории
        if (isFavorited !== null) {
            favoriteIcon.classList.add(isFavorited ? "fa-solid" : "fa-regular");
        }

        // Обработчик клика
        addToFavoritesButton.addEventListener("click", async () => {
            const newStatus = await toggleFavoriteProduct(productId);
            if (newStatus !== null) {
                favoriteIcon.classList.toggle("fa-solid", newStatus);
                favoriteIcon.classList.toggle("fa-regular", !newStatus);
            }
        });
    }
});
