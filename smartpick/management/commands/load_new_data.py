from django.core.management.base import BaseCommand
import pandas as pd
import ast
from smartpick.models import Category, Product, Review, AggregatedReview, KeyThought

class Command(BaseCommand):
    help = 'Load new data from CSV into the database'

    def handle(self, *args, **kwargs):
        csv_file_path = './data/combined_reviews.csv'
        csv_data = pd.read_csv(csv_file_path)

        for index, row in csv_data.iterrows():
            # Создание или получение категории
            category = Category.create_from_path(row['category'])
            
            # Создание или получение продукта
            product, created = Product.objects.get_or_create(
                name=row['product'],
                category=category,
                url=row['url']
            )
            
            # Создание или получение агрегированного отзыва
            aggregated_review, created = AggregatedReview.objects.get_or_create(
                avg_rating=row['review_rating_mean'],
                rating_category='mixed',  # Это можно изменить в зависимости от логики
                product=product,
                sentence_count=row['elem_count'],  # Подсчет предложений
                mean_distance=row['mean_distance']
            )
            
            # Парсинг key_thoughts и создание записей в таблице KeyThought
            key_thoughts = ast.literal_eval(row['key_thoughts'])

            for thought_type, thoughts in key_thoughts.items():
                for rank, (thought_text, review_text) in enumerate(thoughts, start=1):
                    # Создание отзыва для каждого review_text
                    review, created = Review.objects.get_or_create(
                        product=product,
                        review_full_text=review_text,
                        defaults={'review_rating': row['review_rating_mean']}
                    )

                    # Создание записи в KeyThought
                    KeyThought.objects.create(
                        aggregated_review=aggregated_review,
                        review=review,  # Привязка к только что созданному отзыву
                        thought_text=thought_text,  # Текст мысли
                        thought_type=thought_type,  # Тип (positive или negative)
                        rank=rank  # Ранг мысли
                    )
