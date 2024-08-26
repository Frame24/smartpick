from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название категории")
    parent_category = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories', verbose_name="Родительская категория")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @staticmethod
    def create_from_path(path):
        """Создает категории на основе иерархического пути"""
        names = path.strip('/').split('/')
        parent = None
        for name in names:
            category, created = Category.objects.get_or_create(name=name, parent_category=parent)
            parent = category
        return parent


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название продукта")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", verbose_name="Категория")
    url = models.URLField(verbose_name="URL", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    review_full_text = models.TextField(verbose_name="Текст отзыва")
    review_rating = models.IntegerField(verbose_name="Рейтинг отзыва")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews", verbose_name="Продукт")
    corrected_text = models.TextField(verbose_name="Исправленный текст отзыва", null=True, blank=True)
    analysed_at = models.DateTimeField(null=True, blank=True, help_text="Дата и время последнего анализа отзыва")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review for {self.product.name}"


class AggregatedReview(models.Model):
    avg_rating = models.FloatField(verbose_name="Средний рейтинг")
    rating_category = models.CharField(max_length=50, verbose_name="Категория рейтинга")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="aggregated_reviews", verbose_name="Продукт")
    sentence_count = models.IntegerField(verbose_name="Количество предложений")
    mean_distance = models.FloatField(verbose_name="Средняя дистанция", default=99999)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Aggregated Review for {self.product.name}"


class KeyThought(models.Model):
    aggregated_review = models.ForeignKey(AggregatedReview, on_delete=models.CASCADE, related_name="key_thoughts", verbose_name="Агрегированный отзыв")
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="key_thoughts", verbose_name="Отзыв")  # Убираем null=True
    thought_text = models.TextField(verbose_name="Текст мысли")
    thought_type = models.CharField(max_length=8, choices=[('positive', 'Positive'), ('negative', 'Negative')], verbose_name="Тип мысли")
    rank = models.IntegerField(verbose_name="Ранг мысли")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return f"{self.thought_type.capitalize()} Thought from Review {self.review.id} for Aggregated Review {self.aggregated_review.id} - Rank {self.rank}"


class ProcessedReviewCache(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="processed_reviews", verbose_name="Категория")
    processed_data = models.JSONField(verbose_name="Обработанные данные", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cache for {self.category.name}"
