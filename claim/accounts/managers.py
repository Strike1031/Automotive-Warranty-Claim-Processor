from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from validate_email import validate_email
from django.contrib.auth.models import Group

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('role', 'dealership_user')

        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        if not validate_email(email):
            raise ValueError(_('Invalid email set'))
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        print("#################")
        print(extra_fields["role"])
        user_group = Group.objects.get(name=extra_fields["role"]) 
        user.groups.add(user_group)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'super_admin')
        extra_fields.setdefault('username', 'admin')

        # user_group = Group.objects.get(name='super_admin') 

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        # return self.create_user(email, password, **extra_fields)
        user = self._create_user(email, password, **extra_fields)
        

        return user