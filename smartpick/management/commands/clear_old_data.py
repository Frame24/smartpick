from django.core.management.base import BaseCommand
from smartpick.models import Category, Product, Review

class Command(BaseCommand):
    help = 'Clear old data from the database'

    def handle(self, *args, **kwargs):
        # Удаляем данные из всех моделей в правильном порядке
        Review.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleared old data'))
