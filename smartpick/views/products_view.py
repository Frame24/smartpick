from ..models import *
# products_view.py
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render

def products_view(request):
    products = Product.objects.all().select_related('category').prefetch_related('reviews')

    # Получаем номер страницы из запроса
    page_number = request.GET.get('page', 1)
    paginator = Paginator(products, 10)  # 10 товаров на страницу
    page_obj = paginator.get_page(page_number)

    # Формируем данные для каждого товара
    products_data = []
    for product in page_obj:
        reviews = product.reviews.all()
        avg_rating = reviews.aggregate(models.Avg('review_rating'))['review_rating__avg'] or 0
        reviews_count = reviews.count()
        products_data.append({
            'id': product.id,
            'name': product.name,
            'category': product.category.name,  # Добавляем название категории
            'avg_rating': avg_rating,
            'reviews_count': reviews_count,
            'url': product.url,  # Проверяем, есть ли ссылка
        })

    # Если это AJAX-запрос, возвращаем только данные товаров в формате JSON
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({
            'products': products_data,
            'has_next': page_obj.has_next(),
        })

    # Если это обычный запрос, рендерим страницу с первой порцией товаров
    context = {
        'products_data': products_data,  # Первая порция товаров
        'has_next': page_obj.has_next(),  # Есть ли ещё страницы
    }
    return render(request, 'pages/products.html', context)
