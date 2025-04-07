# accounts/urls.py
from django.urls import path
from .views import RegisterView, CustomAuthToken, AccountDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('profile/', AccountDetailView.as_view(), name='profile'),
]
