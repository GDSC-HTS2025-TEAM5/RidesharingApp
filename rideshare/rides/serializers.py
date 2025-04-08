# rides/serializers.py
from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Ride
        fields = [
            'id', 'user', 'start_location', 'end_location',
            'departure_time', 'created_at', 'accepted_by',
            'user_first_name', 'user_last_name',
        ]
        read_only_fields = ['id', 'user', 'created_at', 'accepted_by']