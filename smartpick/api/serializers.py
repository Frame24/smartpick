from rest_framework import serializers
from smartpick.models import (
    Category, Product, Review, AggregatedReview, KeyThought, ProcessedReviewCache
)


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )  # Используем related_name "subcategories"

    class Meta:
        model = Category
        exclude = []


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )  # Используем PrimaryKeyRelatedField для связи с категорией
    reviews = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )  # Используем related_name "reviews"

    class Meta:
        model = Product
        exclude = []


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )  # Связь с продуктом без вложения всех данных продукта

    class Meta:
        model = Review
        exclude = []


class AggregatedReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )  # Используем PrimaryKey для связи
    key_thoughts = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )  # related_name "key_thoughts"

    class Meta:
        model = AggregatedReview
        exclude = []


class KeyThoughtSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyThought
        exclude = []


class ProcessedReviewCacheSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )  # Связь с Category

    class Meta:
        model = ProcessedReviewCache
        exclude = []
