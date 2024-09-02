# smartpick/urls.py

from django.urls import path
from django.views.generic import TemplateView
from .views.categories_view import *
from .views.index_view import *
from .views.products_view import *
from .views.profile_view import *
from .views.search_results_view import *
from .views.product_detail_view import *
from .views.search_results_view import *

urlpatterns = [
    path('', index_view, name='home'),
    path('products/', products_view, name='products'),
    path('categories/', categories_view, name='categories'),
    path('profile/', profile_view, name='profile'),
    path('search/', search_results, name='search_results'),
    path('product/<int:product_id>/', product_detail, name='product_detail'),
    path('search-autocomplete/', search_autocomplete, name='search_autocomplete'),
]