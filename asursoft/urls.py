# asursoft/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='asursoft_landing'),  # Лендинг для Asursoft
    # Добавьте дополнительные маршруты здесь
]
