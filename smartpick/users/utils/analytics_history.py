from django.utils.timezone import now
from smartpick.models import Product


def add_to_analytics_history(user, item):
    """
    Добавляет товар или категорию в историю просмотров пользователя.
    Если запись уже существует, обновляет её timestamp и перемещает в начало.
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
    existing_entry = next(
        (
            entry
            for entry in history
            if entry["id"] == record["id"] and entry["type"] == record["type"]
        ),
        None,
    )

    if existing_entry:
        # Если запись найдена, обновляем её timestamp
        existing_entry["timestamp"] = record["timestamp"]
        # Удаляем существующую запись
        history.remove(existing_entry)
        # Добавляем обновленную запись в начало
        history.insert(0, existing_entry)
        print(f"Record updated and moved to the beginning: {existing_entry}")
    else:
        # Если запись не найдена, добавляем её в начало
        history.insert(0, record)
        print(f"New record added to the beginning: {record}")

    # Сохраняем только последние 50 записей
    history = history[:50]

    # Принудительно обновляем поле в базе через QuerySet
    User = user.__class__  # Получаем модель User
    User.objects.filter(id=user.id).update(analytics_history=history)

    print(f"Updated analytics_history: {history}")
