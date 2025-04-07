# rides/views.py
from rest_framework import generics
from .models import Ride
from rest_framework.serializers import ModelSerializer

class RideSerializer(ModelSerializer):
    class Meta:
        model = Ride
        fields = '__all__'

class CreateRideView(generics.CreateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer

class RideListView(generics.ListAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
