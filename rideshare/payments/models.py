# payments/models.py
from django.db import models
from django.conf import settings

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='pending')  # e.g., pending, success, failed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Payment {self.transaction_id} - {self.status}'
