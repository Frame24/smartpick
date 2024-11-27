from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from datetime import datetime
from django.utils.timezone import make_aware
from datetime import datetime


@login_required
def profile_view(request):
    user = request.user

    # Избранные товары и категории
    favorite_products = user.favorite_products.all()
    favorite_categories = user.favorite_categories.all()

    # История просмотров: сортировка по дате (обратный порядок)
    analytics_history = user.analytics_history or []
    for record in analytics_history:
        if isinstance(record["timestamp"], str):
            # Преобразуем строку в datetime
            record["timestamp"] = datetime.fromisoformat(record["timestamp"])

    analytics_history = sorted(
        analytics_history, key=lambda record: record["timestamp"], reverse=True
    )

    context = {
        "user": user,
        "favorite_products": favorite_products,
        "favorite_categories": favorite_categories,
        "analytics_history": analytics_history,
    }

    return render(request, "pages/profile.html", context)
