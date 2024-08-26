# smartpick/tasks.py

from celery import shared_task
from .models import Category, Product, Review, AggregatedReview
import csv
import os

# Задачи по обработке отзывов

from celery import shared_task
from .models import Review
from django.utils import timezone
# from .analysis import ReviewsKeywords  # Импорт вашего модуля

# @shared_task
# def analyze_reviews():
#     reviews_to_analyze = Review.objects.filter(analysed_at__isnull=True)
    
#     # Запуск анализа для каждого отзыва
#     for review in reviews_to_analyze:
#         # Важно, чтобы ваш модуль мог обрабатывать данные напрямую, а не через CSV
#         csv_path = "./path_to_your_reviews_file.csv"  # Убедитесь, что путь корректен
#         model_path = './reviews_keywords/fine_tuned_model'
        
#         analyzer = ReviewsKeywords(csv_path=csv_path, model_path=model_path)
#         result = analyzer.run()
        
#         # Сохранение результата в базу данных (это необходимо настроить в вашем модуле)
#         review.analysed_at = timezone.now()
#         review.save()

#     return f"{reviews_to_analyze.count()} reviews were analyzed."



# Задачи по загрузке csv
@shared_task(bind=True)
def process_reviews_file(self, file_path):
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        total = sum(1 for row in reader)
        file.seek(0)
        reader = csv.DictReader(file)
        
        batch_size = 1000
        objects = []
        current = 0

        for row in reader:
            category, _ = Category.objects.get_or_create(name=row['category'])
            product, _ = Product.objects.get_or_create(name=row['product'], category=category, url=row['url'])
            review = Review(
                review_full_text=row['review_full_text'],
                review_rating=int(row['review_rating']),
                product=product,
                corrected_text=row['corrected_text'],
            )
            objects.append(review)
            current += 1

            if len(objects) >= batch_size:
                Review.objects.bulk_create(objects)
                objects = []
                self.update_state(state='PROGRESS', meta={'current': current, 'total': total})

        if objects:
            Review.objects.bulk_create(objects)
            self.update_state(state='PROGRESS', meta={'current': current, 'total': total})

    os.remove(file_path)  # Удаление временного файла после обработки
    return {'current': total, 'total': total, 'status': 'Task completed!'}

@shared_task(bind=True)
def process_aggregated_reviews_file(self, file_path):
    return {'current': 100, 'total': 100, 'status': 'Task completed!'}