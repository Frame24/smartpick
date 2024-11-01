# asursoft/views.py
from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Добро пожаловать на сайт Asursoft.tech!")
