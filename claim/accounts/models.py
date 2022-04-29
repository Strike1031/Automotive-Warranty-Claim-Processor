from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from . import managers # we will write this file shortly


class CustomUser(AbstractUser):
    # username = None
    username = models.CharField( max_length=30, null=True )
    email = models.EmailField(_('email address'), unique=True)
    # bio = models.TextField()
    
    # gender = models.CharField(
    role = models.CharField(
        max_length=30,
        null=True,
        choices=(
            ('super_admin', 'Super Admin'),
            ('dealership_admin', 'Dealership Admin'),
            ('dealership_user', 'Dealership Read-only User')
        )
    )
    dealership = models.ForeignKey("api.Dealership", to_field="name", on_delete=models.CASCADE, verbose_name='dealership', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = managers.CustomUserManager()

    def __str__(self):
        return f"{self.email}'s custom account"