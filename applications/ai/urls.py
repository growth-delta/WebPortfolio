from django.urls import path

from . import views


app_name = 'ai'
urlpatterns = [
    path(f'', views.Index, name='index'),
    path('code/CodeGPT/', views.GPTCode, name='gpt_code'),
    path('code/DebugGPT/', views.GPTDebug, name='gpt_debug'),
]
