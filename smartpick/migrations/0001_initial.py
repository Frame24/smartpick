# Generated by Django 5.0.8 on 2024-08-21 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_full_text', models.TextField(verbose_name='Текст отзыва')),
                ('review_rating', models.IntegerField(verbose_name='Рейтинг отзыва')),
                ('product', models.CharField(max_length=255, verbose_name='Название продукта')),
                ('category', models.CharField(max_length=255, verbose_name='Категория')),
                ('url', models.URLField(verbose_name='URL')),
                ('corrected_text', models.TextField(verbose_name='Исправленный текст отзыва')),
            ],
        ),
    ]
