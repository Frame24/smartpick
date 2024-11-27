from django.shortcuts import render, get_object_or_404

from smartpick.users.utils.analytics_history import add_to_analytics_history
from ..models import Product, AggregatedReview, KeyThought


def product_detail(request, product_id):
    # Получаем объект продукта по его идентификатору
    product = get_object_or_404(Product, id=product_id)
    product.url = "/".join(product.url.split("/")[:-1]) + "/detail.aspx"

    # Получаем все агрегированные отзывы для данного продукта
    aggregated_reviews = AggregatedReview.objects.filter(
        product=product
    ).prefetch_related("key_thoughts__review")

    # Фильтрация только тех отзывов, где количество мыслей больше 2
    aggregated_reviews = [
        review for review in aggregated_reviews if review.sentence_count > 2
    ]

    # Извлечение полных текстов отзывов через KeyThought
    for aggregated_review in aggregated_reviews:
        positive_reviews = (
            aggregated_review.key_thoughts.filter(thought_type="positive")
            .values_list("review__review_full_text", flat=True)
            .distinct()
        )
        negative_reviews = (
            aggregated_review.key_thoughts.filter(thought_type="negative")
            .values_list("review__review_full_text", flat=True)
            .distinct()
        )

        # Присваиваем эти списки для использования в шаблоне
        aggregated_review.positive_reviews = positive_reviews
        aggregated_review.negative_reviews = negative_reviews

    # Добавляем категорию в историю просмотров
    if request.user.is_authenticated:
        add_to_analytics_history(request.user, product)

    return render(
        request,
        "pages/product_detail.html",
        {
            "product": product,
            "aggregated_reviews": aggregated_reviews,
        },
    )
