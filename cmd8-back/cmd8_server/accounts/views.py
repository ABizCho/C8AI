from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse, HttpResponse
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import UserSerializer
from .models import User


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def register(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return JsonResponse({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return JsonResponse({'error': 'Please provide both username and password'},
                            status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        response = JsonResponse({
            'message': 'Login successful',
            'nickname': user.nickname,
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
        response.set_cookie('refresh', str(refresh), 
                            domain="https://ai-ght.com",
                            httponly=True # 스크립트상 접근불가
                            , samesite='Lax' 
                            , secure=True # 개발환경 테스트 False,
                            # Strict 모드에서는 같은 도메인 범위에서만 해당 쿠키를 사용, Lax는 사용자가 페이지 이동 시 혹은 Form을 통한 Get 요청 시에만 허용함
                            
                            )
        return response
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def social_login_view(request):
    provider = request.data.get('provider')
    social_id = request.data.get('social_id')
    username = request.data.get('username')

    if not provider or not social_id or not username:
        return JsonResponse({'error': 'Please provide provider, social id and username'},
                            status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(provider=provider, social_id=social_id).first()

    if user is None:
        # 소셜 로그인 사용자를 생성하는 로직
        user_data = {
            'username': username,
            'provider': provider,
            'social_id': social_id,
        }
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            user = serializer.save()
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)

    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'nickname': user.nickname
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token is None:
            return JsonResponse({'error': 'No refresh token provided'},
                                status=status.HTTP_400_BAD_REQUEST)

        token = RefreshToken(refresh_token)
        token.blacklist()
    except TokenError:
        return JsonResponse({'error': 'Invalid token'},
                            status=status.HTTP_400_BAD_REQUEST)

    response = JsonResponse({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    response.delete_cookie('refresh')
    return response


## 권한 있어야만 수행할 응답로직: 추후 구현
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return JsonResponse({'message': 'Hello, this is a protected view!'})