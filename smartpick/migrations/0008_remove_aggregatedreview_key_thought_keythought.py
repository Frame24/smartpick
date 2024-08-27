# Generated by Django 5.0.8 on 2024-08-24 09:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smartpick', '0007_remove_review_mean_distance_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aggregatedreview',
            name='key_thought',
        ),
        migrations.CreateModel(
            name='KeyThought',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thought_text', models.TextField(verbose_name='Текст мысли')),
                ('thought_type', models.CharField(choices=[('positive', 'Positive'), ('negative', 'Negative')], max_length=8, verbose_name='Тип мысли')),
                ('rank', models.IntegerField(verbose_name='Ранг мысли')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('aggregated_review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='key_thoughts', to='smartpick.aggregatedreview')),
            ],
        ),
    ]
