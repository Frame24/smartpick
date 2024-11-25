from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Avg  # Добавляем этот импорт
from rest_framework.pagination import PageNumberPagination


from smartpick.models import (
    Category, Product, Review, AggregatedReview, KeyThought, ProcessedReviewCache
)
from .serializers import (
    CategorySerializer, ProductSerializer, ReviewSerializer,
    AggregatedReviewSerializer, KeyThoughtSerializer, ProcessedReviewCacheSerializer
)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['name', 'parent_category']  # Фильтрация по имени и родительской категории
    search_fields = ['name']  # Поиск по имени
    ordering_fields = ['name', 'created_at']  # Сортировка по имени и дате создания
    ordering = ['name']  # По умолчанию сортировка по имени


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.select_related('category')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'created_at']  # Фильтрация по категории и дате создания
    search_fields = ['name']  # Поиск по названию продукта
    ordering_fields = ['name', 'created_at', 'updated_at']  # Возможная сортировка
    ordering = ['created_at']  # По умолчанию сортировка по дате создания

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Агрегированная статистика по продуктам"""
        total_products = Product.objects.count()
        avg_rating = Review.objects.aggregate(avg=Avg('review_rating'))['avg'] or 0
        return Response({
            'total_products': total_products,
            'avg_rating': round(avg_rating, 2),
        })


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.select_related('product')
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['product', 'review_rating', 'created_at']  # Фильтрация по продукту, рейтингу и дате
    search_fields = ['review_full_text']  # Поиск по тексту отзыва
    ordering_fields = ['review_rating', 'created_at', 'updated_at']  # Сортировка по рейтингу и дате
    ordering = ['-created_at']  # По умолчанию сортировка по убыванию даты

    @action(detail=True, methods=['get'])
    def product_reviews(self, request, pk=None):
        """Получить все отзывы для продукта"""
        reviews = Review.objects.filter(product_id=pk)
        serialized_reviews = self.get_serializer(reviews, many=True)
        return Response(serialized_reviews.data)


class AggregatedReviewViewSet(ModelViewSet):
    queryset = AggregatedReview.objects.select_related('product')
    serializer_class = AggregatedReviewSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['product', 'rating_category']  # Фильтрация по продукту и категории рейтинга
    ordering_fields = ['avg_rating', 'mean_distance']  # Сортировка по рейтингу и расстоянию
    ordering = ['avg_rating']  # По умолчанию сортировка по рейтингу

class KeyThoughtViewSet(ModelViewSet):
    queryset = KeyThought.objects.select_related('aggregated_review', 'review').only(
        'id', 'thought_text', 'thought_type', 'aggregated_review_id', 'review_id'
    )
    serializer_class = KeyThoughtSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['thought_type', 'aggregated_review']
    search_fields = ['thought_text']
    def get_queryset(self):
        # Если фильтры отсутствуют, возвращаем только первые 5 записей
        if not self.request.query_params:
            return super().get_queryset()[:5]
        return super().get_queryset()



class ProcessedReviewCacheViewSet(ModelViewSet):
    queryset = ProcessedReviewCache.objects.select_related('category')
    serializer_class = ProcessedReviewCacheSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']  # Фильтрация по категории

    @action(detail=False, methods=['get'])
    def clear_cache(self, request):
        """Очистить весь кеш"""
        ProcessedReviewCache.objects.all().delete()
        return Response({'status': 'cache cleared'})
