from django.shortcuts import render
from ..models import Category

def categories_view(request):
    categories = Category.objects.all().prefetch_related('products')

    categories_data = []
    for category in categories:
        products_count = category.products.count()
        categories_data.append({
            'name': category.name,
            'products_count': products_count,
        })

    context = {
        'categories_data': categories_data,
    }
    return render(request, 'pages/categories.html', context)
