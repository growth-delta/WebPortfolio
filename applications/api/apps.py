from django.apps import AppConfig


class APIConfig(AppConfig):
    name = 'applications.api'
    label = 'api'
    default_auto_field = 'django.db.models.BigAutoField'
