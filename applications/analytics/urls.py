from django.urls import path

from . import views


app_name = 'analytics'
urlpatterns = [
    path(f'', views.Index, name='index'),
    path(f'macroeconomic/usa/', views.MacroEconomic, name='MacroEconomic'),
    path(f'quant/securities/', views.QuantitativeAnalytics, name='QuantitativeAnalytics'),
    path(f'ais/map/', views.MarineTraffic, name='MarineTraffic'),
    path(f'ais/api/', views.get_ais_data, name='MarineTraffic_API'),
]
