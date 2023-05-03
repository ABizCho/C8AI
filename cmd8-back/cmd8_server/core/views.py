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



#### 해결법2 적용 해결했음 ( django 권장 해결법), 1번 대안은 safe=False 설정이었음

# @api_view(['GET'])
# @csrf_exempt
# def getall_aiTool(request):
#     ai_tools = AiTool.objects.all()
#     serializer = AiToolSerializer(ai_tools, many=True)
#     serialized_data = serializer.data

#     # 가공된 데이터를 저장할 리스트 생성
#     processed_data = []

#     for tool_data in serialized_data:
#         # 카테고리를 포함한 데이터 생성
#         tool_categories_ko = []
#         tool_categories_en = []
#         for category in tool_data['categories']:
#             category_instance = AiToolCategory.objects.get(id=category)
#             category_serializer = CategoryNameSerializer(category_instance)
#             category_data = category_serializer.data
#             tool_categories_ko.extend(category_data['ko'])
#             tool_categories_en.extend(category_data['en'])

#         # 기존 데이터에 카테고리 추가
#         tool_data['ko']['category'] = tool_categories_ko
#         tool_data['en']['category'] = tool_categories_en

#         # derived 데이터를 임의로 추가 (실제로는 해당 데이터를 계산하여 추가해야 함)
#         tool_data['derived'] = {
#             'score': {
#                 'avg': 4.5,
#                 'cnt': 10
#             },
#             'favoriteCnt': 5
#         }

#         processed_data.append(tool_data)

#     return JsonResponse({'aiTools': processed_data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@csrf_exempt
def getall_aiTool(request):
    ai_tools = AiTool.objects.prefetch_related('categories').all()
    serializer = AiToolSerializer(ai_tools, many=True)
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