from django.urls import path

from . import views


app_name = 'api'
urlpatterns = [
    # Content
    path(f'documentation', views.Docs.as_view(), name='Docs'),
    path('ai/product/', views.Industry.as_view(), name='AI_Industry'),
]
