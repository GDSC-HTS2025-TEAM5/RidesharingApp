from django.contrib import admin
from .models import Ride

@admin.register(Ride)
class RideAdmin(admin.ModelAdmin):
    list_display = ("start_location", "end_location", "departure_time", "user", "accepted_by", "created_at")
    list_filter = ("departure_time", "created_at", "accepted_by")
    search_fields = ("start_location", "end_location", "user__email")
