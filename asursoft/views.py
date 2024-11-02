from django.shortcuts import render
from django.conf import settings

def landing(request):
    context = {
        'bg_image_url': settings.STATIC_URL + 'images/bg.png',
    }
    return render(request, 'asursoft_landing.html', context)
