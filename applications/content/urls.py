from django.urls import path
from django.views.generic import TemplateView

from . import views


app_name = 'content'
urlpatterns = [
    path('content/', views.Content, name='Content'),
]
