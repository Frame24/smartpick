import { getCSRFToken } from "./getCSRFToken.js";
import { fetchAuthToken } from "./fetchAuthToken.js";

const clearHistoryButton = document.getElementById("clearHistoryButton");
console.log("Кнопка очистки истории:", clearHistoryButton);

if (clearHistoryButton) {
    // Добавляем обработчик события
    clearHistoryButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение кнопки

        const authToken = await fetchAuthToken(); // Получаем токен перед запросом
        if (!authToken) {
            alert("Не удалось получить токен авторизации. Попробуйте позже.");
            return;
        }

        try {
            // Подготавливаем тело запроса
            const bodyData = {
                name: authToken, // Передаем authToken в поле name
            };

            // Отправляем POST-запрос к API
            const response = await fetch("/api/users/clear_history/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(), // CSRF токен
                    "Authorization": `Token ${authToken}`, // Авторизационный токен
                },
                body: JSON.stringify(bodyData), // Передаем объект в JSON-формате
            });

            if (response.ok) {
                alert("История просмотров успешно очищена.");
                location.reload(); // Перезагружаем страницу после успешного удаления
            } else {
                const errorData = await response.json();
                alert("Не удалось очистить историю: " + (errorData.message || "Неизвестная ошибка"));
            }
        } catch (error) {
            console.error("Ошибка при очистке истории:", error);
            alert("Произошла ошибка. Попробуйте позже.");
        }
    });
}
