from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import MemberRegistrationSerializer


# -----------------------------------------
# Template-based dashboard view
# -----------------------------------------
def dashboard_view(request):
    return render(request, "dashboard.html")


# -----------------------------------------
# API View for member registration
# -----------------------------------------
class MemberRegistrationAPIView(APIView):
    permission_classes = [AllowAny]  # Allow public access for registration

    def post(self, request):
        """
        Handle POST request for new member registration.
        Expects JSON payload matching MemberRegistrationSerializer fields.
        """
        serializer = MemberRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Account created successfully!"},
                status=status.HTTP_201_CREATED,
            )

        # Return field-level validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
