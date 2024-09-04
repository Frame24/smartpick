from django.shortcuts import render
from django.utils.text import slugify
from ..models import Category

def categories_view(request):
    categories = Category.objects.all().prefetch_related('products')

    categories_data = []
    for category in categories:
        products_count = category.products.count()
        # Генерируем slug динамически из названия категории
        slug = slugify(category.name)
        categories_data.append({
            'name': category.name,
            'slug': slug,  # Динамический slug
            'products_count': products_count,
        })

    context = {
        'categories_data': categories_data,
    }
    return render(request, 'pages/categories.html', context)
