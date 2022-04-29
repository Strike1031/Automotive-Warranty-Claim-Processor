from django.contrib.auth import get_user_model
from rest_framework import serializers, validators

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        write_only=True, validators=[validators.UniqueValidator(
            message='This email already exists',
            queryset=CustomUser.objects.all()
        )]
    )
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=True)
    role = serializers.CharField(required=True)
    dealership = serializers.CharField(required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'username', 'role', 'dealership')


class CustomUserRetrieveSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    role = serializers.CharField(required=True)
    dealership = serializers.CharField(required=False)
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'role', 'dealership', 'id')