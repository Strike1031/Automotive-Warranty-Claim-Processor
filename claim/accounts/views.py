from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from . import serializers
from django.contrib.auth.models import Group, Permission

CustomUser = get_user_model()

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.CustomUserRetrieveSerializer
    permission_classes = (permissions.IsAuthenticated,) 

    def get_object(self):
        user = self.request.user
        groups = Group.objects.filter(user=user.id)
        if len(groups) == 0 or not user.role in [g.name for g in groups]:
            if (len(groups) != 0):
                user.groups.clear()
                user.user_permissions.clear()
            user_group = Group.objects.get(name=user.role) 
            user.groups.add(user_group)
        permissions = Permission.objects.filter(user=user.id)
        if len(permissions) == 0:
            group_permissions = Permission.objects.filter(group__user=user.id)
            for p in group_permissions:
                user.user_permissions.add(p)
        return user