from django.urls import path

from . import views


app_name = 'api'
urlpatterns = [
    path(f'documentation/', views.Docs.as_view(), name='Docs'), #
    path('ai/product/', views.Industry.as_view(), name='AI_Industry'),
    path('securities/stocks/', views.Securities01.as_view(), name='SecuritiesStocks'),
    path('securities/commodities/', views.Securities02.as_view(), name='SecuritiesCommodities'),
    path('securities/government/', views.Securities03.as_view(), name='SecuritiesFX'),
]
