from rest_framework.viewsets import ModelViewSet
from smartpick.models import Category, Product, Review, AggregatedReview, KeyThought, ProcessedReviewCache
from .serializers import (
    CategorySerializer, ProductSerializer, ReviewSerializer,
    AggregatedReviewSerializer, KeyThoughtSerializer, ProcessedReviewCacheSerializer
)

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class AggregatedReviewViewSet(ModelViewSet):
    queryset = AggregatedReview.objects.all()
    serializer_class = AggregatedReviewSerializer


class KeyThoughtViewSet(ModelViewSet):
    queryset = KeyThought.objects.all()
    serializer_class = KeyThoughtSerializer


class ProcessedReviewCacheViewSet(ModelViewSet):
    queryset = ProcessedReviewCache.objects.all()
    serializer_class = ProcessedReviewCacheSerializer

