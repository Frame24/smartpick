from rest_framework import serializers
from smartpick.models import Category, Product, Review, AggregatedReview, KeyThought, ProcessedReviewCache

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category', 'subcategories', 'created_at', 'updated_at', 'search_vector']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    reviews = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'url', 'created_at', 'updated_at', 'search_vector']


class ReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Review
        fields = ['id', 'review_full_text', 'review_rating', 'product', 'corrected_text', 'analysed_at', 'created_at', 'updated_at']


class AggregatedReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    key_thoughts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = AggregatedReview
        fields = ['id', 'avg_rating', 'rating_category', 'product', 'sentence_count', 'mean_distance', 'key_thoughts', 'created_at', 'updated_at']


class KeyThoughtSerializer(serializers.ModelSerializer):
    aggregated_review = AggregatedReviewSerializer()
    review = ReviewSerializer()

    class Meta:
        model = KeyThought
        fields = ['id', 'aggregated_review', 'review', 'thought_text', 'thought_type', 'rank', 'created_at', 'updated_at']


class ProcessedReviewCacheSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = ProcessedReviewCache
        fields = ['id', 'category', 'processed_data', 'created_at', 'updated_at']
