from ..models import *
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404

def products_view(request, category_slug=None):
    # Извлекаем все продукты
    products = Product.objects.all().select_related('category').prefetch_related('reviews')

    # Фильтрация по категории, если передан category_slug
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)

    # Фильтрация по id товаров, если переданы через GET-запрос
    product_ids = request.GET.getlist('ids')
    if product_ids:
        products = products.filter(id__in=product_ids)

    # Пагинация: 10 товаров на страницу
    page_number = request.GET.get('page', 1)
    paginator = Paginator(products, 10)
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
            'category': product.category.name,  # Название категории
            'avg_rating': avg_rating,
            'reviews_count': reviews_count,
            'url': product.url,  # Ссылка на продукт
        })

    # Возвращаем JSON, если запрос выполнен через AJAX
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({
            'products': products_data,
            'has_next': page_obj.has_next(),
        })

    # Рендерим HTML-шаблон
    context = {
        'products_data': products_data,
        'has_next': page_obj.has_next(),
    }
    return render(request, 'pages/products.html', context)
