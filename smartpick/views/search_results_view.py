from django.shortcuts import render
from ..models import Product, Category

def search_results(request):
    query = request.GET.get('q', '')
    results = []

    if query:
        products = Product.objects.filter(name__icontains=query)
        categories = Category.objects.filter(name__icontains=query)
        results = list(products) + list(categories)

    return render(request, 'pages/search_results.html', {
        'query': query,
        'results': results
    })
