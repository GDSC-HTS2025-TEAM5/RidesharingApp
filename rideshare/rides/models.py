# rides/models.py
from django.db import models
from django.conf import settings
from datetime import datetime

class Ride(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='rides_posted'
    )
    start_location = models.CharField(max_length=200)
    end_location = models.CharField(max_length=200)
    departure_time = models.DateTimeField(default=datetime.now)
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='rides_accepted'
    )
    
    def __str__(self):
        return f'Ride from {self.start_location} to {self.end_location} by {self.user}'
