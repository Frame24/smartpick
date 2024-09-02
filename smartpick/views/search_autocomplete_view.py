from django.http import JsonResponse
from ..models import Product, Category

def search_autocomplete(request):
    query = request.GET.get('q', '')
    results = []

    if query:
        products = Product.objects.filter(name__icontains=query)[:5]  # Ограничиваем количество предложений
        categories = Category.objects.filter(name__icontains=query)[:5]

        for product in products:
            results.append({
                'name': product.name,
                'url': product.get_absolute_url()
            })

        for category in categories:
            results.append({
                'name': category.name,
                'url': category.get_absolute_url()
            })

    return JsonResponse(results, safe=False)
