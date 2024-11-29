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
        
        if "landing.smart-pick" in host:
            # Настройка для лендинга Smart Pick
            urls.urlpatterns = urls.landing_smartpick_patterns + urls.common_patterns
        elif "smart-pick" in host:
            # Настройка для основного сайта Smart Pick
            urls.urlpatterns = urls.smartpick_patterns + urls.common_patterns
        elif "asursoft" in host:
            # Настройка для Asursoft
            urls.urlpatterns = urls.asursoft_patterns + urls.common_patterns
        else:
            # Общие настройки для других доменов
            urls.urlpatterns = urls.common_patterns

        clear_url_caches()  # Сброс кэша URL
        response = self.get_response(request)
        
        return response
