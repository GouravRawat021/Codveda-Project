"""
apps.py — UI Library App Configuration
"""

from django.apps import AppConfig


class UiLibraryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ui_library'
    verbose_name = 'UI Component Library'
