# Generated by Django 5.0.8 on 2024-08-24 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smartpick', '0005_review_analysed_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='mean_distance',
            field=models.FloatField(blank=True, null=True, verbose_name='Среднее расстояние'),
        ),
    ]
