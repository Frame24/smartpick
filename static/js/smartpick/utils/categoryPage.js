import { toggleFavoriteCategory, isFavorite } from "../utils/apiUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const addToFavoritesButton = document.getElementById("add-to-favorites-button");
    const favoriteIcon = document.getElementById("favorite-icon");

    if (addToFavoritesButton) {
        const categoryId = addToFavoritesButton.dataset.categoryId;

        // Проверка, добавлена ли категория в избранное
        const isFavorited = await isFavorite(null, categoryId); // null для продукта
        if (isFavorited !== null) {
            favoriteIcon.classList.add(isFavorited ? "fa-solid" : "fa-regular");
        }

        addToFavoritesButton.addEventListener("click", async () => {
            const newStatus = await toggleFavoriteCategory(categoryId);
            if (newStatus !== null) {
                favoriteIcon.classList.toggle("fa-solid", newStatus);
                favoriteIcon.classList.toggle("fa-regular", !newStatus);
            }
        });
    }
});
