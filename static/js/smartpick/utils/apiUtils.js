// apiUtils.js

import { getCSRFToken } from "./getCSRFToken.js";
import { fetchAuthToken } from "./fetchAuthToken.js";

/**
 * Переключение статуса избранного для продукта
 * @param {number} productId - ID продукта
 * @returns {Promise<boolean|null>} - Новый статус избранного (true/false) или null при ошибке
 */
export async function toggleFavoriteProduct(productId) {
    try {
        const authToken = await fetchAuthToken(); // Получаем токен перед запросом
        if (!authToken) {
            ;
            return null;
        }

        const response = await fetch("/api/users/toggle_favorite_product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(), // Убедитесь, что CSRF токен доступен
                "Authorization": `Token ${authToken}`, // Авторизационный токен
            },
            body: JSON.stringify({ product_id: productId, name: authToken }),
        });

        const data = await response.json();
        if (response.ok) {
            return data.is_favorite; // Возвращает новый статус избранного
        } else {
            alert(`Ошибка: ${data.error || "Не удалось обновить статус избранного"}`);
            return null;
        }
    } catch (error) {
        console.error("Ошибка при переключении статуса избранного для продукта:", error);
        alert("Произошла ошибка. Попробуйте позже.");
        return null;
    }
}

/**
 * Переключение статуса избранного для категории
 * @param {number} categoryId - ID категории
 * @returns {Promise<boolean|null>} - Новый статус избранного (true/false) или null при ошибке
 */
export async function toggleFavoriteCategory(categoryId) {
    try {
        const authToken = await fetchAuthToken(); // Получаем токен перед запросом
        if (!authToken) {
            ;
            return null;
        }

        const response = await fetch("/api/users/toggle_favorite_category/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(), // Убедитесь, что CSRF токен доступен
                "Authorization": `Token ${authToken}`, // Авторизационный токен
            },
            body: JSON.stringify({ category_id: categoryId, name: authToken }),
        });

        const data = await response.json();
        if (response.ok) {
            return data.is_favorite; // Возвращает новый статус избранного
        } else {
            alert(`Ошибка: ${data.error || "Не удалось обновить статус избранного"}`);
            return null;
        }
    } catch (error) {
        console.error("Ошибка при переключении статуса избранного для категории:", error);
        alert("Произошла ошибка. Попробуйте позже.");
        return null;
    }
}

/**
 * Проверка статуса избранного для продукта или категории
 * @param {number|null} productId - ID продукта (если есть)
 * @param {number|null} categoryId - ID категории (если есть)
 * @returns {Promise<boolean|null>} - Статус избранного (true/false) или null при ошибке
 */
export async function isFavorite(productId = null, categoryId = null) {
    try {
        const authToken = await fetchAuthToken(); // Получаем токен перед запросом
        if (!authToken) {
            ;
            return null;
        }

        const params = new URLSearchParams();
        if (productId) params.append("product_id", productId);
        if (categoryId) params.append("category_id", categoryId);

        const response = await fetch(`/api/users/is_favorite/?${params.toString()}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${authToken}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            return data.is_favorite; // Возвращает статус избранного
        } else {
            alert(`Ошибка: ${data.error || "Не удалось получить статус избранного"}`);
            return null;
        }
    } catch (error) {
        console.error("Ошибка при проверке статуса избранного:", error);
        alert("Произошла ошибка. Попробуйте позже.");
        return null;
    }
}
