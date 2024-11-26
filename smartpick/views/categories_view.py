from django.http import JsonResponse
from django.core.paginator import Paginator
from django.db.models import Count
from django.shortcuts import render
from smartpick.models import Category

def categories_view(request):
    try:
        categories = Category.objects.annotate(
            subcategories_count=Count('subcategories'),
            products_count=Count('products')  # Проверьте, существует ли related_name='products' в модели Product
        )

        # Пагинация
        paginator = Paginator(categories, 10)
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)

        # Если запрос AJAX, возвращаем JSON
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({
                'items': [
                    {
                        'id': category.id,
                        'name': category.name,
                        'subcategories_count': category.subcategories_count,
                        'products_count': category.products_count,
                        'url': category.get_absolute_url(),
                    }
                    for category in page_obj
                ],
                'has_next': page_obj.has_next(),
            })

        # Если запрос не AJAX, рендерим HTML
        return render(request, 'pages/categories.html', {
            'categories': page_obj,
            'page_obj': page_obj,
        })

    except Exception as e:
        print("Ошибка:", e)  # Выводим ошибку в консоль
        return JsonResponse({'error': str(e)}, status=500)
