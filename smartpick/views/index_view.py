from django.shortcuts import render
from ..models import Category, Product, AggregatedReview

def index_view(request):
    categories_count = Category.objects.count()
    products_count = Product.objects.count()
    recent_aggregated_reviews = AggregatedReview.objects.all().order_by('-created_at')[:5]

    context = {
        'categories_count': categories_count,
        'products_count': products_count,
        'recent_aggregated_reviews': recent_aggregated_reviews,
    }
    return render(request, 'pages/index.html', context)
