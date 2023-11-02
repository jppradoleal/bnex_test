from django.conf import settings
from django.db import models


# Create your models here.
class Product(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    name = models.TextField(null=False, max_length=255, unique=True)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    active = models.BooleanField(default=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
