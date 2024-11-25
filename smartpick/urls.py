# smartpick/urls.py

from django.urls import path
from django.views.generic import TemplateView
from .views.categories_view import *
from .views.index_view import *
from .views.products_view import *
from .views.profile_view import *
from .views.search_results_view import *
from .views.product_detail_view import *
from .views.search_autocomplete_view import *

urlpatterns = [
    path('', TemplateView.as_view(template_name='base.html'), name='home'),
    path('products/', TemplateView.as_view(template_name='base.html'), name='products'),
    path('categories/', TemplateView.as_view(template_name='base.html'), name='categories'),
    path('profile/', TemplateView.as_view(template_name='base.html'), name='profile'),
    path('search/', TemplateView.as_view(template_name='base.html'), name='search_results'),
    path('product/<int:product_id>/', TemplateView.as_view(template_name='base.html'), name='product_detail'),
]