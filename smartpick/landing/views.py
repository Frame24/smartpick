from django.shortcuts import render
from django.conf import settings

def home_view(request):
    context = {
        'bg_image_url': settings.STATIC_URL + 'images/bg.png',
        'fasie_image_url': settings.STATIC_URL + 'images/fasie.png',
        'mini2_image_url': settings.STATIC_URL + 'images/mini2.ico',
    }
    return render(request, 'landing/home.html', context)
