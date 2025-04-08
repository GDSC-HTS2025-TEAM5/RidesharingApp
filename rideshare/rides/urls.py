# rides/urls.py
from django.urls import path
from .views import CreateRideView, RideListView, AcceptRideView

urlpatterns = [
    path('create/', CreateRideView.as_view(), name='create-ride'),
    path('', RideListView.as_view(), name='ride-list'),
    path('accept/<int:pk>/', AcceptRideView.as_view(), name='accept-ride'),
]