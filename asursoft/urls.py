# asursoft/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # Добавьте дополнительные маршруты здесь
]
