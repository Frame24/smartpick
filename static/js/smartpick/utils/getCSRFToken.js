// Функция получения CSRF-токена из cookies
export function getCSRFToken() {
    console.log("document.cookie:", document.cookie); // Лог для проверки
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "csrftoken") {
            console.log("CSRF Token найден:", value); // Лог для проверки
            return value;
        }
    }
    console.error("CSRF Token не найден.");
    return "";
}