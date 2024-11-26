from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    CategoryViewSet, ProductViewSet, ReviewViewSet,
    AggregatedReviewViewSet, KeyThoughtViewSet, ProcessedReviewCacheViewSet,
    SearchAutocompleteView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'aggregated-reviews', AggregatedReviewViewSet)
router.register(r'key-thoughts', KeyThoughtViewSet)
router.register(r'processed-review-cache', ProcessedReviewCacheViewSet)

# Добавляем вручную конечную точку для поиска
urlpatterns = router.urls + [
    path('search-autocomplete/', SearchAutocompleteView.as_view(), name='search-autocomplete'),
]
