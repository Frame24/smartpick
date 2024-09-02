from django import forms

class CSVUploadForm(forms.Form):
    csv_file = forms.FileField(label="Выберите CSV файл")

class ReviewUploadForm(forms.Form):
    csv_file = forms.FileField(label="Загрузите файл с отзывами")

class AggregatedReviewUploadForm(forms.Form):
    csv_file = forms.FileField(label="Загрузите файл с агрегированными отзывами")
