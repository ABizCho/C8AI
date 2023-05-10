from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'nickname',
            'status',
            'gender',
            'birth_date',
            'phone_num',
            'svc_use_pcy_agmt',
            'ps_info_proc_agmt',
            'mkt_info_recv_agmt',
            'created_at',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        provider = validated_data.pop('provider', None)
        social_id = validated_data.pop('social_id', None)
        
        
        if provider and social_id:
            # 소셜 로그인 사용자 처리
            user = User.objects.create_user(**validated_data, provider=provider, social_id=social_id)
        else:
            # 자체 로그인 사용자 처리
            user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        return super().update(instance, validated_data)