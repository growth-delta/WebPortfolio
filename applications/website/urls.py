from django.urls import path

from . import views


app_name = 'website'
urlpatterns = [
    path('', views.Landing, name='Landing'),
    path('securities/research/usa/', views.Securities, name='Securities'),
]
