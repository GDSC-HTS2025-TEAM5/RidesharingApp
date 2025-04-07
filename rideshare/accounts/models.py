# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add extra fields if necessary, e.g. phone number, verification status
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
