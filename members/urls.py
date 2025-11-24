from django.urls import path
from .views import MemberRegistrationAPIView, dashboard_view

# Create your views here.


urlpatterns = [
    path('dashboard/', dashboard_view, name='dashboard'),
    path('register/', MemberRegistrationAPIView.as_view(), name='register'),
]