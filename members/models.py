from django.contrib.auth.models import AbstractUser
from django.db import models

class MemberUser(AbstractUser):
    # Add your extra fields here
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username