from django.core.management.base import BaseCommand
import pandas as pd
import ast
from smartpick.models import Category, Product, Review, AggregatedReview, KeyThought
from django.db import transaction

class Command(BaseCommand):
    help = 'Load new data from CSV into the database'

    def handle(self, *args, **kwargs):
        csv_file_path = './data/combined_reviews.csv'

        # Обработка файла порциями
        chunksize = 1000  # Количество строк в одном чанке

        for chunk in pd.read_csv(csv_file_path, chunksize=chunksize):
            with transaction.atomic():
                # Сначала собираем все объекты для Product
                for index, row in chunk.iterrows():
                    # Создание или получение категории
                    category = Category.create_from_path(row['category'])

                    # Используем get_or_create для продуктов
                    product, created = Product.objects.get_or_create(
                        name=row['product'],
                        category=category,
                        url=row['url']
                    )

                    # Создание или получение агрегированного отзыва
                    aggregated_review, created = AggregatedReview.objects.get_or_create(
                        avg_rating=row['review_rating_mean'],
                        rating_category='mixed',
                        product=product,
                        sentence_count=row['elem_count'],
                        mean_distance=row['mean_distance']
                    )

                    # Парсинг key_thoughts и создание записей в таблице KeyThought
                    key_thoughts = ast.literal_eval(row['key_thoughts'])

                    for thought_type, thoughts in key_thoughts.items():
                        for rank, (thought_text, review_text) in enumerate(thoughts, start=1):
                            # Создание или получение отзыва
                            review, created = Review.objects.get_or_create(
                                product=product,
                                review_full_text=review_text,
                                defaults={'review_rating': row['review_rating_mean']}
                            )

                            # Создание или получение записи в KeyThought
                            KeyThought.objects.get_or_create(
                                aggregated_review=aggregated_review,
                                review=review,
                                thought_text=thought_text,
                                thought_type=thought_type,
                                rank=rank
                            )

        self.stdout.write(self.style.SUCCESS('Successfully loaded new data in chunks.'))