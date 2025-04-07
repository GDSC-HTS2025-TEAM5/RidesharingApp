# rides/serializers.py
from rest_framework.serializers import ModelSerializer
from .models import Ride

class RideSerializer(ModelSerializer):
    class Meta:
        model = Ride
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
