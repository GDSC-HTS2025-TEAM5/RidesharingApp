# rides/serializers.py
from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['id', 'user', 'start_location', 'end_location', 'departure_time', 'created_at', 'accepted_by']
        read_only_fields = ['id', 'user', 'created_at', 'accepted_by']