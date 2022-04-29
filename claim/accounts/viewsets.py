from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets

from . import serializers

CustomUser = get_user_model()


class CustomUserModelViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomUserSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = CustomUser.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()