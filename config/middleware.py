# config/middleware.py

from django.conf import settings
from config import urls
from django.urls import clear_url_caches


class DynamicURLMiddleware:
    """
    Middleware для динамического изменения urlpatterns на основе домена.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        host = request.get_host()
        
        if "smart-pick" in host:
            urls.urlpatterns = urls.smartpick_patterns + urls.common_patterns
        elif "asursoft" in host:
            urls.urlpatterns = urls.asursoft_patterns + urls.common_patterns
        else:
            urls.urlpatterns = urls.common_patterns

        clear_url_caches()  # Сброс кэша URL
        response = self.get_response(request)
        
        return response
