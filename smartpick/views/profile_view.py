from django.shortcuts import render
from ..models import Product, Category, AggregatedReview

def profile_view(request):
    user = request.user

    # Избранные товары и категории (просто для примера, нужно реализовать избранное в модели)
    favorite_products = Product.objects.filter(id__in=[1, 2, 3])  # Замените на реальные данные
    favorite_categories = Category.objects.filter(id__in=[1, 2])  # Замените на реальные данные

    # История аналитики
    analysis_history = AggregatedReview.objects.filter(product__category__in=favorite_categories)

    context = {
        'user': user,
        'favorite_products': favorite_products,
        'favorite_categories': favorite_categories,
        'analysis_history': analysis_history,
    }
    return render(request, 'pages/profile.html', context)
