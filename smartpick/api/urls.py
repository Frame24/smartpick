from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, ReviewViewSet,
    AggregatedReviewViewSet, KeyThoughtViewSet, ProcessedReviewCacheViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'aggregated-reviews', AggregatedReviewViewSet)
router.register(r'key-thoughts', KeyThoughtViewSet)
router.register(r'processed-review-cache', ProcessedReviewCacheViewSet)

urlpatterns = router.urls
