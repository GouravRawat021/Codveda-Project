"""
models.py — Custom User Model"""

from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    # Make email required and unique (no two users can
    # have the same email address)
    email = models.EmailField(
        unique=True,
        help_text="Required. Used for login."
    )

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
