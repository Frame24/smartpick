from django.shortcuts import render
from smartpick.models import Category, Product
from django.db.models import Q
from django.http import JsonResponse


def search_view(request):
    query = request.GET.get("q", "")
    results = []
    if query:
        # Общая логика поиска
        categories = Category.objects.filter(name__icontains=query).values("id", "name")
        products = Product.objects.filter(name__icontains=query).values(
            "id", "name", "url"
        )
        results = list(categories) + list(products)

    # Проверяем, является ли запрос AJAX
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        return JsonResponse(results, safe=False)
    # Рендерим HTML для полной страницы
    return render(request, "pages/search.html", {"query": query, "results": results})
