from django.shortcuts import render, get_object_or_404
from smartpick.models import Category, Product

def category_detail(request, category_id):
    category = get_object_or_404(Category, id=category_id)

    # Получаем товары и вложенные категории для текущей категории
    products = Product.objects.filter(category=category)[:5]  # Ограничиваем количество товаров
    subcategories = category.subcategories.all()  # Все подкатегории

    return render(request, 'pages/category_detail.html', {
        'category': category,
        'products': products,
        'subcategories': subcategories,
    })
