import { getCSRFToken } from "./getCSRFToken.js";
// Функция получения авторизационного токена через API
export async function fetchAuthToken() {
    try {
        const response = await fetch("/users/get-auth-token/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Authorization Token получен:", data.token); // Лог для проверки
            return data.token; // Возвращаем токен
        } else {
            console.error("Не удалось получить Authorization Token");
            return "";
        }
    } catch (error) {
        console.error("Ошибка при получении Authorization Token:", error);
        return "";
    }
}