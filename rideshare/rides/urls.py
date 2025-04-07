# rides/urls.py
from django.urls import path
from .views import CreateRideView, RideListView

urlpatterns = [
    path('create/', CreateRideView.as_view(), name='create-ride'),
    path('list/', RideListView.as_view(), name='ride-list'),
]
