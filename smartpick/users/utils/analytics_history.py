from django.utils.timezone import now
from smartpick.models import Product

def add_to_analytics_history(user, item):
    """
    Добавляет товар или категорию в историю просмотров пользователя.
    :param user: экземпляр пользователя.
    :param item: объект Product или Category.
    """
    if not user.is_authenticated:
        print("User not authenticated. Skipping analytics history update.")
        return

    # Получаем текущую историю
    history = user.analytics_history or []

    # Формируем запись
    record = {
        "timestamp": now().isoformat(),
        "type": "product" if isinstance(item, Product) else "category",
        "name": item.name,
        "id": item.id,
    }

    # Проверяем, есть ли уже такая запись
    if any(entry["id"] == record["id"] and entry["type"] == record["type"] for entry in history):
        print(f"Record already exists: {record}")
        return

    # Добавляем запись в историю
    history.append(record)

    # Сохраняем только последние 50 записей
    history = history[-50:]

    # Принудительно обновляем поле в базе через QuerySet
    User = user.__class__  # Получаем модель User
    User.objects.filter(id=user.id).update(analytics_history=history)

    print(f"Updated analytics_history: {history}")
