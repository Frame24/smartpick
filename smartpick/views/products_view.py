from django.shortcuts import render
from ..models import *

def products_view(request):
    products = Product.objects.all().select_related('category').prefetch_related('reviews')
    
    products_data = []
    for product in products:
        reviews = product.reviews.all()
        avg_rating = reviews.aggregate(models.Avg('review_rating'))['review_rating__avg'] or 0
        reviews_count = reviews.count()
        products_data.append({
            'id': product.id,  # Добавляем id продукта
            'name': product.name,
            'category': product.category.name,
            'url': product.url,
            'avg_rating': avg_rating,
            'reviews_count': reviews_count,
        })

    context = {
        'products_data': products_data,
    }
    return render(request, 'pages/products.html', context)
