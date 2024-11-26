# smartpick/urls.py

from django.urls import path
from django.views.generic import TemplateView
from .views.categories_view import *
from .views.index_view import *
from .views.products_view import *
from .views.profile_view import *
from .views.search_view import *
from .views.product_detail_view import *

urlpatterns = [
    path('', index_view, name='home'),
    path('products/', products_view, name='products'),
    path('categories/', categories_view, name='categories'),
    path('profile/', profile_view, name='profile'),
    path('product/<int:product_id>/', product_detail, name='product_detail'),
    path('products/category/<slug:category_slug>/', products_view, name='products_by_category'),
    path('search/', search_view, name='search'),
    
]