from django.contrib import admin
from django.shortcuts import redirect, render
from django.urls import path
from django.http import JsonResponse
from .models import Category, Product, Review, AggregatedReview, ProcessedReviewCache
from .forms import CSVUploadForm, ReviewUploadForm, AggregatedReviewUploadForm
import os
import csv

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_category', 'created_at')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('review_full_text', 'review_rating', 'product', 'created_at')

class AggregatedReviewAdmin(admin.ModelAdmin):
    list_display = ('key_thought', 'avg_rating', 'product', 'created_at')

class ProcessedReviewCacheAdmin(admin.ModelAdmin):
    list_display = ('category', 'created_at')

# smartpick/admin.py

from django.contrib import admin
from django.shortcuts import redirect, render
from django.urls import path
from django.http import JsonResponse
from .models import Category, Product, Review, AggregatedReview, ProcessedReviewCache
from .forms import CSVUploadForm, ReviewUploadForm, AggregatedReviewUploadForm
from .tasks import process_reviews_file, process_aggregated_reviews_file
import os

class ProductReviewAdmin(admin.ModelAdmin):
    change_list_template = "admin/product_review_change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('upload-reviews/', self.upload_reviews, name='upload_reviews'),
            path('upload-aggregated-reviews/', self.upload_aggregated_reviews, name='upload_aggregated_reviews'),
            path('task-status/<task_id>/', self.task_status, name="task_status"),
        ]
        return custom_urls + urls

    def upload_reviews(self, request):
        if request.method == "POST" and request.FILES.get('csv_file'):
            form = ReviewUploadForm(request.POST, request.FILES)
            if form.is_valid():
                csv_file = request.FILES['csv_file']
                file_path = self.save_uploaded_file(csv_file)
                task = process_reviews_file.delay(file_path)
                return JsonResponse({'task_id': task.id})
        else:
            form = ReviewUploadForm()

        context = {
            "form": form,
        }
        return render(request, "admin/upload_reviews_form.html", context)

    def upload_aggregated_reviews(self, request):
        if request.method == "POST" and request.FILES.get('csv_file'):
            form = AggregatedReviewUploadForm(request.POST, request.FILES)
            if form.is_valid():
                csv_file = request.FILES['csv_file']
                file_path = self.save_uploaded_file(csv_file)
                task = process_aggregated_reviews_file.delay(file_path)
                return JsonResponse({'task_id': task.id})
        else:
            form = AggregatedReviewUploadForm()

        context = {
            "form": form,
        }
        return render(request, "admin/upload_aggregated_reviews_form.html", context)

    def task_status(self, request, task_id):
        from celery.result import AsyncResult
        task = AsyncResult(task_id)
        if task.state == 'PENDING':
            response = {'state': task.state, 'current': 0, 'total': 1, 'status': 'Pending...'}
        elif task.state != 'FAILURE':
            response = {
                'state': task.state,
                'current': task.info.get('current', 0),
                'total': task.info.get('total', 1),
                'status': task.info.get('status', '')
            }
        else:
            response = {'state': task.state, 'current': 1, 'total': 1, 'status': str(task.info)}
        return JsonResponse(response)

    def save_uploaded_file(self, f):
        file_path = os.path.join('/data', f.name)
        with open(file_path, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
        return file_path

from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Category, Product, Review, AggregatedReview
from .forms import CSVUploadForm, AggregatedReviewUploadForm
from .tasks import process_reviews_file, process_aggregated_reviews_file
import os
import csv

class CSVUploadAdmin(admin.ModelAdmin):
    change_list_template = "admin/csv_upload_change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('upload-reviews/', self.upload_reviews, name='upload_reviews'),
            path('upload-aggregated-reviews/', self.upload_aggregated_reviews, name='upload_aggregated_reviews'),
        ]
        return custom_urls + urls

    def upload_reviews(self, request):
        if request.method == "POST" and request.FILES.get('csv_file'):
            form = CSVUploadForm(request.POST, request.FILES)
            if form.is_valid():
                csv_file = request.FILES['csv_file']
                file_path = self.save_uploaded_file(csv_file)
                task = process_reviews_file.delay(file_path)
                return JsonResponse({'task_id': task.id})
        else:
            form = CSVUploadForm()

        context = {
            "form": form,
        }
        return render(request, "admin/upload_reviews_form.html", context)

    def upload_aggregated_reviews(self, request):
        if request.method == "POST" and request.FILES.get('csv_file'):
            form = AggregatedReviewUploadForm(request.POST, request.FILES)
            if form.is_valid():
                csv_file = request.FILES['csv_file']
                file_path = self.save_uploaded_file(csv_file)
                task = process_aggregated_reviews_file.delay(file_path)
                return JsonResponse({'task_id': task.id})
        else:
            form = AggregatedReviewUploadForm()

        context = {
            "form": form,
        }
        return render(request, "admin/upload_aggregated_reviews_form.html", context)

    def save_uploaded_file(self, f):
        file_path = os.path.join('/data', f.name)
        with open(file_path, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
        return file_path

# Регистрация моделей в админке
admin.site.register(Category, CSVUploadAdmin)  # Делаем CSVUploadAdmin админкой для категорий, т.к. основной интерфейс работы с данными
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(AggregatedReview)
