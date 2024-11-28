from django.shortcuts import render
from ..models import Category, Product, Review, AggregatedReview
from django.db.models import Avg

def index_view(request):
    # Основные подсчёты
    categories_count = Category.objects.count()
    products_count = Product.objects.count()
    reviews_count = Review.objects.count()
    avg_product_reviews = AggregatedReview.objects.aggregate(Avg('avg_rating'))['avg_rating__avg'] or 0

    # Получение последних данных
    recent_products = Product.objects.order_by('-created_at')[:5]
    recent_reviews = Review.objects.order_by('-created_at')[:5]

    context = {
        'categories_count': categories_count,
        'products_count': products_count,
        'reviews_count': reviews_count,
        'avg_product_reviews': round(avg_product_reviews, 2),
        'recent_products': recent_products,
        'recent_reviews': recent_reviews,
    }

    return render(request, 'pages/index.html', context)
