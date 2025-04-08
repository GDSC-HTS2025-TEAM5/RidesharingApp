# rides/views.py
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Ride
from .serializers import RideSerializer

# Create a new ride (trip)
class CreateRideView(generics.CreateAPIView):
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# List all rides (you can also filter for open rides)
class RideListView(generics.ListAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.AllowAny]

# Endpoint for a user to accept a ride
class AcceptRideView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, format=None):
        try:
            ride = Ride.objects.get(pk=pk)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the ride is already accepted
        if ride.accepted_by is not None:
            return Response({"error": "Ride already accepted"}, status=status.HTTP_400_BAD_REQUEST)

        ride.accepted_by = request.user
        ride.save()
        return Response({"status": "Ride accepted"}, status=status.HTTP_200_OK)
