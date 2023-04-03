from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import AiTool
from .serializers import AiToolSerializer

@api_view(['POST'])
@csrf_exempt
def create_aiTool(request):
    serializer = AiToolSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#### safe=True(=default)였기에 딕셔너리가 아닌 직렬화 오류가 발생했었다.
#### err: In order to allow non-dict objects to be serialized set the safe parameter to False.

#### 해결법 1. safe=False.
# @api_view(['GET'])
# @csrf_exempt
# def getall_aiTool(request):
#     aiTools = AiTool.objects.all()
#     serializer = AiToolSerializer(aiTools, many=True)
#     return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

#### 해결법 2. django 권장 해결법
@api_view(['GET'])
@csrf_exempt
def getall_aiTool(request):
    aiTools = AiTool.objects.all()
    serializer = AiToolSerializer(aiTools, many=True)
    serialized_data = serializer.data
    return JsonResponse({'aiTools': serialized_data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@csrf_exempt
def get_aiTool(request, pk):
    try:
        aiTool = AiTool.objects.get(pk=pk)
    except AiTool.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    serializer = AiToolSerializer(aiTool)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK)